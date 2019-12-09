<template>
  <v-list shaped v-show="items.length" class="transparent mx-2">
    <v-list-item-group multiple>
      <template v-for="item in items">
        <v-card :key="`${item.uid}`">
          <v-list-item
                  :ref="item.uid"
                  :value="item.uid"
                  active-class="amber"
                  class="my-3"
          >
            <template v-slot:default="{ active }">
              <v-icon color="grey" left>{{
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
  import {mapGetters} from "vuex";

  export default {
  name: "trashcan",
  computed: {
    ...mapGetters({
      items: "getItemTrashcan"
    })
  },
  methods:{
    getIcon(type) {
      return type ? "mdi-check-circle-outline" : "mdi-alert-circle-outline";
    },
  },
  beforeCreate() {
    this.$store.dispatch("setCurrentStatus", "tra");
  }
};
</script>

<style scoped />
