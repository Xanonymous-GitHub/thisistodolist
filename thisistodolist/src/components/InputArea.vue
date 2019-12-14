<template>
  <v-form v-model="valid">
    <v-card>
      <v-card-title class="headline purple darken-3 white--text" primary-title
        >{{ this.config.inputAreaMissionConfig.title }}
      </v-card-title>
      <v-textarea auto-grow class="mx-5" required v-model="inputarea" />
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-switch
          v-model="newItemType"
          class="mx-4 text-sm-center"
          inset
          label="達成"
        />
        <v-btn
          :disabled="!valid || !inputarea.trim()"
          @click="submit(true)"
          color="primary"
          >確定
        </v-btn>
        <v-btn @click="submit(false)" color="error">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "InputArea",
  data: () => ({
    inputarea: "",
    newItemType: false,
    valid: true
  }),
  methods: {
    submit(type) {
      if (type) {
        if (this.config.inputAreaMissionConfig.classes === "add") {
          this.addItem();
        } else if (this.config.inputAreaMissionConfig.classes === "edit") {
          this.editItem();
        }
      }
      this.$store.dispatch("changeConfig", {
        name: "inputAreaDialogStatus",
        value: false
      });
    },
    addItem() {
      this.$store.dispatch("addNewItem", {
        text: this.inputarea,
        type: this.newItemType
      });
    },
    editItem() {
      let tmpItem = this.config.inputAreaMissionConfig.item;
      tmpItem.content = this.inputarea;
      if (this.newItemType !== tmpItem.complete) {
        this.$store.dispatch("addNewItem", {
          text: this.inputarea,
          type: this.newItemType
        });
        this.$store.dispatch("changeConfig", {
          name: "selected",
          value: Array(tmpItem.id)
        });
        this.$store.dispatch("selectionHandler", {
          listType: "unfin",
          actions: {
            name: "delItem",
            act: { name: "unfin" }
          }
        });
        this.$store.dispatch("selectionHandler", {
          listType: "fin",
          actions: {
            name: "delItem",
            act: { name: "fin" }
          }
        });
        this.$store.dispatch("delItem", { name: "tra", pos: 0 });
      }
    }
  },
  computed: {
    ...mapGetters({
      config: "getComponentConfig"
    })
  },
  mounted() {
    this.inputarea = this.config.inputAreaMissionConfig.content;
    this.newItemType = this.config.inputAreaMissionConfig.type;
  }
};
</script>

<style scoped />
