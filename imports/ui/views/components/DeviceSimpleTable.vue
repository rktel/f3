<template>
  <div>
    <h3 class="my-0">INFORMACION DE: {{ device.info.device }}</h3>
    <table style="width:100%">
      <tr>
        <td>Firmware</td>
        <td>: {{device.info.firmware}}</td>
      </tr>
      <tr>
        <td>Hardware</td>
        <td>: {{device.info.hardware}}</td>
      </tr>
      <tr>
        <td>Cell info</td>
        <td>
          :
          <span>{{device.info.cell.split(',')[0]}}</span>
          <br>
          <span>{{device.info.cell.split(',')[1]}}</span>
          <br>
          <span>{{device.info.cell.split(',')[2]}}</span>
          <br>
          <span>{{device.info.cell.split(',')[3]}}</span>
          <br>
        </td>
      </tr>
      <tr class="text-no-wrap">
        <td>Conectado</td>
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