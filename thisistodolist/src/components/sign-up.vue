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
                <v-form>
                  <v-text-field label="新帳號" name="signup" prepend-icon="mdi-login" type="text" />

                  <v-text-field
                    id="password"
                    label="建立密碼"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                  <v-text-field
                    id="password_again"
                    label="確認密碼"
                    name="password2"
                    prepend-icon="mdi-"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">註冊</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
</style>