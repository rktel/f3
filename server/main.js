Meteor.startup(() => {
    console.log("Hello Universe!!")
    Meteor.call('createHyperPersonal')
    Meteor.call('setEmailOptions')
})
