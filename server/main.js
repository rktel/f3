import { Syrus } from '../server/gps/dct/syrus_adapter'


Meteor.startup(() => {
    Meteor.call('devicesReset')
    Meteor.call('createHyperPersonal')
    Meteor.call('setEmailOptions')
    new Syrus()
})
