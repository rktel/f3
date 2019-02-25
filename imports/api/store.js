import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        personaProfile: {}
    },
    getters: {
        persona: state => state.personaProfile
    },
    mutations: {
        setPersonaProfile: (state, personaProfile) => {
            state.personaProfile = personaProfile
        }
    },
    actions: {}
})
