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
        
        <div @click="logout" class="pa-5 text-center">
          <router-link to="/signin" tag="button" replace>
          <v-btn  color="amber" block>
            
            <v-icon dark left>mdi-arrow-left</v-icon> 登出
            
          </v-btn>
          </router-link> 
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
      <transition>
      <router-view></router-view>
      </transition>
      <!-- <v-container class="fill-height" fluid>
        
      </v-container>-->
    </v-content>
    <!-- <v-card-text style="height: 100px; position: fixed;right:1%;bottom:0%">
      <v-fab-transition>
        <v-btn v-show="!hidden" color="pink" dark absolute top right fab>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>-->
    <v-card id="create">
      <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="green">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-card>
    <v-footer color="purple darken-3" app>
      <span class="white--text">Copyright &copy; NPC GO version {{version}}</span>
    </v-footer>
  </v-app>
</template>

<script>
//import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@beta/dist/js.cookie.min.js"
export default {
  name: "home",
  components: {},
  data: () => ({
    version: "alpha",
    items: [
      { title: "Dashboard", icon: "dashboard" },
      { title: "Account", icon: "account_box" },
      { title: "Admin", icon: "gavel" }
    ],
    drawer: null,
    direction: "top",
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false
  }),
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  },
  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    }
  },
  methods: {
    logout: () => {
      // Cookies.set("sessionID", "", { domain: '35.189.167.203' });
      // Cookies.remove('sessionID');
      window.$cookies.set('sessionID','-1');
      document.cookie='';
      window.location.replace("./signin");
    }
  }
};
</script>
<style scoped>
#create .v-speed-dial {
  position: fixed;
  z-index:5;
}

#create .v-btn--floating {
  position: fixed;
}
</style>
