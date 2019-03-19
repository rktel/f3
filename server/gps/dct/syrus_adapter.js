
var net = require('net');
import SyrusParser from './syrus_parser'
import { stSyrus } from '../../../imports/api/streamers'

// FIRMWARE [1]
// device TEst: 357042063175104
//Configuration parameters  >RXART;3.4.18;EHS6.T;interface=1.9.1.1T;imsi=214074301431066,operator=MOVISTAR,sim_id=8934072100261855798,;ID=357042066587636<

const DEFAULT_PORT = 7100
let SOCKETS = []
let DEVICE = null
const APP_VERSION = Meteor.settings.public.appVersion
const SYRUS_PROTOCOL = Meteor.settings.public.syrusProtocol
// stSyrus.emit('sendCommand', device.deviceID, message)
stSyrus.on("SEND_COMMAND_SYRUS", Meteor.bindEnvironment((deviceID, message, persona) => {
  sendCommand(deviceID, message, persona)
}))

function Syrus(port = DEFAULT_PORT) {

  const server = net.createServer(Meteor.bindEnvironment(function (socket) {

    socket.on('error', Meteor.bindEnvironment(function (err) {
      console.log('Socket error:', socket.deviceID, err);
      outSOCKETS_DEVICE(socket)
    }));
    socket.on('close', Meteor.bindEnvironment(function () {
      console.log('Socket closed:', socket.deviceID);
      outSOCKETS_DEVICE(socket)
    }));

    socket.on('end', Meteor.bindEnvironment(function () {
      console.log('Socket End:', socket.deviceID);
      outSOCKETS_DEVICE(socket)
    }));

    socket.on('data', Meteor.bindEnvironment(function (data) {
      console.log(data.toString().trim());

      if (data && data.length > 0) {
        const deviceID = getDeviceID(data.toString().trim())

        if (deviceID) {
          // console.log('deviceID:', deviceID);
          inSOCKETS_DEVICE(socket, deviceID)
          saveData(data.toString().trim())
          findResponseCommand(deviceID, data.toString().trim())
          //Enviamos ACK al Equipo
          socket.write(deviceID)
        }
      }

    }))

  }))

  server.listen(port, () => {
    console.log("Server TCP Ready on port", port);
    server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
          server.close();
          server.listen(port, () => {
            console.log("Restart Server TCP Ready on port", port);
          });
        }, 1500);
      }
    });

  });
}
export { Syrus }



/**FUNCIONES DE APOYO */
function findResponseCommand(deviceID, data){
  // {...,deviceID:"0007", response:">RXART<",status:2,	receivedTime: "2019-03-16T23:34:52.000Z"}
  const commandObject = {
    deviceID, response: data, receivedTime: (new Date()).toISOString()
  }
  Meteor.call('updateCommand', commandObject)
}
function sendCommand(deviceID, message, persona) {
  const socket = SOCKETS.filter(d => d.deviceID == deviceID)
  if (socket && socket[0]) {
    message = message.includes('>') && message.includes('<') ? message : '>' + message + '<'
    socket[0].write(message)
    const fullname = persona.firstname + " " + persona.lastname
    const now = (new Date()).toISOString()
    const commandObject = {
      author: fullname, deviceID: deviceID, command: message, status: 1, sendTime: now, requestedBy: fullname
    }
    // {author:"Pipo",deviceID:"0007",command: ">SRT<",status:1, sendTime: "2019-03-16T23:34:51.000Z",requestedBy:"Pipo",}
    // insertCommand
    Meteor.call('insertCommand', commandObject);
  }

}
function deviceOn(device) {
  Meteor.call('deviceOn', device)
}
function deviceOff(device) {
  Meteor.call('deviceOff', device)
}
function inSOCKETS_DEVICE(socket, deviceID) {
  const connectionStatus = "on"
  const appVersion = APP_VERSION
  const protocol = SYRUS_PROTOCOL
  const ip = socket.remoteAddress.split(':')[3]
  const port = socket.remotePort
  const connectionTime = (new Date()).toISOString()

  if (SOCKETS.filter(el => el.deviceID == deviceID).length == 0) {
    socket['deviceID'] = deviceID
    socket['ip'] = ip
    socket['port'] = port
    SOCKETS.push(socket)
    DEVICE = { appVersion, protocol, deviceID, connectionStatus, connectionTime, ip, port }
    deviceOn(DEVICE)
  }else{
    if (SOCKETS.filter(el => el.port == port).length == 0) {
        
        SOCKETS = SOCKETS.filter(el => el.deviceID !== deviceID)
        DEVICE = { deviceID, connectionStatus: 'off', lastDisconnectionTime : (new Date()).toISOString()}
        deviceOff(DEVICE)
        socket['deviceID'] = deviceID
        socket['ip'] = ip
        socket['port'] = port
        SOCKETS.push(socket)
        DEVICE = { appVersion, protocol, deviceID, connectionStatus, connectionTime, ip, port }
        deviceOn(DEVICE)
        
    }
  }
}
function outSOCKETS_DEVICE(socket) {
  const { deviceID } = socket
 
  const connectionStatus = "off"
  const lastDisconnectionTime = (new Date()).toISOString()
  if (deviceID) {
    
    SOCKETS = SOCKETS.filter(el => el.deviceID !== deviceID)
    DEVICE = { deviceID, connectionStatus, lastDisconnectionTime }
    deviceOff(DEVICE)
  }
}

function saveData(data) {
  new SyrusParser(data)
}

function getDeviceID(data) {
  if (data.length == 15) {
    return data
  }
  if (data.includes('>R')) {
    return data.substring(data.indexOf('ID=') + 3, data.indexOf('<'))
  }
  return null
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


