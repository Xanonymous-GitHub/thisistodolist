<template>
  <v-list shaped v-show="items.length" class="transparent mx-2">
    <v-list-item-group multiple v-model="selected">
      <template v-for="(item, i) in items">
        <v-card :key="`${item.uid}`" @click="actionChange(i)">
          <v-list-item
            :value="i"
            active-class="amber"
            class="my-3"
            :isActive="item.selected"
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
  import {mapGetters} from "vuex";

  export default {
  computed: {
    ...mapGetters({
      items: "getItemExsist",
      unfin: "getItemUnfinished"
    })
  },
  methods: {
    getIcon(type) {
      return type ? "mdi-check-circle-outline" : "mdi-alert-circle-outline";
    },
    getIconColor(type) {
      return type ? "green" : "red";
    },
    actionChange(data) {
      let whereToChange = data > this.unfin.length-1 ? "fin" : "unfin";
      console.log(whereToChange);
      console.log(data - this.unfin.length);
      this.$store.dispatch("itemSelectedChange", {
        where: whereToChange,
        index: whereToChange === "unfin" ? data : data - this.unfin.length
      });
    }
  },
  beforeCreate() {
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
