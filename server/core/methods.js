import { Personal } from '../../imports/api/collections'

/********* INITIAL METHODS ********/
Meteor.methods({
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
                avatar: Meteor.settings.public.avatar[5],
                userId: hyperUserId
            })
        }
    },

});
/*********PERSONAL************/
const DEFAULT_AVATAR = Meteor.settings.public.avatar[5]
Meteor.methods({
    getPersona: function () {
        return Personal.findOne({ userId: this.userId })
    },
    saveUserPersona: function (persona) {
        const avatar = DEFAULT_AVATAR
        const created = (new Date()).toISOString()
        const urlFigo = Meteor.settings.private.URL_FIGO
        const fromEmail = Meteor.settings.private.USER_SMTP
        const subjectEmail = "FIGO [T&T-Securitas]"
        const { username, password } = createCredentials(persona)
        const bodyEmail = () => {
            return `Estimado ${firstname} ${lastname} \nLos datos de acceso a FIGO son los siguientes: \nURL: ${urlFigo}  \nUsuario: ${username} \nPassword: ${password} `
        }
        const userId = Accounts.createUser({ username, password })
        const { firstname, lastname, email, role } = persona
        return Personal.insert({ firstname, lastname, email, role, userId, username, password, created, avatar }, (error, id) => {
            // if (!error) Meteor.call("sendEmail", email, fromEmail, subjectEmail, bodyEmail())
        })

    },
    removePersona: function (persona) {
        const { _id, userId } = persona
        if (userId) {
            Meteor.users.remove({ _id: userId })
        }
        return Personal.remove({ _id })
    },
    updatePersona: function (persona) {
        const modified = (new Date).toISOString()
        const { firstname, lastname, role, _id, avatar, email, userId, username,password, created, avatar} = persona
        return Personal.update({ _id }, { $set: { firstname, lastname, email, role, userId, username, password, created, avatar } })
    }
})
/********EMAIL****************/
Meteor.methods({
    setEmailOptions: function () {
        process.env.MAIL_URL = 'smtp://' + encodeURIComponent(Meteor.settings.private.USER_SMTP) +
            ':' + encodeURIComponent(Meteor.settings.private.PASS_SMTP) +
            '@' + encodeURIComponent(Meteor.settings.private.SERVER_SMTP) + ':' + Meteor.settings.private.PORT_SMTP;
    },
    sendEmail(to, from, subject, text) {
        this.unblock();
        Email.send({ to, from, subject, text })
    }
})

/**HELPERS FUNCTIONS*/

function createCredentials(persona) {
    const { firstname, lastname } = persona
    const firstLetterUsername = firstname.substr(0, 1).toLowerCase()
    const moreLetterUsername = lastname.split(' ') ? lastname.split(' ')[0].toLowerCase().replace(/[aeiouáéíóú]/ig, '') : lastname.toLowerCase().replace(/[aeiouáéíóú]/ig, '')
    const username = firstLetterUsername + moreLetterUsername
    const password = firstname.split(' ') ? firstname.split(' ')[0].toLowerCase().replace(/[aeiouáéíóú]/ig, '') + Date.now().toString().substr(11) : firstname.toLowerCase().replace(/[aeiouáéíóú]/ig, '') + Date.now().toString().substr(11)
    return {
        username,
        password
    }
}