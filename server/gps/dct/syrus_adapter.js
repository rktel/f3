
var net = require('net');
import Convert from './syrus_convert'
const convert = new Convert
// FIRMWARE [1]

//Configuration parameters  >RXART;3.4.18;EHS6.T;interface=1.9.1.1T;imsi=214074301431066,operator=MOVISTAR,sim_id=8934072100261855798,;ID=357042066587636<

const DEFAULT_PORT = 7100

export default class Syrus {
  constructor(PORT) {
    this.port = PORT
    this.sockets = {}
    this.server = net.createServer(this.onClientConnected)
    this.server.on('error', this.onServerError)
    this.serverListen()
  }
  messageRouter() {
    this.parserMessage()
    if (this.deviceID) {
      this.sockets[this.deviceID].write(this.deviceID)
    }
  }
  parserMessage() {
    const { message } = this.message
    if (message.includes('>') && message.includes('<')) {
      this.deviceID = message.substring(message.indexOf('ID=') + 3, message.indexOf('<'))
      if (message.includes('RXART')) {
        const messageSplit = message.split(";")
        this.deviceInfo = {
          firmware: messageSplit[1],
          hardware: messageSplit[2],
          operator: messageSplit[5].substr(messageSplit[5].indexOf('=') + 1),
          sim: messageSplit[6].substr(messageSplit[6].indexOf('=') + 1)
        }
      }
      if (message.includes('REV')) {
        this.gpsData = {
          eventCode: parseInt(message.substr(4, 2)),
          updateTime: convert.time(message.substr(6, 10)),
          latitude: convert.latitude(message.substr(16, 8)),
          longitude: convert.longitude(message.substr(24, 9)),
          speed: convert.speed(message.substr(33, 3)),
          heading: parseInt(message.substr(36, 3)),
          fixMode: parseInt(message.substr(39, 1)),
          ageData: parseInt(message.substr(40, 1)),
          direction: convert.getCardinal(message.substr(36, 3))
        }
      }
    } else {
      this.deviceID = message
    }
  }
  onClientConnected(sock) {
    sock.on('data', (data) => {
      this.message = data.toString().trim()
      console.log(this.message);

      if (!this.sockets[sock.deviceID]) {
        sock.deviceID = this.deviceID
        this.sockets[sock.deviceID] = sock
      }
      this.messageRouter()
    });
    sock.on('end', () => {
      console.log('End on Sock Device %s:', sock);
      if (sock.deviceID)
        delete this.sockets[sock.deviceID]
    })
    sock.on('close', () => {
      console.log('Close on Sock Device %s:', sock);
      if (sock.deviceID)
        delete this.sockets[sock.deviceID]
    });
    sock.on('error', (err) => {
      console.log('Error on Sock Device %s:', sock);
      if (sock.deviceID)
        delete this.sockets[sock.deviceID]
    });
  };

  onServerError(error) {
    if (error.code === 'EADDRINUSE') {
      console.log('Address in use, retrying...');
      setTimeout(() => {
        this.server.close();
        this.server.listen(DEFAULT_PORT || this.port, () => {
          console.log('***************Server listening on port %s****************', this.port);
        });
      }, 5000);
    }
  }
  serverListen() {
    setTimeout(() => {
      this.server.close();
      this.server.listen(DEFAULT_PORT || this.port, () => {
        console.log('***************Server listening on port %s****************', this.port);
      });
    }, 1000);
  }
}




/*

import { p, now, formatTime } from '../imports/tools'
import { streamer } from '../imports/streamers'
import { Tasks, Trails, Scripts, Responses } from '../imports/collections'


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


      socket.on('end', Meteor.bindEnvironment(() => {
        delete sockets[socket.mobileID]
        Meteor.call('removeTrail', socket.mobileID)

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

    const mm = this.mobileMessage
    const mobileID = mm.slice(mm.indexOf('ID=') + 3, mm.indexOf('<'))
    Meteor.call('upsertResponse', mobileID, mm)
    Meteor.call('socketSend', mobileID, mobileID)
    Meteor.call('upsertTrail', mobileID)

    this.taskWorker(mobileID, mm)
  }
  trail() {

    const mm = this.mobileMessage
    const mobileID = mm.slice(mm.indexOf('ID=') + 3, mm.indexOf('<'))
    Meteor.call('socketSend', mobileID, mobileID)
    Meteor.call('upsertTrail', mobileID)
    this.syncWorker(mobileID)
  }
  heartbeat() {

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

      const cmd1 = task.commands.filter(el => el.status == 1)[0]

      cmd1 ? Meteor.call('socketSend', mobileID, cmd1.command) : false
    }
  }
}





Meteor.methods({

  socketSend: (mobileID, message) => {
    sockets[mobileID].write(message)
  },
  getConnections: () => {
    return Object.keys(sockets).length
  },

  upsertTrail: (mobileID) => {
    Trails.upsert({ mobileID }, { $set: { now: now() } })
  },

  removeTrail: (mobileID) => {
    Trails.remove({ mobileID })
  },
  removeAllTrails: () => {
    Trails.remove({})
  },

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

          line.indexOf('SXAFU0C') < 0 &&

          line.indexOf('SID') < 0
      })
      if (lines.length > 0) {
        commands = lines.map((line, index) => {
          return {
            index: (index + 1),
            command: line.trim(),

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
*/


