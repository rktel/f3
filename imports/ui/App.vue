<script>
    export default{
        name: 'App',

    }
</script>
<template>
    <v-app>

        <v-toolbar dense color="amber" absolute clipped-left app></v-toolbar>

        <v-content>
            <h1>Hellooooo......</h1>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>