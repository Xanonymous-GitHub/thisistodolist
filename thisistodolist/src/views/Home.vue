<template>
  <v-app id="inspire">
    <v-navigation-drawer app class="py-2" clipped v-model="drawer">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="user.pic"  alt=""/>
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
      <template v-slot:append>
        <v-card v-if="false">
          <v-lazy
            v-model="isActive"
            :options="{
              threshold: 0.5
            }"
            transition="fade-transition"
          >
            <v-card class="mx-auto">
              <v-card-title>Card title</v-card-title>
              <v-card-text>
                Phasellus magna.
              </v-card-text>
            </v-card>
          </v-lazy>
        </v-card>
      </template>
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
        :transition="transition"
        class="my-7"
        v-model="fab"
      >
        <template v-slot:activator>
          <v-btn color="blue darken-2" fab v-model="fab">
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-cat</v-icon>
          </v-btn>
        </template>
        <v-btn v-show="currentStatus !== 'set'" color="green" fab small>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          v-show="currentStatus !== 'tra' && currentStatus !== 'set'"
          @click.stop="dialog = !dialog"
          color="indigo"
          fab
          small
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn
          v-show="currentStatus !== 'set'"
          color="red"
          @click="deleteItem"
          fab
          small
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-card>
    <v-dialog v-model="dialog" width="500">
      <v-form v-model="valid">
        <v-card>
          <v-card-title
            class="headline purple darken-3 white--text"
            primary-title
            >新增項目
          </v-card-title>
          <v-textarea auto-grow class="mx-5" required v-model="inputarea" />
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-switch
              v-model="newItemType"
              class="mx-4 text-sm-center"
              inset
              label="達成"
            />
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
      <span class="white--text">Copyright &copy; NPC GO Dev Team</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
  name: "home",
  data: () => ({
    newItemType: false,
    valid: true,
    dialog: false,
    inputarea: "",
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
      let data = this.inputarea;
      this.inputarea = "";
      this.$store.dispatch("testAddNewItem", {
        text: data,
        type: this.newItemType
      });
      this.dialog = false;
    },
    deleteItem() {
      this.$store.dispatch("delItem",{data:this.$refs.child.$refs,type:this.currentStatus});
    }
  },
  computed: {
    ...mapGetters({
      currentStatus: "getCurrentStatus",
      user: "getUser",
      unfinLength: "getUnfinLength",
      finLength: "getFinLength",
      traLength: "getTraLength"
    })
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
