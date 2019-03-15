<template>
  <div>
    <h3 class="my-0">{{ device.info.device }}</h3>
    <table style="width:100%">
      <tr>
        <td>Firmware</td>
        <td>: {{device.info.firmware}}</td>
      </tr>
      <tr>
        <td>Hardware</td>
        <td>: {{device.info.hardware}}</td>
      </tr>
      <tr class="text-no-wrap">
        <td>Cell info</td>
        <td>: {{device.info.cell}}</td>
      </tr>
      <tr class="text-no-wrap">
        <td>Hora conexion</td>
        <td>: {{device.received}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["device"]
};
</script>

<style>
</style>