<script>
    export default{
        name: 'App',
    }
</script>
<template>
    <v-app>
        <v-toolbar dense color="amber" absolute clipped-left app></v-toolbar>
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
        background-color: teal;
        flex: 3 1 auto;
        order: 0;
        align-self: stretch;
    }
    .itemTwo{
        background-color: indigo;
        flex: 7 1 auto;
        order: 0;
        align-self: stretch;
    }
    @media only screen and (max-width: 860px){
        .contenedor{
            display: flex;
            flex-direction: column;
            align-content: stretch;
            height: 100%;
        }
        .itemOne{
            background-color: teal;
            flex: 1 1 auto;
            order: 2;
            align-self: stretch;
        }
        .itemTwo{
            background-color: indigo;
            flex: 1 1 auto;
            order: 0;
            align-self: stretch;
        }
    }
</style>