import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../ui/views/Login.vue'
import F3 from '../ui/views/F3.vue'

const routes = [
    { path: '/', redirect: '/f3' },
    { path: '/login', component: Login },
    { path: '/f3', component: F3 },
]

export default new VueRouter({
    mode: 'history',
    routes
})


