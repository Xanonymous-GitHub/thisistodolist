<template>
  <v-app>
    <p>
      trashcan
    </p>
  </v-app>
</template>

<script>
export default {
  name: "trashcan",
  beforeCreate() {
    this.$store.dispatch("setCurrentStatus", "tra");
  }
};
</script>

<style scoped />
