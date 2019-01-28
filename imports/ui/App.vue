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
        <v-content>
            <v-btn small>{{color}}</v-btn>
        </v-content>
    </v-app>
</template>