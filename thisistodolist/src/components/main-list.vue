<template>
  <v-card class="mx-2 my-2" max-width="98%">
    <v-list v-show="haveitems" shaped>
      <v-list-item-group v-model="model" multiple>
        <template v-for="(item, i) in items">
          <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

          <v-list-item
            v-else
            :key="`${item.uuid}`"
            :value="item.uuid"
            active-class="deep-purple--text text--accent-4"
          >
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
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
    haveitems:true,
    items: [
      { uuid: "123123", text: "test" },

    ],
    model: ["123123"]
  }),
  created: function() {
    //this.items = [];
    let self = this;
    axios
      .get("/lists")
      .then(function(data) {
        self.haveitems=true;
        data.forEach(i => {
          self.items.unshift(`{uuid:"${i.item_id}",text:"${i.user_input}"`);
          if (i.status == "true") {
            self.model.push(`"${i.uuid}"`);
          }
        });
      })
      .catch(function() {
        // console.log(e);
        self.haveitems=false;
        self.items = [];
      });
  },
};
</script>

<style></style>
