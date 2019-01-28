import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

console.log(Meteor.settings.public.appColors)

export default new Vuex.Store({
    state: {
        appColors: Meteor.settings.public.appColors
    }
})
