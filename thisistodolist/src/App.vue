<template>
  <div id="app">
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
