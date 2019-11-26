<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>登入 ThisIsToDoList</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    v-model="id"
                    label="帳號"
                    name="login"
                    prepend-icon="mdi-login"
                    type="text"
                    required
                  />
                  <v-text-field
                    id="password"
                    label="密碼"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="pswd"
                    required
                  />
                  <v-btn @click="validate" :disabled="!valid" color="amber">登入</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      valid: true,
      id: "",
      pswd: "",
      self
    };
  },
  // created: function() {
  //   this.self = this;
  // },
  methods: {
    validate: function() {
      if (this.$refs.form.validate()) {
        let sha256 = require("js-sha256").sha256;
        this.pswd = sha256(this.pswd);
        axios
          .post("/signin", `{"username":${this.id},"password":${this.pswd}}`)
          .then(function() {
            window.location.replace("./");
          })
          .catch(function() {
            //
          });
      }
    }
  }
};
</script>

<style>
</style>