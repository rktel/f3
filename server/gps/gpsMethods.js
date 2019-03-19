import { Events, Infos, Last, Devices, Commands } from '../../imports/api/collections'

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
        Devices.update({ connectionStatus: 'on' }, { $set: { connectionStatus: 'off', lastDisconnectionTime: (new Date()).toISOString() } }, { $multi: true })
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
        const commandFirst = Commands.findOne({ deviceID: commandObject.deviceID, status: 1 })
        if (commandFirst) {
            const command = commandFirst.command.substr(2,commandFirst.command.length-2)
            console.log('command:', command);
            console.log(commandObject.response);
            console.log(commandObject.response.includes(command));
            
            if (commandObject.response.includes(command)) {
                console.log("here");
                
                Commands.update({ deviceID: commandObject.deviceID, status: 1 }, { $set: { response: commandObject.response, status: 2, receivedTime: commandObject.receivedTime } })
            }
        }
    }
});

