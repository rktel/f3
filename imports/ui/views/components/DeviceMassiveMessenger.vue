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
      if (this.devicesArraySelected && this.devicesArraySelected.length > 0) {
        let arrayIDs = [];

        this.devicesArraySelected.forEach(element => {
          arrayIDs.push(element.deviceID);
        });

        return Commands.find({ deviceID: { $in: arrayIDs } });
      }
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
      if (time) return addHours(time, -5);
    },
    toggleFlagDMMD(device) {
      this.$store.commit("toggleFlagDMMD");
    },
    toUppercase() {
      if (this.deviceMsg) this.deviceMsg = this.deviceMsg.trim().toUpperCase();
    },
    sendMsg() {
      const devices = this.devicesArraySelected;
      const message = this.deviceMsg;
      const persona = this.persona;
      devices.forEach(device => {
        switch (device.protocol) {
          case "Syrus":
            stSyrus.emit(
              "SEND_COMMAND_SYRUS",
              device.deviceID,
              message,
              persona
            );
            break;

          default:
            break;
        }
      });
      this.scrollToBottomDM();
    },
    scrollToBottomDM() {
      setTimeout(ns => {
        const se = document.getElementById("scrollElements");
        se.scrollTop = se.scrollHeight;
      }, 450);
    }
  }
};
</script>

<template>
  <v-layout row justify-center>
    <v-dialog v-model="flagDMMD" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>
            Masivo
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

          <section class="messengerContent" :style="{height: heightDeviceMessenger-100 +'px' }">
            <div
              v-bar
              class="vuebar-element messengerMsg"
              :style="{height: heightDeviceMessenger-200 +'px' }"
            >
              <div class="px-0 mx-0" id="scrollElements">
                <div v-for="(command,index) in deviceCommands" :key="index" class="px-0 mx-0">
                  <p
                    class="text-xs-right my-0 caption grey--text"
                  >{{command.author}} - {{restFiveHours(command.sendTime)}}</p>

                  <p class="text-xs-right my-0">
                    <v-chip color="secondary" text-color="white" label class="caption">
                      {{ command.command }}
                      <v-icon right>account_circle</v-icon>
                    </v-chip>
                  </p>

                  <p
                    class="my-0 caption ml-2 grey--text text--darken-3"
                  >{{command.deviceID}} - {{restFiveHours(command.receivedTime)}}</p>
                  <p class="my-0">
                    <v-chip color="white" text-color="black" label class="caption">
                      <v-avatar>
                        <v-icon>developer_board</v-icon>
                      </v-avatar>
                      {{ command.response }}
                    </v-chip>
                  </p>
                </div>
              </div>
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
        </section>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
