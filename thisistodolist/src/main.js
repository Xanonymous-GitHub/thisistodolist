import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import vueaxios from 'vue-axios'
import axios from 'axios'
Vue.use(axios, vueaxios)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')