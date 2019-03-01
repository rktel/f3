import Syrus from './gps/dct/syrus_adapter'

Meteor.startup(() => {
    new Syrus(4100)
    Meteor.call('createHyperPersonal')
    Meteor.call('setEmailOptions')
})
