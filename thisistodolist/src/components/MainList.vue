<template>
  <v-card class="mx-2 my-2" max-width="98%">
    <v-list shaped v-show="items.length">
      <v-list-item-group multiple v-model="selected">
        <template v-for="item in items">
          <v-list-item
                  :key="`${item.uid}`"
                  :value="item.uid"
                  active-class="green"
                  class="my-3"
          >
            <template v-slot:default="{ active}">
              <v-list-item-content>
                <v-list-item-title v-text="item.content"/>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox
                        :input-value="active"
                        :true-value="item"
                        color="deep-purple accent-4"
                />
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    computed: {
      ...mapGetters({
        items: "getItemExsist"
      })
    }
  };
</script>

<style/>
