<script>
    export default{
        name: 'App',
        computed: {
            color(){
                return this.$store.state.themeColor
            }
        }
    }
</script>
<template>
    <v-app>
        <v-content color='blue'>
            <v-btn small>{{color}}</v-btn>
        </v-content>
    </v-app>
</template>