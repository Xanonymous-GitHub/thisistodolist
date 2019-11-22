<template>
  <v-app>
    <v-content>
      <todolist />
    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import todolist from './components/todolist'
export default {
  name: 'App',

  components: {
    todolist
  },

  data: () => ({
    //
  }),
};
</script>
