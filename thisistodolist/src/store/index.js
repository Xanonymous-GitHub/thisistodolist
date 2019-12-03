import Vue from "vue";
import Vuex from "vuex";
import state from "./states";
import mutation from "./mutations";
import getter from "./getters";
import action from "./actions";
Vue.use(Vuex);
export default new Vuex.Store({
  state,
  mutation,
  getter,
  action,
  strict: true
});