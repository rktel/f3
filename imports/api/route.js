import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../ui/views/Login.vue'
import Index from '../ui/views/home/Index.vue'
import Track from '../ui/views/home/Track.vue'
import Script from '../ui/views/home/Script.vue'
import Users from '../ui/views/home/Users.vue'

const routes = [
    { path: '/login', component: Login, name: 'Login' },
    {
        path: '/', component: Index, name: 'Home', redirect: '/track',
        children: [
            {
                path: 'track',
                name: 'Track',
                component: Track,
                icon:'devices'
            },
            {
                path: 'script',
                name: 'Script',
                component: Script,
                icon:'insert_drive_file'
            },
            {
                path: 'users',
                name: 'Users',
                component: Users,
                icon:'person'
            }
        ]
    },
]

export default new VueRouter({
    mode: 'history',
    routes
})


