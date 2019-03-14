import { Events, Infos, Last } from '../../imports/api/collections'

Meteor.methods({
    insertEvent: function (data) {
        Events.insert(data)
        Last.upsert({ 'data.event.deviceId': data.event.deviceId }, { $set: { data } })
    },
    insertInfo: function (data) {
        Infos.insert(data)
    }
});

