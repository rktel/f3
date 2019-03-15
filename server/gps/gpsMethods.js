import { Events, Infos, Last } from '../../imports/api/collections'

Meteor.methods({
    insertEvent: function (data) {
        Events.insert(data)
        Last.upsert({ 'event.device': data.event.deviceID }, { $set: data })
    },
    insertInfo: function (data) {
        Infos.upsert({ 'info.device': data.info.deviceID }, { $set: data })
    },
    findInfo: function (deviceID) {
        return Infos.findOne({ 'info.device': deviceID })
    },
});

