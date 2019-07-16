<template>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
    Meteor.userId()
      ? this.$router.push({ name: "F4" })
      : this.$router.push({ name: "Login" });
  }
};
</script>

<style>
</style>