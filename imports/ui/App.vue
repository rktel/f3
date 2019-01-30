<script>
    export default{
        name: 'App',

    }
</script>
<template>
    <v-app>
        <v-toolbar dense color="amber" absolute clipped-left app></v-toolbar>
        <v-content>
            <v-container>
                <v-layout row>
                    <v-flex xs6 order-lg2>
                        <v-card dark tile flat color="error">
                        <v-card-text>#1</v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs6>
                        <v-card dark tile flat color="red darken-4">
                        <v-card-text>#2</v-card-text>
                        </v-card>
                    </v-flex>
                    </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>