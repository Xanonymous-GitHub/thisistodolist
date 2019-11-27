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
                <v-form v-model="valid" ref="form" :lazy-validation="lazy">
                  <v-text-field
                    v-model="id"
                    label="帳號"
                    :rules="emailRules"
                    name="login"
                    prepend-icon="mdi-login"
                    type="text"
                    required
                  />
                  <v-text-field
                    id="password"
                    label="密碼"
                    :rules="pswdRules"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="pswd"
                    required
                  />
                  <v-btn
                    class="mx-2"
                    @click="validate"
                    :disabled="!valid || !id || !pswd"
                    color="light-green accent-3"
                    >登入</v-btn
                  >
                  <v-btn class="mx-2" @click="signup" color="amber">註冊</v-btn>
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
      lazy: true,
      id: "",
      pswd: "",
      self,
      emailRules: [
        v => !!v || "請填入有效電子郵件!",
        v => /.+@.+\..+/.test(v) || "電子郵件格式不正確！"
      ],
      pswdRules: [v => !!v || "請輸入密碼!"]
    };
  },
  created: function() {
    this.s_self = this;
    this.valid = false;
  },
  methods: {
    signup: function() {
      window.location.replace("./signup");
    },
    validate: function() {
      if (this.$refs.form.validate()) {
        let sha256 = require("js-sha256").sha256;
        this.pswd = sha256(this.pswd);
        axios
          .post(
            "/signin",
            JSON.stringify({ username: this.id.trim(), password: this.pswd }),
            {
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            }
          )
          .then(function() {
            window.location.replace("./");
          })
          .catch(function() {
            alert("帳號或密碼錯誤！登入失敗！");
          });
      } else {
        alert("密碼或帳號驗證未通過！");
      }
      this.$refs.form.reset();
    }
  }
};
</script>

<style></style>
