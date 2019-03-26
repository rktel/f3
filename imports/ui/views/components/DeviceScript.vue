<script>
import { stSyrus } from "../../../api/streamers.js";
import { Commands } from "../../../api/collections.js";
import { addHours } from "../../../tools/time.js";
export default {
  meteor: {},
  computed: {
    persona() {
      return this.$store.getters.persona;
    },
    flagDSD() {
      return this.$store.getters.flagDSD;
    },
    deviceScript() {
      return this.$store.getters.deviceScript;
    },
    heightDeviceMessenger() {
      return this.$store.getters.heightDeviceMessenger;
    },
    scripts() {
      let scriptNames = this.$store.getters.storeScripts;
      scriptNames = scriptNames.map(e => e.name);
      return scriptNames;
    }
  },
  data: () => ({
    value: 0,
    scriptSelect: null
  }),
  methods: {
    scrollToBottomDM() {
      setTimeout(ns => {
        const se = document.getElementById("scrollElements");
        se.scrollTop = se.scrollHeight;
      }, 450);
    },
    restFiveHours(time) {
      if (time) return addHours(time, -5);
    },
    toggleFlagDSD(device) {
      this.$store.commit("toggleFlagDSD");
      this.$store.commit("setDeviceScript", {});
    },
    onStartTask(deviceID, scriptName) {
      const fullname = this.persona.firstname + " " + this.persona.lastname;
      if (deviceID && scriptName && fullname) {
       // Meteor.call("startTask", deviceID, scriptName, fullname);
      }
    }
  }
};
</script>

<template>
  <v-layout row justify-center>
    <v-dialog v-model="flagDSD" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title></v-toolbar-title>

          <v-toolbar-items>
            <v-btn icon dark @click="toggleFlagDSD">
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-toolbar-items>
          <v-spacer></v-spacer>
        </v-toolbar>

        <section>
          <v-card class="mx-auto" dark max-width="400">
            <v-toolbar color="transparent">
              <v-toolbar-title>
                <v-icon>insert_drive_file</v-icon>
                {{deviceScript.deviceID}}
              </v-toolbar-title>
            </v-toolbar>

            <v-card-title>
              <v-select :items="scripts" label="Scripts" v-model="scriptSelect"></v-select>
            </v-card-title>

            <v-layout align-center justify-end>
              <v-btn @click="onStartTask(deviceScript.deviceID, scriptSelect)">Iniciar</v-btn>
            </v-layout>

            <v-card-actions>
              <v-list-tile class="grow">
                <v-list-tile-avatar color="grey darken-3">
                  <v-progress-circular
                    :rotate="-90"
                    :size="100"
                    :width="15"
                    :value="value"
                    color="primary"
                  >{{ value }}</v-progress-circular>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{45}} de {{200}}</v-list-tile-title>
                </v-list-tile-content>

                <v-layout align-center justify-end>
                  <span class="subheading">{{persona.firstname}} {{persona.lastname}}</span>
                </v-layout>
              </v-list-tile>
            </v-card-actions>
          </v-card>
        </section>
      </v-card>
    </v-dialog>
  </v-layout>
</template>