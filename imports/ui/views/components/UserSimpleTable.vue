<template>
  <div>
    <h3 class="my-0">{{ item.firstname }}&nbsp;{{item.lastname}}</h3>
    <table style="width:100%">
      <tr>
        <td>Username</td>
        <td>: {{item.username}}</td>
      </tr>
      <tr>
        <td>Password</td>
        <td>: {{item.password}}</td>
      </tr>
      <tr class="text-no-wrap">
        <td>Email</td>
        <td>: {{item.email}}</td>
      </tr>
      <tr>
        <td>Rol</td>
        <td>: {{item.role}}</td>
      </tr>
      <tr>
        <td>Creado</td>
        <td>: {{item.created}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style>
</style>
