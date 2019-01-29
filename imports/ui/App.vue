<script>
    export default{
        name: 'App',
        mounted(){
            console.log(this.$store.state)
        },
        data(){
            return{
                appColor: 'indigo darken-4',
                appColorSelected:''
            }
        },
        computed:{
            colors(){
                return this.$store.state.
            }
        },
        methods:{
            changeAppColor(){
                this.appColor = this.appColorSelected
            }
        }
    }
</script>
<template>
    <v-app class="appColor">
        <v-content>
                <v-combobox
                v-model="appColorSelected"
                :items="colors"
                label="App colors"
                ></v-combobox>
                <v-btn @click="changeAppColor">Change Color</v-btn>
        </v-content>
    </v-app>
</template>