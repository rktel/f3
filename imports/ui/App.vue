<template>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
    Meteor.userId()
      ? this.$router.push({ name: "Home" })
      : this.$router.push({ name: "Login" });
  }
};
</script>

<style>
</style>