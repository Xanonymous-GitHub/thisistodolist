<template>
  <v-list shaped v-show="items.length" class="transparent mx-2">
    <v-list-item-group multiple v-model="inActiveItems">
      <template v-for="item in items">
        <v-card :key="`${item.id}`">
          <v-list-item
            :ref="item.id"
            :value="item.id"
            active-class="amber"
            class="my-3"
            @click="onItemClick"
          >
            <template v-slot:default="{ active }">
              <v-icon :color="getIconColor(item.completed)" left>{{
                getIcon(item.completed)
              }}</v-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.content" />
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  :true-value="item"
                  color="white"
                />
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-card>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "mainlist",
  data: () => ({
    inActiveItems: []
  }),
  computed: {
    ...mapGetters({
      items: "getItemExsist",
      config: "getComponentConfig"
    })
  },
  methods: {
    getIcon(type) {
      return type ? "mdi-check-circle-outline" : "mdi-alert-circle-outline";
    },
    getIconColor(type) {
      return type ? "green" : "red";
    },
    onItemClick() {
      this.$nextTick(() => {
        this.$store.dispatch("changeConfig", {
          name: "selected",
          value: this.inActiveItems
        });
      });
    }
  },
  beforeCreate() {
    this.$store.dispatch("changeConfig", {
      name: "selected",
      value: []
    });
    this.$store.dispatch("setCurrentStatus", "full");
  }
};
</script>

<style>
.transparent {
  background-color: transparent !important;
  border-color: transparent !important;
}
</style>
