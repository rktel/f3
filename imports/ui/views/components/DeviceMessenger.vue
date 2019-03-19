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

          <div
            class="messengerMsg vuebar-element"
            v-bar
            :style="{height: heightDeviceMessenger-64 +'px' }"
          >
            <v-timeline>
              <v-timeline-item v-for="(command,index) in deviceCommands" :key="index">
                <template v-slot:opposite>
                  <span>{{restFiveHours(command.sendTime)}}</span>
                </template>
                <v-card class="elevation-2">
                  <v-card-title class="headline">{{ command.command }}</v-card-title>
                  <v-card-text>{{command.response}}</v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </div>

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
import { Commands } from "../../../api/collections.js";
import { addHours } from "../../../tools/time.js";
export default {
  meteor: {
    $subscribe: {
      deviceCommands: []
    },
    deviceCommands() {
      if (this.deviceMessenger && this.deviceMessenger.deviceID) {
        return Commands.find({ deviceID: this.deviceMessenger.deviceID });
      }
    }
  },
  computed: {
    persona() {
      return this.$store.getters.persona;
    },
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
    restFiveHours(time) {
      return addHours(time, -5);
    },
    toggleFlagDMD(device) {
      this.$store.commit("toggleFlagDMD");
      this.$store.commit("setDeviceMessenger", {});
    },
    toUppercase() {
      if (this.deviceMsg) this.deviceMsg = this.deviceMsg.trim().toUpperCase();
    },
    sendMsg() {
      const device = this.deviceMessenger;
      const message = this.deviceMsg;
      const persona = this.persona;
      switch (device.protocol) {
        case "Syrus":
          stSyrus.emit("SEND_COMMAND_SYRUS", device.deviceID, message, persona);
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
