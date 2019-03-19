


Meteor.startup(() => {
    Meteor.call('devicesReset')
    Meteor.call('createHyperPersonal')
    Meteor.call('setEmailOptions')
})
