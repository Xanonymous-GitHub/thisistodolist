<template>
  <v-card class="mx-2 my-2" max-width="98%">
    <v-list v-show="haveitems" shaped>
      <v-list-item-group v-model="selected" multiple>
        <template v-for="item in items">
          <!-- <v-divider v-if="!item" :key="`divider-${i}`"></v-divider> -->
          <v-list-item
                  :key="`${item.uid}`"
                  :value="item.uid"
                  active-class="green"
                  class="my-3"
          >
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item.content"></v-list-item-title>
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
  import {mapActions, mapState} from "vuex";

  export default {
    data: () => ({
      selected: []
    }),
    computed: {
      ...mapState({
        items: state => state.todo.unfinished,
        haveitems: state => Boolean(state.todo.unfinished.length)
      })
    },
    methods: {
      ...mapActions({
        SyncTest: "SyncTest"
      }),
      AddNewItemUnfinished() {
        return this.$store.dispatch("");
      }
    },
    mounted() {
      this.SyncTest();
    }
  };
</script>

<style></style>
