<script>
    export default{
        name: 'App',
        mounted(){
            console.log(this.$store.state)
        },
        computed:{
            colors(){
                return this.$store.state
            }
        }
    }
</script>
<template>
    <v-app class="indigo darken-4">
        <v-content>
            <ul>
                <li v-for="(color, index) in colors" :key="index">{{color}}</li>
            </ul>
        </v-content>
    </v-app>
</template>