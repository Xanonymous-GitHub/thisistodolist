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
                  @click="checked"
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
    active:[],
    //test
    items: [{user_input:'test'}],
    model: [],
    selected: []
  }),
  created: function() {
    this.sync_data();
  },
  methods: {
    async checked(){
    },
    async sync_data() {
      var vm = this;
      try {
        let data = (await axios.get("/lists")).data;
        vm.items = [];
        for (let i = 0; i < data.length; i++) {
          vm.haveitems = true;
          vm.items.unshift({
            item_id: data[i].item_id,
            user_input: data[i].user_input
          });
          if (data[i].status) {
            vm.model.push(data[i].item_id);
          }
        }
      } catch (e) {
        console.log(e);
        alert("伺服器通訊失敗");
      }
    }
  },
  // mounted:{
  //   RecieveChanges(){
  //     this.$on('submitinputarea',()=>{
  //       alert('032323123123133213222222');
  //     });
  //   }
  // }
};
</script>

<style></style>
