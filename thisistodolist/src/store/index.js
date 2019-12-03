import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    list: {
      unfinished: [],
      finished: [
        { key: 'fhwiehfwie', text: 'A', uuid: '12345' },
        { key: 'wegjkjbgksj', text: 'B', uuid: '12345' }
      ]
    },
  },
  mutations: {

  },
  actions: {
    SetFinished(data, position) {
      //put only one data to the position of state.list.finished[]
    },
    SetUnfinished(data) {
      //
    },
  },
  modules: {},
  getters: {
    GetFinished() {

    },
    GetUnfinished() {

    }
  },
  strict: true,
  plugin: []
});