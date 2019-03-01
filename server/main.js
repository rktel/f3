Meteor.startup(() => {
    console.log("Hello  2!!")
    Meteor.call('createHyperPersonal')
    Meteor.call('setEmailOptions')
})
