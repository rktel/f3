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
        //console.log(deviceID, scriptName, fullname);
        const scriptToTask = Scripts.findOne({ name: scriptName }, { fields: { _id: 0, createdAt: 0, original: 0 } })
        if (scriptToTask) {
            scriptToTask.commands.map(el => el.status = 0)
            scriptToTask.status = 0
            scriptToTask.createdAt = (new Date()).toISOString()
            scriptToTask.author = fullname
            //console.log(scriptToTask);
            Tasks.upsert({ deviceID }, { $set: scriptToTask })
            const task = Tasks.findOne({ deviceID })
            const firtsCommand = task.commands[0].command
            Meteor.call('syrusTaskCommand', deviceID, firtsCommand, ns => {

                Tasks.update({ _id: task._id, "commands.index": 1 }, { $set: { "commands.$.status": 1, "commands.$.lastSendTime": (new Date()).toISOString() } })
                Tasks.update({ _id: task._id }, { $set: { status: 1 } })

            })
        }
    },
    taskWorker(deviceID) {
        const task = Meteor.call('getTask', deviceID)
        const commands = task ? task.commands : false
        if (commands) {
            commands.map((el, i, array) => {

                if (el.status == 1) {
                    Meteor.call('status2CommandTask', deviceID, el.index, ns => {
                        if (el.index == commands.length) {
                            Meteor.call('status2Task', deviceID)
                        }
                        if (array[i + 1] && array[i + 1].command) {
                            Meteor.call('syrusTaskCommand', deviceID, array[i + 1].command, ns => {
                                Meteor.call('status1CommandTask', deviceID, array[i + 1].index)
                            })
                        }
                    })
                }
            })
        }
    },
    syncWorker(deviceID){
    	const task = Meteor.call('getTask', deviceID)
    	if(task){
    		const cmd1 = task.commands.filter(el=> el.status == 1)[0]
    		cmd1 ? Meteor.call('syrusTaskCommand', deviceID, cmd1.command): false
    	}
    },
    getTask: (deviceID) => {
        return Tasks.findOne({ deviceID })
    },
    status2CommandTask: (deviceID, index) => {
        Tasks.update({ deviceID, "commands.index": index }, { $set: { "commands.$.status": 2, "commands.$.lastReceivedTime": (new Date()).toISOString() } })
    },
    status1CommandTask: (deviceID, index) => {
        Tasks.update({ deviceID, "commands.index": index }, { $set: { "commands.$.status": 1, "commands.$.lastSendTime": (new Date()).toISOString() } })
    },
    status2Task: (deviceID) => {
        Tasks.update({ deviceID }, { $set: { status: 2, endTime: (new Date()).toISOString() } })
    },
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