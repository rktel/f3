<script>
    export default{
        name: 'App',
        data: () => ({
            drawer: null
        }),
    }
</script>
<template>
    <v-app>
        <v-navigation-drawer
            fixed
            v-model="drawer"
            right
            app
            >
            <v-list dense>
                <v-list-tile @click="">
                <v-list-tile-action>
                    <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Home</v-list-tile-title>
                </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="">
                <v-list-tile-action>
                    <v-icon>contact_mail</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Contact</v-list-tile-title>
                </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="cyan" dark fixed app>
        <v-spacer></v-spacer>
        <v-toolbar-title>Application</v-toolbar-title>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        </v-toolbar>
        <v-content>
            <section class="contenedor">
                <div class="itemOne">1</div>
                <div class="itemTwo">2</div>
            </section>
        </v-content>
    </v-app>
</template>
<style scoped>
    .contenedor{
        display: flex;
        flex-direction: row;
        align-content: stretch;
        height: 100%;
    }
    .itemOne{
        flex: 3 1 auto;
        order: 0;
        align-self: stretch;
        border: 1px dotted gray;
    }
    .itemTwo{
        flex: 7 1 auto;
        order: 0;
        align-self: stretch;
        border: 1px dotted gray;
    }
    @media only screen and (max-width: 900px){
        .contenedor{
            display: flex;
            flex-direction: column;
            align-content: stretch;
            height: 100%;
        }
        .itemOne{
            flex: 1 1 auto;
            order: 2;
            align-self: stretch;
            border: 1px dotted gray;
        }
        .itemTwo{
            flex: 1 1 auto;
            order: 0;
            align-self: stretch;
            border: 1px dotted gray;
        }
    }
</style>