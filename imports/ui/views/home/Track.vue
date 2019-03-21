<script>
import { Devices } from "../../../api/collections.js";
import { addHours, sortDescDevice } from "../../../tools/time.js";
import DeviceMessenger from "../components/DeviceMessenger";
import DeviceMassiveMessenger from "../components/DeviceMassiveMessenger";
import DeviceMassiveScript from "../components/DeviceMassiveScript";

export default {
  name: "Track",
  components: {
    DeviceMessenger,
    DeviceMassiveMessenger,
    DeviceMassiveScript
  },
  meteor: {
    $subscribe: {
      devices: []
    },
    devices() {
      return Devices.find({});
    }
  },
  methods: {
    selectDevice(device) {
      this.$store.commit("setDAS", device);
    },
    deleteSelectedDevice(device) {
      this.$store.commit("deleteDAS", device);
    },
    scrollToBottomDM() {
      setTimeout(ns => {
        const se = document.getElementById("scrollElements");
        se.scrollTop = se.scrollHeight;
      }, 450);
    },
    restFiveHours(time) {
      if (time) return addHours(time, -5);
    },
    toggleFlagDMD(device) {
      this.$store.commit("toggleFlagDMD");
      this.$store.commit("setDeviceMessenger", device);
      this.scrollToBottomDM();
    },
    toggleFlagDMMD() {
      this.$store.commit("toggleFlagDMMD");
    },
    toggleFlagDMSD() {
      this.$store.commit("toggleFlagDMSD");
    }
  },
  data: () => ({
    deviceFilter: null
  }),
  computed: {
    filteredDevice() {
      if (!this.deviceFilter) return sortDescDevice(this.devices);
      let searchText = this.deviceFilter.toLowerCase();
      return sortDescDevice(this.devices).filter(d =>
        d.deviceID.toLowerCase().includes(searchText)
      );
    },
    heightList() {
      return this.$store.getters.heightList;
    },
    devicesArraySelected() {
      return this.$store.getters.devicesArraySelected;
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
        <h4 class="my-0">Dispositivos {{ devices.length }}</h4>
      </v-toolbar>
      <v-divider></v-divider>

      <div v-bar class="vuebar-element" :style="{height: heightList+'px' }">
        <v-list class="pt-0 transparent" dark two-line dense>
          <v-list-tile
            v-for="device in filteredDevice"
            :key="device.deviceID"
            avatar
            @click
            @dblclick="selectDevice(device)"
          >
            <v-list-tile-avatar>
              <v-icon :class="{'green': device.connectionStatus == 'on'}">developer_board</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ device.deviceID }}</v-list-tile-title>
              <v-list-tile-sub-title
                title="Hora de conexion"
              >{{ restFiveHours(device.connectionTime) }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple @click="toggleFlagDMD(device)">
                <v-icon color="grey lighten-1">message</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn icon ripple @click="toggleFlagDMD(device)">
                <v-icon color="grey lighten-1">insert_drive_file</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </div>
      <device-messenger></device-messenger>
      <device-massive-messenger></device-massive-messenger>
      <device-massive-script></device-massive-script>
    </section>

    <section class="itemTwo">
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark>
        <v-chip>Masivo</v-chip>
        <v-spacer></v-spacer>
        <!--v-btn color="green" flat class="white--text" @click="toggleFlagDMMD">
          <v-icon dark>message</v-icon>
        </v-btn-->
        <!--v-btn color="green" flat class="white--text" @click="toggleFlagDMSD">
          <v-icon dark>insert_drive_file</v-icon>
        </v-btn-->
      </v-toolbar>
      <v-divider></v-divider>

      <div>
        <ol>
          <li v-for="(element, index) in devicesArraySelected" :key="index">
            <div>
              <v-chip color="secondary" text-color="white" label class="caption">
                {{element.deviceID}}
                <v-icon right @click="deleteSelectedDevice(element)">close</v-icon>
              </v-chip>
            </div>
          </li>
        </ol>
      </div>
    </section>
  </section>
</template>


