import { Personal, Devices, Commands } from '../../imports/api/collections'

Meteor.publish('personal', () => {
    return Personal.find({ role: { $ne: Meteor.settings.private.HYPER_PERSONAL_ROLE } })
})
Meteor.publish('devices', () => {
    return Devices.find({}, { sort: { "lastDisconnectionTime": 1 } })
})
Meteor.publish('deviceCommands', () => {
    return Commands.find({})
})