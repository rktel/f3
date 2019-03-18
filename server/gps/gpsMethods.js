import { Events, Infos, Last, SyrusDevicesOn, Commands } from '../../imports/api/collections'

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
    deviceOn: function (device) {
        const { deviceID, connectionStatus, connectionTime, ip, port } = device
        SyrusDevicesOn.upsert({ deviceID }, { $set: { connectionStatus, connectionTime, ip, port } })
    },
    deviceOff: function (device) {
        const { deviceID, connectionStatus, disconnectionTime } = device
        SyrusDevicesOn.upsert({ deviceID }, { $set: { connectionStatus, disconnectionTime } })
    },
    insertCommand: function (commandObject) {
        //{author:"Pipo",deviceID:"0007",command: ">SRT<",status:1, sendTime: "2019-03-16T23:34:51.000Z",requestedBy:"Pipo",}
        Commands.insert(commandObject)
    },
    updateCommand: function (commandObject) {
        //	{...,deviceID:"0007", response:">RXART<",status:2,	receivedTime: "2019-03-16T23:34:52.000Z"}
        const seudoResponse = 'R' + commandObject.response.substr(1, 3)
        Commands.update({ deviceID: commandObject.deviceID, status: 1, command: { '$regex': seudoResponse, '$options': 'i' } }, { $set: { response: commandObject.response, status: 2, receivedTime: commandObject.receivedTime } })
    }
});

