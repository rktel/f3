<template>
  <div>
    <table style="width:100%" v-for="item in items" :key="item.index">
      <tr>
        <td>Email</td>
        <td>: {{item.email}}</td>
      </tr>
      <tr>
        <td>Rol</td>
        <td>: {{item.rol}}</td>
      </tr>
      <tr>
        <td>Creado</td>
        <td>: {{item.creado}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["items"]
};
</script>

<style>
</style>
