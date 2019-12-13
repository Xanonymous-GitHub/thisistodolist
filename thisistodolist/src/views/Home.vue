<template>
  <v-app id="inspire">
    <v-navigation-drawer app class="py-2" clipped v-model="drawer">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="user.pic" alt="" />
          </v-list-item-avatar>
          <v-list-item-content class="font-weight-bold">
            <v-list-item-title
              ><v-icon
                v-if="user.special"
                small
                :color="user.badgeClass"
                left
                >{{ user.special }}</v-icon
              >{{ user.user }}</v-list-item-title
            >
            <v-list-item-subtitle
              >{{ "@" + user.username
              }}<v-icon v-if="user.verified" color="blue" right x-small
                >mdi-check-decagram</v-icon
              ></v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <div @click="logout" class="pa-2 text-center">
          <v-btn outlined block color="amber darken-3">
            <v-icon left>mdi-logout</v-icon>
            登出
          </v-btn>
        </div>
      </template>

      <v-divider />
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-clipboard-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"
              >所有項目</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/unfinished">
          <v-list-item-action>
            <v-icon>mdi-clipboard-alert</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>待辦事項</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/finished">
          <v-list-item-action>
            <v-icon>mdi-clipboard-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>已完成</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/trashcan">
          <v-list-item-action>
            <v-icon>mdi-trash-can</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>垃圾桶</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/settings">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>設定</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="purple darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <b>ThisIsToDoList</b>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view ref="child" />
    </v-content>
    <v-card id="create" dark>
      <v-speed-dial
        :bottom="bottom"
        :direction="direction"
        :left="left"
        :open-on-hover="hover"
        :right="right"
        :top="top"
        class="my-7"
        v-model="fab"
      >
        <template v-slot:activator>
          <v-btn color="blue darken-2" fab v-model="fab">
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-cat</v-icon>
          </v-btn>
        </template>
        <v-btn
          v-show="currentStatus !== 'tra' && currentStatus !== 'set'"
          @click.stop="callInputArea('addNew')"
          color="indigo"
          fab
          small
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn
          :disabled="config.selected.length !== 1"
          v-show="currentStatus !== 'tra' && currentStatus !== 'set'"
          @click.stop="callInputArea('edit')"
          color="green"
          fab
          small
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn
          v-show="currentStatus !== 'set'"
          color="red"
          @click="deleteItem"
          :disabled="!config.selected.length"
          fab
          small
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn
          v-show="currentStatus === 'tra'"
          color="amber"
          @click="restoreDeletedItem"
          :disabled="!config.selected.length"
          fab
          small
        >
          <v-icon>mdi-delete-restore</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-card>
    <v-dialog v-model="config.inputAreaDialogStatus" width="600">
      <inputArea :key="inputAreaKey" />
    </v-dialog>
    <v-footer app color="purple darken-3">
      <span class="white--text">Copyright &copy; NPC GO Dev Team</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {mapGetters} from "vuex";
  import inputArea from "@/components/InputArea.vue";

  export default {
  components: {
    inputArea
  },
  name: "home",
  data: () => ({
    drawer: null,
    direction: "top",
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    inputAreaKey: -1
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
    callInputArea(data) {
      if (data === "addNew") {
        this.$store.dispatch("changeConfig", {
          name: "inputAreaMissionConfig",
          value: { title: "新增項目", content: "", type: false, classes: "add" }
        });
      }
      if (data === "edit") {
        this.$store.dispatch("selectionHandler", {
          listType: "unfin",
          actions: {
            name: "setConfigForInputarea",
            act: { name: "unfin" }
          }
        });
        this.$store.dispatch("selectionHandler", {
          listType: "fin",
          actions: {
            name: "setConfigForInputarea",
            act: { name: "fin" }
          }
        });
      }
      this.inputAreaKey++;
      this.$store.dispatch("changeConfig", {
        name: "inputAreaDialogStatus",
        value: true
      });
    },
    restoreDeletedItem() {
      //data:{listType:[Object],actions:[name:String,act:{Json}]}
      this.$store.dispatch("selectionHandler", {
        listType: "tra",
        actions: {
          name: "reDelItem",
          act: {}
        }
      });
    },
    deleteItem() {
      //data:{listType:[int],actions:[name:String,act:{Json}]}
      this.$store.dispatch("selectionHandler", {
        listType: "unfin",
        actions: {
          name: "delItem",
          act: { name: "unfin" }
        }
      });
      this.$store.dispatch("selectionHandler", {
        listType: "fin",
        actions: {
          name: "delItem",
          act: { name: "fin" }
        }
      });
      this.$store.dispatch("selectionHandler", {
        listType: "tra",
        actions: {
          name: "delItem",
          act: { name: "tra" }
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      currentStatus: "getCurrentStatus",
      user: "getUser",
      unfinLength: "getUnfinLength",
      finLength: "getFinLength",
      traLength: "getTraLength",
      config: "getComponentConfig"
    })
  },
  beforeCreate() {

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
