<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>創建 ThisIsToDoList 帳號</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" :lazy-validation="lazy">
                  <v-text-field
                    :rules="emailRules"
                    v-model="id"
                    label="新帳號"
                    name="signup"
                    prepend-icon="mdi-login"
                    type="text"
                    required
                  />

                  <v-text-field
                    id="password"
                    label="建立密碼"
                    name="password"
                    prepend-icon="mdi-lock"
                    v-model="pswd"
                    type="password"
                    :rules="pswdRules"
                    required
                  />
                  <v-text-field
                    id="password_again"
                    label="確認密碼"
                    name="password2"
                    v-model="pswd_s"
                    prepend-icon="mdi-"
                    type="password"
                    required
                  />
                  <v-btn
                    @click="validate"
                    :disabled="!valid || !id || !pswd ||!pswd_s||!this.validateRecaptcha"
                    color="red"
                  >註冊</v-btn>
                  <v-btn class="mx-2" @click="signin" color="amber">登入</v-btn>
                </v-form>
                <Recaptcha class="my-2" @validate="recapchavalidate"/>
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
import Recaptcha from "@/components/Recaptcha";
export default {
  components: { Recaptcha },
  data: () => ({
    validateRecaptcha: false,
    s_self: null,
    lazy: true,
    valid: true,
    id: "",
    pswd: "",
    pswd_s: "",
    emailRules: [
      v => !!v || "請填入一組有效電子郵件!",
      v => /.+@.+\..+/.test(v) || "電子郵件格式不正確！"
    ],
    pswdRules: [
      v => !!v || "請輸入一組8個字以上的密碼!",
      v => (v && v.length > 7) || "密碼至少8個字元"
    ],
    pswd_sRules: [
      v => !!v || "密碼不相符!",
      v => (v && v == self.pswd) || "密碼不相符!"
    ]
  }),
  methods: {
    signin: function() {
      window.location.replace("./signin");
    },
    recapchavalidate() {
      this.validateRecaptcha = true;
    },
    validate: function() {
      if (this.$refs.form.validate() && this.pswd === this.pswd_s) {
        this.snackbar = true;
        let sha256 = require("js-sha256").sha256;
        this.pswd = sha256(this.pswd);
        axios
          .post(
            "/signup",
            JSON.stringify({ username: this.id.trim(), password: this.pswd }),
            {
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            }
          )
          .then(function() {
            window.location.replace("./signin");
          })
          .catch(function() {
            alert("伺服器通訊失敗！");
          });
      } else {
        alert("密碼或帳號驗證未通過！");
      }
      this.$refs.form.reset();
    }
  },
  created: function() {
    this.s_self = this;
    this.valid = false;
  }
};
</script>

<style>
</style>