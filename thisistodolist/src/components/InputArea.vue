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
          @click="submit"
          color="primary"
          >確定
        </v-btn>
        <v-btn @click="submit" color="error">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
  name: "InputArea",
  data: () => ({
    inputarea: "",
    newItemType: false,
    valid: true
  }),
  methods: {
    submit() {
      this.AddItem();
      this.$store.dispatch("changeConfig", {
        name: "inputAreaDialogStatus",
        value: false
      });
    },
    AddItem() {
      let data = this.inputarea;
      this.$store.dispatch("testAddNewItem", {
        text: data,
        type: this.newItemType
      });
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
