<script>
import { stSyrus } from "../../../api/streamers.js";
import { Commands } from "../../../api/collections.js";
import { addHours } from "../../../tools/time.js";
export default {
  meteor: {
    $subscribe: {
      deviceCommands: []
    },
    deviceCommands() {
        /*
      if (this.deviceMessenger && this.deviceMessenger.deviceID) {
        return Commands.find({ deviceID: this.deviceMessenger.deviceID });
      }
      */
    }
  },
  computed: {
    persona() {
      return this.$store.getters.persona;
    },
    flagDMSD() {
      return this.$store.getters.flagDMSD;
    },
  },
  data: () => ({
    
  }),
  methods: {
    toggleFlagDMSD(device) {
      this.$store.commit("toggleFlagDMSD");
    },

  }
};
</script>

<template>
  <v-layout row justify-center>
    <v-dialog v-model="flagDMSD" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Masivo <v-icon>insert_drive_file</v-icon></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="toggleFlagDMSD">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>


      </v-card>
    </v-dialog>
  </v-layout>
</template>