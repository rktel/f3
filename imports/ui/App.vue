<script>
    export default{
        name: 'App',
        computed:{
            binding(){
                const binding = {}
                if(this.$vuetify.breakpoint.smAndDown) binding.column = true
                return binding
            }
        }
    }
</script>
<template>
    <v-app>
        <v-toolbar dense color="amber" absolute clipped-left app></v-toolbar>
        <v-content>

                <v-layout v-bind="binding">
                    <v-flex flex-grow>
                        <v-card dark tile flat color="error">
                        <v-card-text>#1</v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex flex-grow>
                        <v-card dark tile flat color="red darken-4">
                        <v-card-text>#2</v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>

        </v-content>
    </v-app>
</template>