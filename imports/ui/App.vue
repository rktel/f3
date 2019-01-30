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
    }
    .itemOne{
        background-color: teal;
        flex: 3 1 auto;
        align-self: stretch;
    }
    .itemTwo{
        background-color: indigo;
        flex: 7 1 auto;
        align-self: stretch;
    }
</style>