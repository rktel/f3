<script>
    export default{
        name: 'App',
    }
</script>
<template>
    <v-app>
        <v-toolbar dense color="amber" absolute clipped-left app></v-toolbar>
        <section class="contenedor">
            <div>1</div>
            <div>2</div>
        </section>
    </v-app>
</template>
<style scoped>
    .contenedor{
        display: flex
    }
    .contenedor > div{
        background-color: teal
    }
</style>