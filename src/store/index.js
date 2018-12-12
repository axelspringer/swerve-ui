import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.module";
import domains from "./domains.module";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    domains
  },
  state: {},
  mutations: {},
  actions: {}
});