<template>
  <v-layout row justify-center>
    <v-dialog v-model="flagDMD" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{deviceMessenger.deviceID}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="toggleFlagDMD">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <section :style="{position:'absolute', bottom: 0, left:0, right:6+'px'}">
          <v-text-field
            style
            v-model="deviceMsg"
            :append-outer-icon="'send'"
            box
            clear-icon="mdi-close-circle"
            clearable
            label="Message"
            type="text"
            @click:append-outer="sendMsg"
          ></v-text-field>
        </section>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  computed: {
    flagDMD() {
      return this.$store.getters.flagDMD;
    },
    deviceMessenger() {
      return this.$store.getters.deviceMessenger;
    }
  },
  data: () => ({
    deviceMsg: null
  }),
  methods: {
    toggleFlagDMD(device) {
      this.$store.commit("toggleFlagDMD");
      this.$store.commit("setDeviceMessenger", {});
    },
    sendMsg() {
      alert("Hello");
    }
  }
};
</script>

<style>
</style>
