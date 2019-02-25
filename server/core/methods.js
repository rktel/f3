import { Personal } from '../../imports/api/collections'

Meteor.methods({
    /********* INITIAL METHODS ********/
    createHyperPersonal: function () {
        let hyperUserId
        if (Meteor.users.find().count() == 0) {
            hyperUserId = Accounts.createUser({
                username: Meteor.settings.private.HYPER_USER,
                password: Meteor.settings.private.HYPER_USER_PASSWORD,
            })
        }
        if (Personal.find().count() == 0) {
            Personal.insert({
                firstname: Meteor.settings.private.HYPER_PERSONAL_FIRSTNAME,
                lastname: Meteor.settings.private.HYPER_PERSONAL_LASTNAME,
                email: Meteor.settings.private.HYPER_PERSONAL_EMAIL,
                emailBack: Meteor.settings.private.HYPER_PERSONAL_EMAIL_BACK,
                role: Meteor.settings.private.HYPER_PERSONAL_ROLE,
                userId: hyperUserId
            })
        }
    },
    setEmailOptions: function () {
        process.env.MAIL_URL = 'smtp://' + encodeURIComponent(Meteor.settings.private.USER_SMTP) +
            ':' + encodeURIComponent(Meteor.settings.private.PASS_SMTP) +
            '@' + encodeURIComponent(Meteor.settings.private.SERVER_SMTP) + ':' + Meteor.settings.private.PORT_SMTP;
    },
    /*********PERSONAL************/
    getPersona: function () {
        return Personal.findOne({ userId: this.userId })
    },
});