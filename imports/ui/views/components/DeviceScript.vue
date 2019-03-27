<script>
import { stSyrus } from "../../../api/streamers.js";
import { Tasks } from "../../../api/collections.js";
import { addHours } from "../../../tools/time.js";

export default {
  meteor: {
    $subscribe: {
      tasks: []
    },
    tasks() {
      let  tasks = Tasks.find({ deviceID: this.$store.getters.deviceScript.deviceID }).fetch()
      if(tasks && tasks.length>0){
        
        const task = tasks[0]
        const totalCommands = task ? task.commands.length : 0
        const status2Command = task ? task.commands.filter(el => el.status == 2).length : 0
        this.value = totalCommands && status2Command ? parseInt(status2Command*100/totalCommands): 0
        this.taskName = task.name
        this.taskTotal = totalCommands
        this.taskStatus = status2Command
        this.taskAuthor = task.author
      }
    }
  },
  computed: {
    persona() {
      return this.$store.getters.persona;
    },
    flagDSD() {
      return this.$store.getters.flagDSD;
    },
    deviceScript() {
      return this.$store.getters.deviceScript;
    },
    heightDeviceMessenger() {
      return this.$store.getters.heightDeviceMessenger;
    },
    scripts() {
      let scriptNames = this.$store.getters.storeScripts;
      scriptNames = scriptNames.map(e => e.name);
      return scriptNames;
    }
  },
  data: () => ({
    value: 0,
    scriptSelect: null,
    taskName:null,
    taskTotal: null,
    taskStatus: null,
    taskAuthor: null
  }),
  methods: {
    scrollToBottomDM() {
      setTimeout(ns => {
        const se = document.getElementById("scrollElements");
        se.scrollTop = se.scrollHeight;
      }, 450);
    },
    restFiveHours(time) {
      if (time) return addHours(time, -5);
    },
    toggleFlagDSD() {
      this.$store.commit("toggleFlagDSD");
      this.$store.commit("setDeviceScript", {});
    },
    onStartTask(deviceID, scriptName) {
      const fullname = this.persona.firstname + " " + this.persona.lastname;
      if (deviceID && scriptName && fullname) {
        Meteor.call("startTask", deviceID, scriptName, fullname);
      }
    }
  }
};
</script>

<template>
  <v-layout row justify-center>
    <v-dialog v-model="flagDSD" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title></v-toolbar-title>

          <v-toolbar-items>
            <v-btn icon dark @click="toggleFlagDSD">
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-toolbar-items>
          <v-spacer></v-spacer>
        </v-toolbar>

        <section>
          <v-card class="mx-auto" dark max-width="400">
            <v-toolbar color="transparent">
              <v-toolbar-title>
                <v-icon>insert_drive_file</v-icon>
                {{deviceScript.deviceID}}
              </v-toolbar-title>
            </v-toolbar>

            <v-card-title>
              <v-select :items="scripts" label="Scripts" v-model="scriptSelect"></v-select>
            </v-card-title>

            <v-layout align-center justify-end>
              <v-btn @click="onStartTask(deviceScript.deviceID, scriptSelect)">Iniciar</v-btn>
            </v-layout>
            <v-layout align-center justify-start>
                  <v-chip> {{taskName}}</v-chip>
            </v-layout>
            <v-layout align-center justify-start>
                  <v-progress-circular
                    :rotate="-90"
                    :size="100"
                    :width="15"
                    :value="value"
                    color="primary"
                  >{{ value }} %</v-progress-circular>
                  <v-chip> {{taskStatus}} de {{taskTotal}}</v-chip>
            </v-layout>
            <v-layout align-center justify-end class="ma-4">
              <v-chip>{{taskAuthor}}</v-chip>
            </v-layout>
          </v-card>
        </section>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

