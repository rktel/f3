<script>
import { stSyrus } from "../../../api/streamers";

export default {
  name: "Track",
  mounted() {
    stSyrus.on("DEVICES_ON",(devicesOn)=>{
      console.log(devicesOn);
    })
  }
};
</script>

<template>
  <section class="contenedor bg-color">
    <div class="itemOne">Track</div>
    <div class="itemTwo">2</div>
  </section>
</template>


