<script>
    export default{
        name: 'App',
        mounted(){
            console.log(this.$store.state)
        }
    }
</script>
<template>
    <v-app class="indigo darken-4">
        <v-content>
            <ul>

            </ul>
        </v-content>
    </v-app>
</template>