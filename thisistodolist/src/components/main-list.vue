<template>
  <v-card class="mx-2 my-2" max-width="98%">
    <v-list v-show="haveitems" shaped>
      <v-list-item-group v-model="model" multiple>
        <template v-for="(item, i) in items">
          <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

          <v-list-item
            v-else
            :key="`${item.item_id}`"
            :value="item.item_id"
            active-class="deep-purple--text text--accent-4"
          >
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item.user_input"></v-list-item-title>
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
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    haveitems: true,
    items: [{user_input:'test'}],
    model: []
  }),
  created: function() {
    this.sync_data();
  },
  methods: {
    sync_data: function() {
      var self = this;
      axios
        .get("/lists")
        .then(function(response) {
          let data = response.data;
          self.haveitems = true;
          //self.items = [];
          for (let i = 0; i < data.length; i++) {
            self.items.unshift({
              item_id: data[i].item_id,
              user_input: data[i].user_input
            });
            if (data[i].status == true) {
              self.model.push(data[i].item_id);
            }
          }
        })
        .catch(function() {
          //alert("伺服器通訊失敗");
        });
    }
  }
};
</script>

<style></style>
