<template>
  <v-app id="inspire">
    <v-navigation-drawer class="py-10" v-model="drawer" app>
      <v-list dense>
        <v-list-item @click="toppage">
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
            <v-icon>mdi-trash-can</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>垃圾桶</v-list-item-title>
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
            <v-btn color="amber" block>
              <v-icon dark left>mdi-arrow-left</v-icon>登出
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
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
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
        class="my-7"
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
        <v-btn fab dark small color="indigo" @click.stop="dialog=!dialog">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-card>
    <v-dialog v-model="dialog" scrollable="true" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>新增待辦項目</v-card-title>
        <v-textarea auto-grow class="mx-5" v-model="inputarea"></v-textarea>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.stop="submitinputarea">確定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-footer color="purple darken-3" app>
      <span class="white--text">Copyright &copy; NPC GO version {{ version }}</span>
    </v-footer>
    <main-list></main-list>
  </v-app>
</template>

<script>
import axios from "axios";
import MainList from "@/components/main-list";
export default {
  name: "home",
  components: {
    MainList
  },
  data: () => ({
    dialog: false,
    inputarea: "",
    s_self: this,
    version: "alpha",
    items: [
      { title: "Dashboard", icon: "dashboard" },
      { title: "Account", icon: "account_box" },
      { title: "Admin", icon: "gavel" }
    ],
    drawer: false,
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
    async submitinputarea() {
      try {
        let data = (
          await axios.post(
            "/todolist",
            JSON.stringify({ user_input: this.inputarea.trim() })
          )
        ).data;
          this.items.unshift({
          item_id: data.item_id,
          user_input: data.user_input
        });
        this.inputarea = "";
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    toppage() {
      window.location.replace("./todolist");
    },
    logout() {
      this.$cookies.set("sessionID", "null");
      window.location.replace("./signin");
    }
  }
};
</script>
<style scoped>
#create .v-speed-dial {
  position: fixed;
  z-index: 5;
}

#create .v-btn--floating {
  position: fixed;
}
</style>
