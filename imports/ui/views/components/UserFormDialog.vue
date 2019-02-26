
<script>
export default {
  name: "UserFormDialog",
  created() {
    this.items = Meteor.settings.public.roles;
  },
  computed: {
    flagUFD() {
      return this.$store.getters.flagUFD;
    }
  },
  methods: {
    toggleFlagUFD() {
      this.$store.commit("toggleFlagUFD");
    },
    saveUserPersona() {
      const { firstname, lastname, email, role } = this.userPersona;
      if (firstname && lastname && email && role) {
        Meteor.call("saveUserPersona", this.userPersona, (error, success) => {
          if (!error) {
            console.log("succes", success);
            this.toggleFlagUFD();
            this.userPersona = {};
          }
        });
      }
    }
  },
  data: () => ({
    items: [],
    userPersona: {}
  })
};
</script>
<template>
  <v-dialog v-model="flagUFD" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Datos de Usuario</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-text-field label="Nombres" v-model="userPersona.firstname" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field label="Apellidos" v-model="userPersona.lastname" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Correo" v-model="userPersona.email" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select :items="items" label="Rol" v-model="userPersona.role" required></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="toggleFlagUFD">Cancelar</v-btn>
        <v-btn color="blue darken-1" flat @click="saveUserPersona">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
</style>
