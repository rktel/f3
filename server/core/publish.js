import { Personal, Devices, Commands, Scripts, Tasks } from '../../imports/api/collections'

Meteor.publish('personal', () => {
    return Personal.find({ role: { $ne: Meteor.settings.private.HYPER_PERSONAL_ROLE } })
})
Meteor.publish('devices', () => {
    return Devices.find({}, { sort: { "lastDisconnectionTime": 1 } })
})
Meteor.publish('deviceCommands', () => {
    return Commands.find({}, { sort: { "sendTime": -1 }, limit: 100 })
})
Meteor.publish('scripts',()=>{
    return Scripts.find({})
})
Meteor.publish('tasks',()=>{
    return Tasks.find({})
})