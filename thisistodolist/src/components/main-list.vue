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
    haveitems: false,
    items: [{ item_id: "123123", user_input: "test", status: true }],
    model: ["123123"]
  }),
  created: function() {
    //this.items = [];
    var self = this;
    axios
      .get("/lists")
      .then(function(response) {
        let data = response.data;
        self.haveitems = true;
        //self.items = data;
        self.items = [];
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
        // console.log(e);
        //self.haveitems=false;
        //self.items = [];
      });
  }
};
</script>

<style></style>
