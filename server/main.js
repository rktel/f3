import Syrus from './gps/dct/syrus_adapter'
const syrus = new Syrus(7100)

Meteor.startup(() => {
    Meteor.call('createHyperPersonal')
    Meteor.call('setEmailOptions')
})
