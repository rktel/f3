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
    }
  },
  data: () => ({
    value: 0
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
    }
  }
};
</script>

<template>
  <v-layout row justify-center>
    <v-dialog v-model="flagDSD" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            <v-icon>insert_drive_file</v-icon>
            {{deviceScript.deviceID}}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="toggleFlagDSD">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <section>
          <v-card class="mx-auto" color="#26c6da" dark max-width="400">
            <v-card-title>
              <v-select :items="['A','B','C','D']" label="Standard" v-model="scriptSelect"></v-select>
            </v-card-title>

            <v-card-text class="headline font-weight-bold"
            ></v-card-text>

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
                  <v-list-tile-title>{{persona.firstname}} {persona.lastname}</v-list-tile-title>
                </v-list-tile-content>

                <v-layout align-center justify-end>
                  <v-icon class="mr-1">mdi-heart</v-icon>
                  <span class="subheading mr-2">256</span>
                  <span class="mr-1">·</span>
                  <v-icon class="mr-1">mdi-share-variant</v-icon>
                  <span class="subheading">45</span>
                </v-layout>
              </v-list-tile>
            </v-card-actions>
          </v-card>
        </section>
      </v-card>
    </v-dialog>
  </v-layout>
</template>