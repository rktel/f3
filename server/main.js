


Meteor.startup(() => {
    Meteor.call('createHyperPersonal')
    Meteor.call('setEmailOptions')
})
