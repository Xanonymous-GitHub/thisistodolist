<template>
  <v-app>
    <!-- main list -->
    <v-card class="mx-auto my-2" max-width="100%" width="98%">
      <v-list shaped>
        <v-list-item-group v-model="model" multiple>
          <template v-for="(item, i) in todo_list" id="main_list">
            <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>
            <v-list-item
              v-else
              :key="`item-${i}`"
              :value="item"
              active-class="deep-purple--text text--accent-4"
            >
              <template v-slot:default="{ active, toggle }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                    :true-value="item"
                    color="deep-purple accent-4"
                    @click="toggle"
                  ></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </template>
            
        </v-list-item-group>
      </v-list>
    </v-card>
    <!-- top bar -->
    <v-content>
      <v-app-bar app clipped-left color="purple darken-2">
        <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer" />
        <span class="title ml-3 mr-5 white--text">This&nbsp;is&nbsp;ToDoList</span>
        <v-text-field class="white--text" solo-inverted flat hide-details label="搜尋" />

        <v-spacer />
      </v-app-bar>
      <!-- nav drawer -->
      <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
        <v-list dense class="grey lighten-4">
          <template v-for="(item, i) in items">
            <v-row v-if="item.heading" :key="i" align="center">
              <v-col cols="6">
                <v-subheader v-if="item.heading">
                  {{
                  item.heading
                  }}
                </v-subheader>
              </v-col>
              <v-col cols="6" class="text-right">
                <!--<v-btn small text>edit</v-btn>-->
              </v-col>
            </v-row>
            <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />
            <v-list-item v-else :key="i" link>
              <!--
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              -->
              <v-list-item-content>
                <v-list-item-title class="black--text">
                  {{
                  item.text
                  }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn class="amber" block>登出</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-content>
    <!-- blue button -->
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
          <v-btn v-model="fab" color="blue darken-3" dark fab>
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
  </v-app>
</template>
<script>
//import axios from 'axios'
// import Vue from 'vue'

export default {
  name: "todolist",
  props: {
    source: String
  },
  methods: {
    create: () => {
      this.test = "5644565";
      // alert("123132312132132");
      fetch("http://time.jsontest.com/")
        .then(res => res.json())
        .then(data => {
          alert("02.");
          this.todo_list = data;
        });
    }
  },

  data: () => ({
    test: "",
    list: [],
    drawer: null,
    todo_list: [
      { u_uuid: "", text: "立委好帥" },
      { u_uuid: "", text: "立委好帥" },
      { u_uuid: "", text: "立委好帥" },
      { u_uuid: "", text: "立委好帥" },
      { u_uuid: "", text: "立委好帥" },
      { u_uuid: "", text: "立委好帥" },
      { u_uuid: "", text: "立委好帥" },
      { u_uuid: "", text: "立委好帥" },
      { u_uuid: "", text: "立委好帥" },
      { u_uuid: "", text: "立委好帥" }
    ],
    items: [
      { icon: "lightbulb_outline", text: "記事" },
      { icon: "touch_app", text: "提醒" },
      { divider: true },
      //   { heading: "Labels" },
      { icon: "add", text: "新增標籤" },
      { divider: true },
      { icon: "archive", text: "封存" },
      { icon: "delete", text: "垃圾桶" },
      { divider: true },
      { icon: "settings", text: "設定" },
      { icon: "help", text: "幫助" }
    ],
    direction: "top",
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: "slide-y-transition"
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
  }
};
</script>

<style>
#create .v-speed-dial {
  position: fixed;
}
#create .v-btn--floating {
  position: relative;
}
</style>
