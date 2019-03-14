import { Events, Infos, Last } from '../../imports/api/collections'

Meteor.methods({
    insertEvent: function (data) {
        Events.insert(data)
        Last.upsert(data.deviceId, data)
    },
    insertInfo: function (data) {
        Infos.insert(data)
    }
});