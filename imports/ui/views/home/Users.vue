<script>
import UserSimpleTable from "../components/UserSimpleTable";
import UserFormDialog from "../components/UserFormDialog";
import { Personal } from "../../../api/collections.js";

export default {
  name: "Users",
  components: {
    UserSimpleTable,
    UserFormDialog
  },
  meteor: {
    $subscribe: {
      personal: []
    },
    personal() {
      return Personal.find({});
    }
  },
  methods: {
    toggleFlagUFD() {
      this.$store.commit("toggleFlagUFD");
    },
    setUserCard(user) {
      this.displayUserCard = true;
      this.userCard = user;
    },
    removeUP() {
      this.displayUserCard = false;
      Meteor.call("removePersona", this.userCard);
      this.userCard = {};
    },
    hideUP() {
      this.displayUserCard = false;
      this.userCard = {};
    }
  },
  data: () => ({
    displayUserCard: false,
    userCard: {},
    userFilter: null
  }),
  computed: {
    filteredUser() {
      if (!this.userFilter) return this.personal;
      let searchText = this.userFilter.toLowerCase();
      return this.personal.filter(p => {
        return (
          p.firstname.toLowerCase().includes(searchText) ||
          p.lastname.toLowerCase().includes(searchText) ||
          p.email.toLowerCase().includes(searchText)
        );
      });
    },
    heightList() {
      return this.$store.getters.heightList;
    }
  }
};
</script>
<template>
  <section class="contenedor bg-color">
    <section class="itemOne">
      <user-form-dialog></user-form-dialog>
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark>
        <v-text-field
          label="Buscar usuario"
          prepend-icon="search"
          single-line
          v-model="userFilter"
          clearable
        ></v-text-field>
      </v-toolbar>
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark dense>
        <h4 class="my-0">Usuarios registrados {{ personal.length }}</h4>
      </v-toolbar>
      <v-divider></v-divider>
      <div class="vuebar-element" :style="{height: heightList+'px' }">
        <v-list class="pt-0 transparent" dense dark>
          <v-list-tile v-for="item in filteredUser" :key="item.index" @click="setUserCard(item)">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.firstname }}&nbsp;{{item.lastname}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </section>

    <section class="itemTwo">
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark>
        <v-spacer></v-spacer>
        <v-btn color="green" flat class="white--text" @click="toggleFlagUFD">Agregar
          <v-icon right dark>person</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card class="ma-2" flat v-if="displayUserCard">
        <v-card-title class="py-2">
          <div>
            <user-simple-table :item="userCard"></user-simple-table>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="indigo" @click="hideUP">Ocultar</v-btn>
          <v-btn flat color="pink" @click="removeUP">Eliminar
            <v-icon right dark>person</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>
  </section>
</template>

