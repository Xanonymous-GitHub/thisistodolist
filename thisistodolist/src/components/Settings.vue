<template>
  <v-card flat class="ma-3">
    <v-card-text>
      <v-card-title>
        <b class="v-size--x-large">ThisIsToDoList 設定</b>
      </v-card-title>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-switch
              @change="changeDisplayMode"
              v-model="darkmode"
              label="深色模式"
              color="red"
              :value="config.darkmode"
              hide-details
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "settings",
  data: () => ({
    darkmode: true
  }),
  beforeCreate() {
    this.$store.dispatch("setCurrentStatus", "set");
  },
  methods: {
    changeDisplayMode() {
      this.$nextTick(() => {
        this.$store.dispatch("changeConfig", {
          name: "darkmode",
          value: this.darkmode
        });
      });
      this.$vuetify.theme.dark = this.darkmode;
    }
  },
  mounted() {
    this.darkmode = this.config.darkmode;
  },
  computed: {
    ...mapGetters({
      config: "getComponentConfig"
    })
  }
};
</script>

<style scoped />
