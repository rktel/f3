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
    flagDMMD() {
      return this.$store.getters.flagDMMD;
    },
    devicesArraySelected() {
      return this.$store.getters.devicesArraySelected;
    }
  },
  data: () => ({}),
  methods: {
    toggleFlagDMMD(device) {
      this.$store.commit("toggleFlagDMMD");
    }
  }
};
</script>

<template>
  <v-layout row justify-center>
    <v-dialog v-model="flagDMMD" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Masivo
            <v-icon>message</v-icon>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="toggleFlagDMMD">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <section>
          {{[devicesArraySelected.length]}}
          <v-chip
            v-for="(device,index) in devicesArraySelected"
            :key="index"
            color="secondary"
            text-color="white"
            label
            class="caption"
          >
            {{ device.deviceID }}
            <v-icon right>developer_board</v-icon>
          </v-chip>
          
        </section>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
