import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuebar from 'vuebar';

Vue.use(Vuetify)
Vue.use(Vuebar);

import 'vuetify/dist/vuetify.min.css'

import App from '../imports/ui/App.vue'

import store from '../imports/api/store'

import router from '../imports/api/route'

Vue.config.productionTip = false

Meteor.startup(()=>{
    new Vue({
        el:'#app',
        render: h=>h(App),
        store,
        router
    })
})