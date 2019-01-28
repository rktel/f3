<script>
    export default{
        name: 'App',
        computed: {
            colors() => this.$store.state.appColors
        }
    }
</script>
<template>
    <v-app class="indigo darken-4">
        <v-content>
            <ul>

            </ul>
        </v-content>
    </v-app>
</template>