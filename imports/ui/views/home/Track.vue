<script>
import { stSyrus } from "../../../api/streamers";

export default {
  name: "Track",
  methods: {
    setDeviceCard(device) {
      this.displayDeviceCard = true;
      Meteor.call("findInfo", device, function(error, success) {
        if (error) {
          console.log("error", error);
        }
        if (success) {
          console.log(success);
        }
      });
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
    displayDeviceCard: false
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
          <v-list-tile
            v-for="device in filteredDevice"
            :key="device"
            @click="setDeviceCard(device)"
          >
            <v-list-tile-action>
              <v-icon>rss_feed</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ device }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </section>
    <section class="itemTwo">
      <v-divider></v-divider>
      <v-toolbar flat class="pt-0 transparent" dark>
        <v-spacer></v-spacer>
        <v-btn color="green" flat class="white--text">Unknow
          <v-icon right dark>waves</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card class="ma-2" flat v-if="displayDeviceCard">
        <v-card-title class="py-2">
          <div>
            <h1>Device Card</h1>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="indigo">Ocultar</v-btn>
          <v-btn flat color="pink">Eliminar
            <v-icon right dark>person</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>
  </section>
</template>


