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
        flagUAD: false,
        flagDMD: false,
        deviceMessenger: {}
    },
    getters: {
        persona: state => state.personaProfile,
        heightList: state => {
            const { width, height } = state.appSize
            if (width < 900) {
                return parseInt(height / 2);
            } else {
                return height - 100;
            }
        },
        heightDeviceMessenger: state => {
            const { width, height } = state.appSize
            return height - 64;
        },
        flagUFD: state => state.flagUFD,
        flagUAD: state => state.flagUAD,
        flagDMD: state => state.flagDMD,
        deviceMessenger: state => state.deviceMessenger
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
        },
        toggleFlagDMD: (state) => {
            state.flagDMD = !state.flagDMD
        },
        setDeviceMessenger: (state, deviceMessenger) => {
            state.deviceMessenger = deviceMessenger
        }
    },
    actions: {}
})
