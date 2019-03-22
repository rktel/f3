<script>
import { stSyrus } from "../../../api/streamers.js";
import { Commands } from "../../../api/collections.js";
import { addHours } from "../../../tools/time.js";
export default {
  meteor: {

  },
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
    toUppercase() {
      if (this.deviceMsg) this.deviceMsg = this.deviceMsg.trim().toUpperCase();
    },

  }
};
</script>

<template>
  <v-layout row justify-center>
    <v-dialog v-model="flagDSD" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title><v-icon>file</v-icon></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="toggleFlagDSD">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

 
      </v-card>
    </v-dialog>
  </v-layout>
</template>