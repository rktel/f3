<script>
    export default{
        name: 'App',
        mounted(){
            console.log(this.$store.state)
        },
        data(){
            return{
                appColor: 'red',
                appColorSelected:''
            }
        },
        computed:{
            colors(){
                return this.$store.state.appColors
            }
        },
        methods:{
            changeAppColor(){
                console.log('On changeAppColor', this.appColorSelected)
                this.appColor = this.appColorSelected
            }
        }
    }
</script>
<template>
    <v-app class="text--grey" :class="appColor">
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