<script>
import { Scripts } from "../../../api/collections.js";

export default {
  name: "Script",
  mounted(){
    this.scripts = this.$store.getters.storeScripts
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
    onScriptSelected(script) {
      this.scriptSelected = script;
    },
    onHideScriptSelected() {
      this.scriptSelected = null;
    },
    onRemoveScript() {
      Meteor.call("removeScript", this.scriptSelected);
      this.scriptSelected = null;
    }
  },
  data: () => ({
    scriptSelected: null,
    scriptFilter: null,
    scripts:[]
  }),
  computed: {
    heightList() {
      return this.$store.getters.heightList;
    },
    filteredScript() {
      if (!this.scriptFilter) return this.scripts;
      let searchText = this.scriptFilter.toLowerCase();
      return this.scripts.filter(s =>
        s.name.toLowerCase().includes(searchText)
      );
    }
  }
};
</script>
<template>
  <section class="contenedor bg-color">
    <section class="itemOne">
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark>
        <v-text-field label="Buscar script" prepend-icon="search" single-line clearable v-model="scriptFilter"></v-text-field>
      </v-toolbar>
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark dense>
        <h4 class="my-0">Scripts registrados {{ scripts.length }}</h4>
      </v-toolbar>
      <v-divider></v-divider>
      <div v-bar class="vuebar-element" :style="{height: heightList+'px' }">
        <v-list class="pt-0 transparent" dense dark>
          <v-list-tile
            v-for="script in filteredScript"
            :key="script.commands.index"
            @click="onScriptSelected(script)"
          >
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="indigo" @click="onHideScriptSelected">Ocultar</v-btn>
          <v-btn flat color="pink" @click="onRemoveScript">
            Eliminar
            <v-icon right dark>insert_drive_file</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-title
          class="py-2"
        >{{scriptSelected.name}} - Lineas{{[scriptSelected.commands.length]}}</v-card-title>
        <v-card-text>
          <p
            v-for="command in (scriptSelected.commands)"
            :key="command.index"
          >{{command.index}}.- {{command.command}}</p>
        </v-card-text>
      </v-card>
    </section>
  </section>
</template>
