
var net = require('net');

// Configuration parameters
const DEFAULT_PORT = 7100

export default class Syrus {
  constructor(PORT) {
    this.port = PORT
    this.sockets = {}
    this.server = net.createServer(this.onClientConnected)
    this.server.on('error', this.onServerError)
  }

  onClientConnected(sock) {
    const remoteAddress = sock.remoteAddress + ':' + sock.remotePort;
    console.log('new client connected: %s', remoteAddress);

    sock.on('data', function (data) {
      console.log('Device address %s : %s', remoteAddress, data);
      // sock.write(data);
    });
    sock.on('close', function () {
      console.log('connection from %s closed', remoteAddress);
    });
    sock.on('error', function (err) {
      console.log('Connection %s error: %s', remoteAddress, err.message);
    });
  };

  onServerError(error) {
    if (error.code === 'EADDRINUSE') {
      console.log('Address in use, retrying...');
      setTimeout(() => {
        this.server.close();
        this.server.listen(DEFAULT_PORT || this.port, () => {
          console.log('Server listening on %j', this.server.address());
        });
      }, 5000);
    }
  }
  serverListen() {
    setTimeout(() => {
      this.server.close();
      this.server.listen(DEFAULT_PORT || this.port, () => {
        console.log('Server listening on %j', this.server.address());
      });
    }, 1000);
  }
}




function onClientConnected(sock) {
  var remoteAddress = sock.remoteAddress + ':' + sock.remotePort;
  console.log('new client connected: %s', remoteAddress);

  sock.on('data', function (data) {
    console.log('%s Says: %s', remoteAddress, data);
    sock.write(data);
  });
  sock.on('close', function () {
    console.log('connection from %s closed', remoteAddress);
  });
  sock.on('error', function (err) {
    console.log('Connection %s error: %s', remoteAddress, err.message);
  });
};

// const net = require('net')

import { p, now, formatTime } from '../imports/tools'
import { streamer } from '../imports/streamers'
import { Tasks, Trails, Scripts, Responses } from '../imports/collections'

// PUBLISH
Meteor.publish('scripts', ns => Scripts.find({}))
Meteor.publish('trails', ns => Trails.find({}))
Meteor.publish('responses', ns => Responses.find({}))
Meteor.publish('tasks', ns => Tasks.find({}))

const DISCONNECT_DEVICE_CMD = '>SXADP01U<'
const RESET_DEVICE_CMD = '>SRT<'
const TIME_DISCONNECT_DEVICE = 500

let sockets = {}

 class SyrusT {

  constructor(port) {


    this.server = net.createServer(Meteor.bindEnvironment(socket => {
      // 'connection' listener
      // console.log('client connected')

      socket.on('end', Meteor.bindEnvironment(() => {
        delete sockets[socket.mobileID]
        Meteor.call('removeTrail', socket.mobileID)
        // console.log(`${socket.mobileID} has disconnected`)
      }))

      socket.on('data', Meteor.bindEnvironment(data => {
        p(data.toString().trim())
        streamer.emit('log', formatTime(now()) + ' ' + data.toString().trim())
        this.mobileMessage = data.toString().trim()

        if (!sockets[socket.mobileID]) {


          socket.mobileID = this.getMobileID()
          sockets[socket.mobileID] = socket

        }
        this.route()
      }))

    }))
    this.server.listen(port || 7100, Meteor.bindEnvironment(() => {
      console.log('Server Up in port ' + this.server.address().port)
      Meteor.call('removeAllTrails')
    }))

  }
  getMobileID() {
    const mm = this.mobileMessage

    let mobileID

    mm.indexOf('>REV') == 0 ? mobileID = mm.slice(mm.indexOf('ID=') + 3, mm.indexOf('<')) : false

    mm.indexOf('>') == 0 && mm.indexOf('REV') == -1 ? mobileID = mm.slice(mm.indexOf('ID=') + 3, mm.indexOf('<')) : false

    mm.indexOf('>') == -1 && mm.indexOf('<') == -1 ? mobileID = this.mobileMessage : false

    return mobileID

  }
  route() {
    const mm = this.mobileMessage
    mm.indexOf('>REV') == 0 ? this.trail() : false

    mm.indexOf('>') == 0 && mm.indexOf('REV') == -1 ? this.response() : false

    mm.indexOf('>') == -1 && mm.indexOf('<') == -1 ? this.heartbeat() : false

  }
  response() {
    //p('response')
    const mm = this.mobileMessage
    const mobileID = mm.slice(mm.indexOf('ID=') + 3, mm.indexOf('<'))
    Meteor.call('upsertResponse', mobileID, mm)
    Meteor.call('socketSend', mobileID, mobileID)
    Meteor.call('upsertTrail', mobileID)

    this.taskWorker(mobileID, mm)
  }
  trail() {
    //p('trail')
    const mm = this.mobileMessage
    const mobileID = mm.slice(mm.indexOf('ID=') + 3, mm.indexOf('<'))
    Meteor.call('socketSend', mobileID, mobileID)
    Meteor.call('upsertTrail', mobileID)
    this.syncWorker(mobileID)
  }
  heartbeat() {
    //p('heartbeat')
    const mobileID = this.mobileMessage
    Meteor.call('socketSend', mobileID, mobileID)
    Meteor.call('upsertTrail', mobileID)
    this.syncWorker(mobileID)
  }
  taskWorker(mobileID, message) {
    const task = Meteor.call('getTask', mobileID)
    const commands = task ? task.commands : false
    if (commands) {
      commands.map((el, i, array) => {

        if (el.status == 1) {
          Meteor.call('status2CommandTask', mobileID, el.index, ns => {
            if (el.index == commands.length) {
              Meteor.call('status2Task', mobileID, ns => {
                streamer.emit('log', formatTime(now()) + ' ' + `Tarea de ${mobileID} Terminada`)
                streamer.emit('modal', `Tarea de ${mobileID} Terminada`)

                Meteor.setTimeout(() => {
                  Meteor.call('socketSend', mobileID, DISCONNECT_DEVICE_CMD)
                  Meteor.call('socketSend', mobileID, RESET_DEVICE_CMD)

                  Meteor.setTimeout(() => {
                    Meteor.call('removeTrail', mobileID)
                    Meteor.call('removeTask', mobileID)
                  }, 1000)

                }, TIME_DISCONNECT_DEVICE)


              })
            }
            if (array[i + 1] && array[i + 1].command) {
              Meteor.call('socketSend', mobileID, array[i + 1].command, ns => {
                Meteor.call('status1CommandTask', mobileID, array[i + 1].index)
              })
            }
          })
        }
      })
    }
  }
  syncWorker(mobileID) {
    const task = Meteor.call('getTask', mobileID)
    if (task) {
      //const cmd0 = task.commands.filter(el=> el.status == 0)[0]
      const cmd1 = task.commands.filter(el => el.status == 1)[0]
      //const cmd2 = task.commands.filter(el=> el.status == 2)[0]
      cmd1 ? Meteor.call('socketSend', mobileID, cmd1.command) : false
    }
  }
}

// new SyrusT()


/* METEOR METHODS */
Meteor.methods({
  // SERVER TCP
  socketSend: (mobileID, message) => {
    sockets[mobileID].write(message)
  },
  getConnections: () => {
    return Object.keys(sockets).length
  },
  // TRAILS
  upsertTrail: (mobileID) => {
    Trails.upsert({ mobileID }, { $set: { now: now() } })
  },
	/*
	getTrail: (mobileID) => {
		return Trails.findOne({ mobileID })
	},*/
  removeTrail: (mobileID) => {
    Trails.remove({ mobileID })
  },
  removeAllTrails: () => {
    Trails.remove({})
  },
  // SCRIPTS
  saveScript: (scriptFile) => {
    const { name, file } = scriptFile
    let commands = []

    if (file.includes('>S') && file.includes('<')) {

      const lines = file.split('\r\n').filter(line => {
        return line.startsWith('>') &&
          line.indexOf('SRT;ALL') < 0 &&
          line.indexOf('SXADP00') < 0 && // DANTE UECHI 20/06/2018 AUTORIZA
          line.indexOf('SXADP01') < 0 && // DANTE UECHI 20/06/2018 AUTORIZA
          line.indexOf('SRFA') < 0 &&
          // line.indexOf('SDA0') < 0 &&   DANTE UECHI 18/06/2018 AUTORIZA
          line.indexOf('SXAFU0C') < 0 &&
          // line.indexOf('SRT;CONFIG') < 0 &&   ERICK ENCISO 06/07/2018 AUTORIZA
          line.indexOf('SID') < 0
      })
      if (lines.length > 0) {
        commands = lines.map((line, index) => {
          return {
            index: (index + 1),
            command: line.trim(),
            // hopeResponse: line.replace('>S', '>R').substr(0, line.length - 1).trim()
          }
        })
      }
      const scriptUpsert = Scripts.upsert({ name }, { $set: { commands, createdAt: now() } })
      return commands.length > 0 && scriptUpsert && scriptUpsert.numberAffected == 1 ? true : false
    }
  },
  removeScript: (name) => {
    Scripts.remove({ name })
  },
  // TASKS
  saveTask: (mobileID, scriptID) => {
    const scriptToTask = Scripts.findOne({ _id: scriptID }, { fields: { _id: 0, createdAt: 0 } })
    scriptToTask.commands.map(el => el.status = 0)
    scriptToTask.status = 0
    scriptToTask.createdAt = now()
    Tasks.upsert({ mobileID }, { $set: scriptToTask })
    const task = Tasks.findOne({ mobileID })
    const firtsCommand = task.commands[0].command
    Meteor.call('socketSend', mobileID, firtsCommand, ns => {
      Tasks.update({ _id: task._id, "commands.index": 1 }, { $set: { "commands.$.status": 1, "commands.$.lastSendTime": now() } })
      Tasks.update({ _id: task._id }, { $set: { status: 1 } })
    })
  },
  getTask: (mobileID) => {
    return Tasks.findOne({ mobileID })
  },
  status2CommandTask: (mobileID, index) => {
    Tasks.update({ mobileID, "commands.index": index }, { $set: { "commands.$.status": 2, "commands.$.lastReceivedTime": now() } })
  },
  status1CommandTask: (mobileID, index) => {
    Tasks.update({ mobileID, "commands.index": index }, { $set: { "commands.$.status": 1, "commands.$.lastSendTime": now() } })
  },
  status2Task: (mobileID) => {
    Tasks.update({ mobileID }, { $set: { status: 2, endTime: now() } })
  },
  removeTask: (mobileID) => {
    Tasks.remove({ mobileID })
  },
  upsertResponse: (mobileID, data) => {
    Responses.upsert({ mobileID }, { $set: { data, now: now() } })
  },

})



