<script>
import { stSyrus } from "../../../api/streamers";
import DeviceSimpleTable from "../components/DeviceSimpleTable";
export default {
  name: "Track",
  components: {
    DeviceSimpleTable
  },
  methods: {
    deviceToggleInfo(device) {
      if (!this.deviceInfoCardFlag) {
        Meteor.call("findInfo", device, (error, deviceInfo) => {
          if (!error) {
            if (deviceInfo) {
              this.deviceInfo = deviceInfo;
              this.deviceInfoCardFlag = true;
            }
          }
        });
      } else {
        this.deviceInfo = {};
        this.deviceInfoCardFlag = false;
      }
    },
    deviceToggleMessages(device) {
      if (!this.deviceMessagesCardFlag) {
        this.deviceMessagesCardFlag = true;
        /*
        Meteor.call("findMessages", device, (error, deviceMessages) => {
          if (!error) {
            console.log("deviceMessages:", deviceMessages);
          }
        });
*/
      }
    },
    deviceSendMsg(){
      alert(this.deviceMsg)
    }
  },
  mounted() {
    stSyrus.on("DEVICES_ON", devicesOn => {
      this.DEVICES_ON = devicesOn;
      console.log(devicesOn);
    });
    stSyrus.emit("GET_DEVICES_ON");
  },
  data: () => ({
    DEVICES_ON: [],
    deviceFilter: null,
    deviceInfoCardFlag: false,
    deviceInfo: {},
    deviceMessagesCardFlag: false,
    deviceMessages: [],
    deviceMsg: null,
  }),
  computed: {
    filteredDevice() {
      if (!this.deviceFilter) return this.DEVICES_ON;
      let searchText = this.deviceFilter.toLowerCase();
      return this.DEVICES_ON.filter(d => {
        return d.toLowerCase().includes(searchText);
      });
    },
    heightList() {
      const { width, height } = this.$store.getters.appSize;
      if (width < 900) {
        //console.log(parseInt(height / 2));
        return parseInt(height / 2);
      } else {
        //console.log(height);
        return height - 100;
      }
    }
  }
};
</script>

<template>
  <section class="contenedor bg-color">
    <section class="itemOne">
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark>
        <v-text-field
          label="Buscar dispositivo"
          prepend-icon="search"
          single-line
          v-model="deviceFilter"
          clearable
        ></v-text-field>
      </v-toolbar>
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark dense>
        <h4 class="my-0">Dispositivos online {{ DEVICES_ON.length }}</h4>
      </v-toolbar>
      <v-divider></v-divider>

      <div v-bar class="vuebar-element" :style="{height: heightList+'px' }">
        <v-list class="pt-0 transparent" dense dark>
          <v-list-tile v-for="device in filteredDevice" :key="device" avatar @click>
            <v-list-tile-avatar>
              <v-icon :class="['blue white--text']">rss_feed</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ device }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple @click="deviceToggleInfo(device)">
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">message</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </div>
    </section>

    <section class="itemTwo">
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>

      <v-card class="ma-2" flat v-if="deviceInfoCardFlag">
        <v-card-title class="py-2">
          <div>
            <device-simple-table :device="deviceInfo"></device-simple-table>
          </div>
        </v-card-title>
      </v-card>

      <v-card class="ma-2" flat v-if="deviceMessagesCardFlag">
        <v-card-title class="py-2">
          <div>
            <h2>Messages</h2>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-text-field
            v-model="deviceMsg"
            :append-outer-icon="message "
            box
            clear-icon="mdi-close-circle"
            clearable
            label="Message"
            type="text"
            @click:append-outer="deviceSendMsg"
          ></v-text-field>
        </v-card-actions>
      </v-card>
    </section>
  </section>
</template>


