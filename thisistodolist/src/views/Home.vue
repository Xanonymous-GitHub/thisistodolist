<template>
  <v-app id="inspire">
    <v-navigation-drawer app class="py-10" clipped v-model="drawer">
      <v-list dense>
        <v-list-item to="/todolist">
          <v-list-item-action>
            <v-icon>mdi-apple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>所有項目</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/todolist/unfinished">
          <v-list-item-action>
            <v-icon>mdi-book</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>待辦事項</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/todolist/finished">
          <v-list-item-action>
            <v-icon>mdi-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>已完成</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/todolist/trashcan">
          <v-list-item-action>
            <v-icon>mdi-trash-can</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>垃圾桶</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/todolist/settings">
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
          <router-link replace tag="button" to="/signin">
            <v-btn block color="amber darken-3">
              <v-icon left>mdi-arrow-left</v-icon>
              登出
            </v-btn>
          </router-link>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="purple darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <b>ThisIsToDoList</b>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <v-card id="create">
      <v-speed-dial
        :bottom="bottom"
        :direction="direction"
        :left="left"
        :open-on-hover="hover"
        :right="right"
        :top="top"
        :transition="transition"
        class="my-7"
        v-model="fab"
      >
        <template v-slot:activator>
          <v-btn color="blue darken-2" fab v-model="fab">
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-star</v-icon>
          </v-btn>
        </template>
        <v-btn color="green" fab small>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn @click.stop="dialog = !dialog" color="indigo" fab small>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn color="red" fab small>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-card>
    <v-dialog v-model="dialog" width="500">
      <v-form v-model="valid">
        <v-card>
          <v-card-title class="headline purple darken-3" primary-title
            >新增待辦項目
          </v-card-title>
          <v-textarea auto-grow class="mx-5" required v-model="inputarea" />
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              :disabled="!valid || !inputarea.trim()"
              @click="AddItem"
              color="primary"
              >確定
            </v-btn>
            <v-btn @click="dialog = false" color="error">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-footer app color="purple darken-3">
      <span class="white--text"
        >Copyright &copy; NPC GO version {{ version }}</span
      >
    </v-footer>
  </v-app>
</template>

<script>
  import MainList from "@/components/MainList";

  export default {
  name: "home",
  data: () => ({
    valid: true,
    listdata: MainList.items,
    dialog: false,
    inputarea: "",
    s_self: this,
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
  created() {
    this.$vuetify.theme.dark = true;
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
    logout() {
      this.$cookies.set("sessionID", "null");
      window.location.replace("./signin");
    },
    AddItem() {
      this.dialog = false;
      let data = this.inputarea;
      this.inputarea = "";
      return this.$store.dispatch("testAddNewItemUnfinished", data);
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
