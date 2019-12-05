<template>
  <div id="app">
    <!-- <router-link to="/"></router-link>
    <router-link to="/about"></router-link> -->
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<style scoped>
  #app {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
