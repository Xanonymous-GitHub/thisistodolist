<template>
  <v-app>
    <p>
      seetings
    </p>
  </v-app>
</template>

<script>
export default {
  name: "settings",
  beforeCreate() {
    this.$store.dispatch("setCurrentStatus", "set");
  }
};
</script>

<style scoped />
