import { Personal, DevicesOnline } from '../../imports/api/collections'

Meteor.publish('personal', () => {
    return Personal.find({ role: { $ne: Meteor.settings.private.HYPER_PERSONAL_ROLE } })
})
Meteor.publish('devices_online', () => {
    return DevicesOnline.find({})
})