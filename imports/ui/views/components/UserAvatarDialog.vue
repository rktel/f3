<script>
export default {
  name: "UserAvataDialog",
  created() {
    this.items = Meteor.settings.public.avatar;
  },
  computed: {
    flagUAD() {
      return this.$store.getters.flagUAD;
    },
    persona() {
      return this.$store.getters.persona;
    }
  },
  methods: {
    toggleFlagUAD() {
      this.$store.commit("toggleFlagUAD");
    },
    updateUP() {
      this.persona.avatar = this.avatar;
      Meteor.call("updatePersona", this.persona);
      this.avatar = null;
    }
  },
  data: () => ({
    items: [],
    avatar: null
  })
};
</script>
<template>
  <v-dialog v-model="flagUAD" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Seleccione un avatar</span>
      </v-card-title>
      <v-card-text>
        <v-select :items="items" label="Links" v-model="avatar"></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="toggleFlagUAD">Cerrar</v-btn>
        <v-btn color="blue darken-1" flat @click="updateUP">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>