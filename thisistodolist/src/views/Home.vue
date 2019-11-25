<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-apple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>待辦事項</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>已完成</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>設定</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="amber" block>
            <v-icon dark left>mdi-arrow-left</v-icon>登出
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="purple darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <b>ThisIsToDoList</b>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
      <!-- <v-container class="fill-height" fluid>
        
      </v-container>-->
    </v-content>
    <!-- <v-card-text style="height: 100px; position: fixed;right:1%;bottom:0%">
      <v-fab-transition>
        <v-btn v-show="!hidden" color="pink" dark absolute top right fab>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text> -->
    <v-footer color="purple darken-3" app>
      <span class="white--text">Copyright &copy; NPC GO version {{version}}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "home",
  components: {},
  data: () => ({
    version: "0.1.alpha",
    items: [
      { title: "Dashboard", icon: "dashboard" },
      { title: "Account", icon: "account_box" },
      { title: "Admin", icon: "gavel" }
    ],
    drawer: null
  })
};
</script>
<style scoped></style>
