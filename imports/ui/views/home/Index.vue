<script>
export default {
  name: "Index",
  created() {
    const links = this.$router.options.routes[1].children;
    this.links = links;
    Meteor.call("getPersona", (error, persona) => {
      if (!error) {
        this.$store.commit("setPersonaProfile", persona);
      }
    });
  },
  data: () => ({
    drawer: true,
    links: []
  }),
  computed: {
    persona() {
      return this.$store.getters.persona;
    }
  },
  methods: {
    logout: function() {
      Meteor.logout(error => {
        if (!error) {
          this.$router.push({ name: "Login" });
        }
      });
    }
  }
};
</script>
<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" right app dark width="260">
      <v-toolbar flat class="transparent" dense>
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/lego/5.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light font-italic">{{persona.firstname}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple @click="logout" title="Cerrar sesion">
                <v-icon color="gray lighten-1">power_settings_new</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense>
        <v-divider></v-divider>
        <v-list-tile v-for="link in links" :key="link.name" :to="link.path">
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="body-2 font-italic">{{link.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="red accent-4" dark fixed dense app>
      <v-toolbar-title class="font-italic">{{this.$route.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <h4 class="subheading font-italic" title="Version 3.0
      02/2019">Figo</h4>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
