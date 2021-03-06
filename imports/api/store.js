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
        flagDSD:false,
        flagDMMD: false,
        flagDMSD: false,
        deviceMessenger: {},
        deviceScript: {},
        devicesArraySelected: [],
        scripts:[]
    },
    getters: {
        storeScripts: state => state.scripts,
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
        flagDMMD: state => state.flagDMMD,
        flagDMSD: state => state.flagDMSD,
        flagDSD: state => state.flagDSD,
        deviceMessenger: state => state.deviceMessenger,
        deviceScript: state => state.deviceScript,
        devicesArraySelected: state => state.devicesArraySelected
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
        toggleFlagDSD: (state) => {
            state.flagDSD = !state.flagDSD
        },
        setDeviceMessenger: (state, deviceMessenger) => {
            state.deviceMessenger = deviceMessenger
        },
        setDeviceScript: (state, deviceScript) => {
            state.deviceScript = deviceScript
        },
        toggleFlagDMMD:(state) =>{
            state.flagDMMD = !state.flagDMMD
        },
        toggleFlagDMSD:(state) =>{
            state.flagDMSD = !state.flagDMSD
        },
        setDAS:(state, device) =>{
            if(state.devicesArraySelected.filter(el => el.deviceID == device.deviceID).length == 0){
                state.devicesArraySelected.push(device)
            }
        },
        deleteDAS:(state,device) =>{
            if(state.devicesArraySelected.filter(el => el.deviceID == device.deviceID).length == 1){
                state.devicesArraySelected = state.devicesArraySelected.filter(el => el.deviceID !== device.deviceID)
            }
        },
        setStoreScripts:(state, scripts)=>{
            state.scripts = scripts
        }
    },
    actions: {}
})
