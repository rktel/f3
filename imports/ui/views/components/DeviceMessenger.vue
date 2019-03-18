<template>
  <v-layout row justify-center>
    <v-dialog v-model="deviceDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{device}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="deviceDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-text-field
          v-model="deviceMsg"
          :append-outer-icon="'send'"
          box
          clear-icon="mdi-close-circle"
          clearable
          label="Message"
          type="text"
          @click:append-outer="sendMsg"
        ></v-text-field>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ["deviceDialog", "device"],
  data: () => ({
    deviceMsg: null
  }),
  methods:{
      sendMsg(){
          alert(this.device, this.deviceMsg)
      }
  }
};
</script>

<style>
</style>
