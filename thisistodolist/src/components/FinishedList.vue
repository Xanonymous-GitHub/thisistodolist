<template>
  <v-list shaped v-show="items.length" class="transparent mx-2">
    <v-list-item-group multiple v-model="selected">
      <template v-for="item in items">
        <v-card :key="`${item.uid}`">
        <v-list-item
          :key="`${item.uid}`"
          :value="item.uid"
          active-class="green"
          class="my-3"
        >
          <template v-slot:default="{ active }">
            <v-icon color="green" left>mdi-check-circle-outline</v-icon>
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
  computed: {
    ...mapGetters({
      items: "getItemFinished"
    })
  },
  beforeCreate() {
    this.$store.dispatch("setCurrentStatus", "fin");
  }
};
</script>

<style>
.transparent {
  background-color: transparent !important;
  border-color: transparent !important;
}
</style>
