<script>
    export default{
        name: 'App',

    }
</script>
<template>
    <v-app>
    <v-navigation-drawer></v-navigation-drawer>
    <v-toolbar dense></v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>