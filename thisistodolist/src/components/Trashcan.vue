<template>
  <v-list shaped v-show="items.length" class="transparent mx-2">
    <v-list-item-group multiple v-model="inActiveItem">
      <template v-for="item in items">
        <v-card :key="`${item.id}`">
          <v-list-item
            :ref="item.id"
            :value="item.id"
            active-class="grey"
            class="my-3"
            @click="onItemClick"
          >
            <template v-slot:default="{ active }">
              <v-icon color="grey" left>{{ getIcon(item.completed) }}</v-icon>
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
  name: "trashcan",
  data: () => ({
    inActiveItem: []
  }),
  computed: {
    ...mapGetters({
      items: "getItemTrashcan"
    })
  },
  methods: {
    getIcon(type) {
      return type ? "mdi-check-circle-outline" : "mdi-alert-circle-outline";
    },
    onItemClick() {
      this.$nextTick(() => {
        this.$store.dispatch("changeConfig", {
          name: "selected",
          value: this.inActiveItem
        });
      });
    }
  },
  beforeCreate() {
    this.$store.dispatch("changeConfig", {
      name: "selected",
      value: []
    });
    this.$store.dispatch("setCurrentStatus", "tra");
  }
};
</script>

<style scoped />
