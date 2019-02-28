<script>
import UserAvatarDialog from "../components/UserAvatarDialog";
export default {
  name: "Index",
  components: { UserAvatarDialog },
  created() {
    this.links = this.$router.options.routes[1].children;
    Meteor.call("getPersona", (error, persona) => {
      if (!error) {
        this.$store.commit("setPersonaProfile", persona);
      }
    });
  },
  mounted() {
    this.onResize();
  },
  data: () => ({
    drawer: true,
    links: []
  }),
  computed: {
    persona() {
      return this.$store.getters.persona;
    },
    userMenu() {
      return [
        { title: "Cerrar sesion", option: this.logout },
        { title: "Avatar", option: this.toggleFlagUAD }
      ];
    }
  },
  methods: {
    toggleFlagUAD() {
      this.$store.commit("toggleFlagUAD");
    },
    onResize() {
      this.$store.commit("setAppSize", {
        width: window.innerWidth,
        height: window.innerHeight
      });
    },
    logout() {
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
  <v-app v-resize="onResize" dark>
    <v-navigation-drawer fixed v-model="drawer" right app width="260" class="indigo darken-4">
      <user-avatar-dialog></user-avatar-dialog>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="persona.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light font-italic">{{persona.firstname}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-menu bottom left>
                <v-btn slot="activator" dark icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile v-for="(item, i) in userMenu" :key="i" @click="item.option">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense>
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
    <v-toolbar fixed app flat class="indigo darken-4">
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

