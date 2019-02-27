import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        personaProfile: {},
        appSize: {
            width: 0,
            height: 0
        },
        flagUFD: false,
        flagUAD: false
    },
    getters: {
        persona: state => state.personaProfile,
        appSize: state => state.appSize,
        flagUFD: state => state.flagUFD,
        flagUAD: state => state.flagUAD,
    },
    mutations: {
        setPersonaProfile: (state, personaProfile) => {
            state.personaProfile = personaProfile
        },
        setAppSize: (state, size) => {
            state.appSize = size
        },
        toggleFlagUFD: (state) => {
            state.flagUFD = !state.flagUFD
        },
        toggleFlagUAD: (state) => {
            state.flagUAD = !state.flagUAD
        }
    },
    actions: {}
})
