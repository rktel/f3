<template>
  <div>
    <table style="width:100%" v-for="item in items" :key="item.index">
      <tr>
        <td>Title</td>
        <td>{{item.title}}</td>
      </tr>
      <tr>
        <td>Icon</td>
        <td>{{item.icon}}</td>
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
