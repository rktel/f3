<script>
    export default{
        name: 'App',

    }
</script>
<template>
    <v-app>
    <v-navigation-drawer v-model="drawer" fixed clipped class="grey lighten-4 elevation-4" app>
        <h1>Navbar</h1>
    </v-navigation-drawer>
    <v-toolbar dense color="amber" absolute clipped-left app></v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>