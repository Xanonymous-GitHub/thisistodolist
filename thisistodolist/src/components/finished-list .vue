<template>
  <v-card class="mx-2 my-2" max-width="98%">
    <v-list shaped>
      <v-list-item-group v-model="model" multiple>
        <template v-for="(item, i) in items">
          <v-divider :key="`divider-${i}`" v-if="!item"/>

          <v-list-item
            v-else
            :key="`${item.uuid}`"
            :value="item.uuid"
            active-class="deep-purple--text text--accent-4"
          >
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item.text"/>
              </v-list-item-content>

              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  :true-value="item"
                  color="deep-purple accent-4"
                  @click="toggle"
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
  import axios from "axios";

  export default {
    created: function () {
      axios
              .get("/lists")
              .then(function (data) {
                data.forEach(i => {
                  if (i.status === "true") {
                    this.items.unshift(`{uuid:"${i.item_id}",text:"${i.user_input}"`);
                    this.model.push(`"${i.uuid}"`);
                  }
                });
              })
              .catch(function () {
                // console.log(e);
                this.items = [];
              });
    },
    data: () => ({
      items: [{uuid: "123123", text: "test"}],
      model: ["123123"]
    })
  };
</script>

<style/>
