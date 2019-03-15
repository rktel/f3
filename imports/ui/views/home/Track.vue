<script>
import { stSyrus } from "../../../api/streamers";

export default {
  name: "Track",
  mounted() {
    stSyrus.on("DEVICES_ON", devicesOn => {
      this.DEVICES_ON = devicesOn
      console.log(devicesOn);
    });
    stSyrus.emit("GET_DEVICES_ON")
  },
  data: () => ({
    DEVICES_ON: []
  })
};
</script>

<template>
  <section class="contenedor bg-color">
    <div class="itemOne">
      <h1>Track</h1>
      <v-list>
        <v-list-tile v-for="device in DEVICES_ON" :key="device">{{device}}</v-list-tile>
      </v-list>
    </div>
    <div class="itemTwo">2</div>
  </section>
</template>


