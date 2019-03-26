import { Events, Infos, Last, Devices, Commands, Scripts, Tasks } from '../../imports/api/collections'
import { log } from 'util';

Meteor.methods({
    insertEvent: function (data) {
        Events.insert(data)
        Last.upsert({ 'event.device': data.event.deviceID }, { $set: data })
    },
    upsertInfo: function (data) {
        Infos.upsert({ 'info.device': data.info.deviceID }, { $set: data })
    },
    findInfo: function (deviceID) {
        return Infos.findOne({ 'info.device': deviceID })
    },
    devicesReset: function () {
        console.log('devicesReset');
        Devices.rawCollection().updateMany({}, { $set: { connectionStatus: 'off', lastDisconnectionTime: (new Date()).toISOString() } })
    },
    deviceOn: function (device) {
        const { deviceID, appVersion, protocol, connectionStatus, connectionTime, ip, port } = device
        Devices.upsert({ deviceID }, { $set: { appVersion, protocol, connectionStatus, connectionTime, ip, port } })
    },
    deviceOff: function (device) {
        const { deviceID, connectionStatus, lastDisconnectionTime } = device
        Devices.upsert({ deviceID }, { $set: { connectionStatus, lastDisconnectionTime } })
    },
    insertCommand: function (commandObject) {
        //{author:"Pipo",deviceID:"0007",command: ">SRT<",status:1, sendTime: "2019-03-16T23:34:51.000Z",requestedBy:"Pipo",}
        Commands.insert(commandObject)
    },
    updateCommand: function (commandObject) {
        //	{...,deviceID:"0007", response:">RXART<",status:2,	receivedTime: "2019-03-16T23:34:52.000Z"}
        const initialCommands = Commands.find({ deviceID: commandObject.deviceID, status: 1 }).fetch()
        //console.log('initialCommands:',initialCommands);
        if (initialCommands.length > 0) {
            //console.log('initialCommands.length>0');

            initialCommands.forEach((el, index, array) => {
                //console.log('el:', el);

                const command = el.command.substring(2, el.command.length - 1)

                //console.log('command:',command);

                if (commandObject.response.includes(command)) {
                    //console.log('commandObject.response.includes(command)');

                    Commands.update({ deviceID: commandObject.deviceID, status: 1 }, { $set: { response: commandObject.response, status: 2, receivedTime: commandObject.receivedTime } })
                }
            })

        }
    },
    upsertScript: function (script) {
        const fileName = script.name
        const commands = scriptToCommands(script.original)
        if (commands.length > 0) {
            Scripts.upsert({ name: fileName }, { $set: { commands, original: script.original, createdAt: (new Date()).toISOString() } })
        }
    },
    removeScript: function (script) {
        const { name } = script
        Scripts.remove({ name })
    },
    startTask: function (deviceID, scriptName, fullname) {
        console.log(deviceID, scriptName,fullname);
        const scriptToTask = Scripts.findOne({ name: scriptName }, { fields: { _id: 0, createdAt: 0 } })
        console.log(scriptToTask);
        

    }
});



function scriptToCommands(file) {
    let commands = []
    if (file.includes('>') && file.includes('<')) {

        const lines = file.split('\r\n').filter(line => {
            return line.startsWith('>S') &&
                !line.includes('SRT;ALL') &&
                !line.includes('SXADP00') &&
                !line.includes('SXADP01') &&
                !line.includes('SXADP02') &&
                !line.includes('SRFA') &&
                !line.includes('SXAFU0C') &&
                !line.includes('SID')
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

    }
    if (commands.length > 0) {
        return commands
    } else {
        return []
    }

}