<script>
import { Scripts } from "../../../api/collections.js";

export default {
  name: "Script",
  meteor: {
    $subscribe: {
      scripts: []
    },
    scripts() {
      return Scripts.find({});
    }
  },
  methods: {
    fileChange(event) {
      const file = event.target.files[0];
      if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
          const text = reader.result;
          const script = { name: file.name, original: text };
          Meteor.call("upsertScript", script);
        };
        reader.readAsText(file);
      }
    },
    onScriptSelected(script){
      this.scriptSelected = script
      console.log(script);
    }
  },
  data: () => ({
    scriptSelected: null
  }),
  computed: {
    heightList() {
      return this.$store.getters.heightList;
    }
  }
};
</script>
<template>
  <section class="contenedor bg-color">
    <section class="itemOne">
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark>
        <v-text-field label="Buscar script" prepend-icon="search" single-line clearable></v-text-field>
      </v-toolbar>
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark dense>
        <h4 class="my-0">Scripts registrados {{ scripts.length }}</h4>
      </v-toolbar>
      <v-divider></v-divider>
      <div v-bar class="vuebar-element" :style="{height: heightList+'px' }">
        <v-list class="pt-0 transparent" dense dark>
          <v-list-tile v-for="script in scripts" :key="script.commands.index" @click="onScriptSelected">
            <v-list-tile-action>
              <v-icon>insert_drive_file</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{script.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </section>

    <section class="itemTwo">
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark>
        <v-spacer></v-spacer>
        <input v-show="false" ref="inputUpload" type="file" @change="fileChange">
        <v-btn color="green" flat class="white--text" @click="$refs.inputUpload.click()">
          Agregar
          <v-icon right dark>insert_drive_file</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>

      <v-card class="ma-2" flat v-if="scriptSelected">
        <v-card-title class="py-2">{{scriptSelected.name}}</v-card-title>
        <div>{{scriptSelected.name}}</div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="indigo">Ocultar</v-btn>
          <v-btn flat color="pink">
            Eliminar
            <v-icon right dark>insert_drive_file</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>
  </section>
</template>
