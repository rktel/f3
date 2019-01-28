<script>
    export default{
        name: 'App',
        mounted(){
            console.log(this.$store.state.appColors)
        }
    }
</script>
<template>
    <v-app class="indigo darken-4">
        <v-content>
            <v-btn small>Go</v-btn>
        </v-content>
    </v-app>
</template>