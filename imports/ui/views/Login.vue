<template>
  <v-app>
    <v-content class="svgBackground">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card hover light class="pa-4" dark>
              <v-card-text>
                <section>
                  <img src="/img/seclog.png" height="45px">
                </section>
                <h1 class="font-weight-bold text-xs-center mb-4">Figo3</h1>
                <v-text-field
                  append-icon="person"
                  name="login"
                  label="Usuario"
                  placeholder="Introduce tu usuario"
                  type="text"
                  v-model="username"
                ></v-text-field>
                <v-text-field
                  append-icon="lock"
                  name="password"
                  label="Password"
                  placeholder="Introduce tu password"
                  type="password"
                  v-model="password"
                  @keyup.enter="onLogin"
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="text-xs-center">
                <v-btn block @click="onLogin" color="red accent-4">entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onLogin() {
      const { username, password } = this;
      if (username.length > 0 && password.length > 0) {
        Meteor.loginWithPassword(username, password, error => {
          if (!error) {
            this.$router.push({ name: "Home" });
          }
        });
      }
    }
  }
};
</script>

<style scope>
.svgBackground{
 background-color: #ff7700;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23cc0000' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23aa0000' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23d6002b' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23b10022' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d9004b' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23b2003d' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23d3006c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23ac0057' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23c4008c' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%239e0071' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23aa00aa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23880088' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
}
</style>