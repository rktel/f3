import { Events, Infos, Last } from '../../imports/api/collections'

Meteor.methods({
    insertEvent: function (data) {
        Events.insert(data)
        Last.upsert({ 'event.device': data.event.deviceID }, { $set: data })
    },
    insertInfo: function (data) {
        Infos.insert(data)
    }
});

