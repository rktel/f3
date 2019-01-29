<script>
    export default{
        name: 'App',

    }
</script>
<template>
    <v-app>
    <v-navigation-drawer permanent app></v-navigation-drawer>
    <v-toolbar dense app></v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>