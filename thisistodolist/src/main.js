import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
//import { createProvider } from './vue-apollo'

var VueCookies = require("vue-cookies");
Vue.use(VueCookies);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  //apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
