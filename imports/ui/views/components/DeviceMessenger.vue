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

        <section class="messengerContent" :style="{height: heightDeviceMessenger+'px' }">
          <div>
            <beautiful-chat
              :participants="participants"
              :titleImageUrl="titleImageUrl"
              :onMessageWasSent="onMessageWasSent"
              :messageList="messageList"
              :newMessagesCount="newMessagesCount"
              :isOpen="isChatOpen"
              :close="closeChat"
              :open="openChat"
              :showEmoji="true"
              :showFile="true"
              :showTypingIndicator="showTypingIndicator"
              :colors="colors"
              :alwaysScrollToBottom="alwaysScrollToBottom"
              :messageStyling="messageStyling"
            />
          </div>
        </section>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { stSyrus } from "../../../api/streamers.js";
import { Commands } from "../../../api/collections.js";
import { addHours } from "../../../tools/time.js";
export default {
  meteor: {
    $subscribe: {
      deviceCommands: []
    },
    deviceCommands() {
      if (this.deviceMessenger && this.deviceMessenger.deviceID) {
        return Commands.find({ deviceID: this.deviceMessenger.deviceID });
      }
    }
  },
  computed: {
    persona() {
      return this.$store.getters.persona;
    },
    flagDMD() {
      return this.$store.getters.flagDMD;
    },
    deviceMessenger() {
      return this.$store.getters.deviceMessenger;
    },
    heightDeviceMessenger() {
      return this.$store.getters.heightDeviceMessenger;
    }
  },
  data: () => ({
    deviceMsg: null,
    participants: [
      {
        id: "user1",
        name: "Matteo",
        imageUrl: "https://avatars3.githubusercontent.com/u/1915989?s=230&v=4"
      },
      {
        id: "user2",
        name: "Support",
        imageUrl: "https://avatars3.githubusercontent.com/u/37018832?s=200&v=4"
      }
    ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
    titleImageUrl:
      "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
    messageList: [
      { type: "text", author: `me`, data: { text: `Say yes!` } },
      { type: "text", author: `user1`, data: { text: `No.` } }
    ], // the list of the messages to show, can be paginated and adjusted dynamically
    newMessagesCount: 0,
    isChatOpen: false, // to determine whether the chat window should be open or closed
    showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
    colors: {
      header: {
        bg: "#4e8cff",
        text: "#ffffff"
      },
      launcher: {
        bg: "#4e8cff"
      },
      messageList: {
        bg: "#ffffff"
      },
      sentMessage: {
        bg: "#4e8cff",
        text: "#ffffff"
      },
      receivedMessage: {
        bg: "#eaeaea",
        text: "#222222"
      },
      userInput: {
        bg: "#f4f7f9",
        text: "#565867"
      }
    }, // specifies the color scheme for the component
    alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
    messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattmezza/msgdown)
  }),
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.onMessageWasSent({
          author: "support",
          type: "text",
          data: { text }
        });
      }
    },
    onMessageWasSent(message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message];
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
    },
    restFiveHours(time) {
      return addHours(time, -5);
    },
    toggleFlagDMD(device) {
      this.$store.commit("toggleFlagDMD");
      this.$store.commit("setDeviceMessenger", {});
    },
    toUppercase() {
      if (this.deviceMsg) this.deviceMsg = this.deviceMsg.trim().toUpperCase();
    },
    sendMsg() {
      const device = this.deviceMessenger;
      const message = this.deviceMsg;
      const persona = this.persona;
      switch (device.protocol) {
        case "Syrus":
          stSyrus.emit("SEND_COMMAND_SYRUS", device.deviceID, message, persona);
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style>
</style>
