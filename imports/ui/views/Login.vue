<template>
  <v-app>
    <v-content class="svgBackground">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card hover light class="pa-4">
              <v-card-text>
                <section>
                  <img src="/img/seclog.png" height="45px">
                </section>
                <h1 class="font-weight-bold text-xs-center mb-4">Login</h1>
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
                <v-btn block @click="onLogin" color="info">entrar</v-btn>
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
   background-color: #0097fc;
   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23222' stroke-width='10.4' stroke-opacity='0.23'%3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E"); 
}
</style>