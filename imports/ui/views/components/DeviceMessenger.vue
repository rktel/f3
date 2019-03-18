<template>
  <v-layout row justify-center>
    <v-dialog v-model="flagDMD" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{deviceMessenger.deviceID}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="toggleFlagDMD">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <section class="messengerContent" :style="{height: heightDeviceMessenger+'px' }">
          <div class="messengerMsg">message</div>
          <div class="messengerCommand">
            <v-text-field
              class="mx-2"
              v-model="deviceMsg"
              :append-outer-icon="'send'"
              clearable
              label="Message"
              type="text"
              @keyup="toUppercase"
              @keyup.enter.native="sendMsg"
              @click:append-outer="sendMsg"
            ></v-text-field>
          </div>
        </section>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { stSyrus } from "../../../api/streamers.js";
export default {
  computed: {
    flagDMD() {
      return this.$store.getters.flagDMD;
    },
    deviceMessenger() {
      return this.$store.getters.deviceMessenger;
    },
    heightDeviceMessenger() {
      return this.$store.getters.heightDeviceMessenger;
    }
  },
  data: () => ({
    deviceMsg: null
  }),
  methods: {
    toggleFlagDMD(device) {
      this.$store.commit("toggleFlagDMD");
      this.$store.commit("setDeviceMessenger", {});
    },
    toUppercase() {
      if (this.deviceMsg) this.deviceMsg = this.deviceMsg.trim().toUpperCase();
    },
    sendMsg() {
      const device = this.deviceMessenger
      const message = this.deviceMsg
      switch (device.protocol) {
        case "Syrus":
          stSyrus.emit('SEND_COMMAND_SYRUS', device.deviceID, message)
          break;
      
        default:
          break;
      }
    }
  }
};
</script>

<style>
</style>
