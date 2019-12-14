<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4" sm="8">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>登入 ThisIsToDoList</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form :lazy-validation="lazy" ref="form" v-model="valid">
                  <v-text-field
                    :rules="emailRules"
                    label="帳號"
                    name="login"
                    prepend-icon="mdi-login"
                    required
                    type="text"
                    v-model="id"
                  />
                  <v-text-field
                    :rules="pswdRules"
                    id="password"
                    label="密碼"
                    name="password"
                    prepend-icon="mdi-lock"
                    required
                    type="password"
                    v-model="pswd"
                  />
                  <v-btn
                    :disabled="
                      !valid || !id.trim() || !pswd || !this.validateRecaptcha
                    "
                    @click="validate"
                    class="mx-2"
                    color="light-green accent-3"
                    >登入
                  </v-btn>
                  <v-btn @click="signup" class="mx-2" color="amber">註冊</v-btn>
                </v-form>
                <Recaptcha @validate="recapchavalidate" class="my-2" />
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
  name: "signin",
  components: { Recaptcha },
  data: function() {
    return {
      recapchatoken: "",
      validateRecaptcha: false,
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
  created() {
    this.valid = false;
    this.$vuetify.theme.dark = true;
  },
  methods: {
    recapchavalidate(response) {
      this.recapchatoken = response;
      this.validateRecaptcha = true;
    },
    signup() {
      window.location.replace("./signup");
    },
    async validate() {
      if (this.$refs.form.validate()) {
        let sha256 = require("js-sha256").sha256;
        this.pswd = sha256(this.pswd);
        try {
          await axios.post(
            "/signin",
            JSON.stringify({
              username: this.id.trim(),
              password: this.pswd,
              recapchatoken: this.recapchatoken
            }),
            {
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            }
          );
        } catch (e) {
          console.log(e);
          alert("帳號或密碼錯誤，或未通過機器人驗證！登入失敗！");
        }
      } else {
        alert("密碼或帳號驗證未通過！");
      }
      this.$refs.form.reset();
      window.location.replace("./");
    }
  }
};
</script>

<style />
