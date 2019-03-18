<script>
import { stSyrus } from "../../../api/streamers";
import { DevicesOnline } from "../../../api/collections.js";
export default {
  name: "Track",
  components: {},
  meteor: {
    $subscribe: {
      devices_online: []
    },
    devices_online() {
      return DevicesOnline.find({});
    }
  },
  methods: {
    deviceToggleMessages(device) {
      if (!this.deviceMessagesCardFlag) {
        this.deviceSelected = device;
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
    deviceSendMsg() {
      alert(this.deviceMsg);
    }
  },
  mounted() {
    /*
    stSyrus.on("DEVICES_ON", devicesOn => {
      this.DEVICES_ON = devicesOn;
      console.log(devicesOn);
    });
    stSyrus.emit("GET_DEVICES_ON");
    */
  },
  data: () => ({
    DEVICES_ON: [],
    deviceFilter: null,
    deviceInfoCardFlag: false,
    deviceInfo: {},
    deviceMessagesCardFlag: false,
    deviceMessages: [],
    deviceMsg: null,
    deviceSelected: null
  }),
  computed: {
    filteredDevice() {
  
        const devicesOnline = this.devices_online.filter(el => el.type == "syrus")
        console.log(devicesOnline);
      return[]
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
        <v-list class="pt-0 transparent" dark two-line dense>
          <v-list-tile v-for="device in filteredDevice" :key="device" avatar @click>
            <v-list-tile-avatar>
              <v-icon>developer_board</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ device.deviceID }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ device.connectionTime }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple @click="deviceToggleMessages(device)">
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

      <v-card class="ma-2" flat v-if="deviceMessagesCardFlag">
        <v-card-title class="py-2">
          <div>
            <h2>{{deviceSelected}}</h2>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-text-field
            v-model="deviceMsg"
            :append-outer-icon="'send'"
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


