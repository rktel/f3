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
                <div class="item">1</div>
                <div class="item">2</div>
            </section>
        </v-content>
    </v-app>
</template>
<style scoped>
    .contenedor{
        display: flex
    }
    .item{
        background-color: teal;
        height: 200px;
        width: 200px;
    }
</style>