<template>
  <div id="app">
    <!-- <router-link to="/"></router-link>
    <router-link to="/about"></router-link> -->
    <transition>
    <router-view />
    </transition>
  </div>
</template>

<style scope>
#app {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
