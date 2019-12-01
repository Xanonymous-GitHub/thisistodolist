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
        <v-btn fab dark small color="indigo" @click="overlay=!overlay;drawer=false">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-card>
    <v-overlay absolute="false" opacity="0.5" :value="overlay" :z-index="zIndex">
      <v-form>
        <v-text-field filled outlined label="新增項目" auto-grow value></v-text-field>
        <v-btn calss="text-center mr-5" color="primary" @click="overlay = false">新增</v-btn>
        <v-btn calss="text-center mr-5" color="error" @click="overlay = false">取消</v-btn>
      </v-form>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Item"
          required
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

        <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

        <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
      </v-form>
      <!-- <v-card raised>
        
      </v-card>-->
    </v-overlay>
    <v-footer color="purple darken-3" app>
      <span class="white--text">Copyright &copy; NPC GO version {{ version }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "home",
  components: {},
  data: () => ({
    overlay: false,
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
    toppage() {
      window.location.replace("./todolist");
    },
    logout() {
      this.$cookie.delete("sessionID");
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
