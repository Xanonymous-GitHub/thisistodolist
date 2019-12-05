<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4" sm="8">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>創建 ThisIsToDoList 帳號</v-toolbar-title>
                <v-spacer/>
              </v-toolbar>
              <v-card-text>
                <v-form :lazy-validation="lazy" ref="form" v-model="valid">
                  <v-text-field
                          :rules="emailRules"
                          label="新帳號"
                          name="signup"
                          prepend-icon="mdi-login"
                          required
                          type="text"
                          v-model="id"
                  />

                  <v-text-field
                          :rules="pswdRules"
                          id="password"
                          label="建立密碼"
                          name="password"
                          prepend-icon="mdi-lock"
                          required
                          type="password"
                          v-model="pswd"
                  />
                  <v-text-field
                          id="password_again"
                          label="確認密碼"
                          name="password2"
                          prepend-icon="mdi-"
                          required
                          type="password"
                          v-model="pswd_s"
                  />
                  <v-btn
                          :disabled="
                      !valid ||
                        !id.trim() ||
                        !pswd ||
                        !pswd_s ||
                        !this.validateRecaptcha
                    "
                          @click="validate"
                          color="red"
                  >註冊
                  </v-btn>
                  <v-btn @click="signin" class="mx-2" color="amber">登入</v-btn>
                </v-form>
                <Recaptcha
                        @validate="recapchavalidate"
                        class="my-2"
                        size="100%"
                        theme="dark"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
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
    components: {Recaptcha},
    data: () => ({
      recapchatoken: "",
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
        v => (v && v === self.pswd) || "密碼不相符!"
      ]
    }),
    methods: {
      signin() {
        window.location.replace("./signin");
      },
      recapchavalidate(response) {
        this.recapchatoken = response;
        this.validateRecaptcha = true;
      },
      validate: async function () {
        if (this.$refs.form.validate() && this.pswd === this.pswd_s) {
          this.snackbar = true;
          let sha256 = require("js-sha256").sha256;
          this.pswd = sha256(this.pswd);
          try {
            await axios.post(
                    "/signup",
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
            window.location.replace("./signin");
          } catch (e) {
            console.log(e);
            alert("伺服器通訊失敗或未通過機器人驗證！");
          }
        } else {
          alert("密碼或帳號驗證未通過！");
        }
        this.$refs.form.reset();
        window.location.replace("./signup");
      }
    },
    created() {
      this.s_self = this;
      this.valid = false;
      this.$vuetify.theme.dark = true;
    }
  };
</script>

<style/>
