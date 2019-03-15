<script>
import { stSyrus } from "../../../api/streamers";

export default {
  name: "Track",
  mounted() {
    stSyrus.on("DEVICES_ON", devicesOn => {
      this.DEVICES_ON = devicesOn;
      console.log(devicesOn);
    });
    stSyrus.emit("GET_DEVICES_ON");
  },
  data: () => ({
    DEVICES_ON: [],
    deviceFilter: null
  }),
  computed: {
    filteredDevice() {
      if (!this.deviceFilter) return this.DEVICES_ON;
      let searchText = this.deviceFilter.toLowerCase();
      return this.DEVICES_ON.filter(d => {
        return (
          d.toLowerCase().includes(searchText) 
        );
      });
    }
  }
};
</script>

<template>
  <section class="contenedor bg-color">
    <div class="itemOne">
      <v-toolbar flat class="pt-0 transparent" dark>
        <v-text-field
          label="Buscar dispositivo"
          prepend-icon="search"
          single-line
          v-model="deviceFilter"
          clearable
        ></v-text-field>
      </v-toolbar>
      <v-list>
        <v-list-tile v-for="device in filteredDevice" :key="device">{{device}}</v-list-tile>
      </v-list>
    </div>
    <div class="itemTwo">2</div>
  </section>
</template>


