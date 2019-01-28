import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

import 'vuetify/dist/vuetify.min.css'

import App from '../imports/ui/App.vue'

import store from '../imports/api/store'

Meteor.startup(()=>{
    new Vue({
        el:'#app',
        render: h=>h(App),
        store
    })
})