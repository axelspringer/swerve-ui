import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.module";
import domains from "./domains.module";

Vue.use(Vuex);

const mutations = {
  addNotification(state, notification) {
    notification.id = new Date().getTime();
    state.notifications.unshift(notification);
  },
  removeNotification(state, notification) {
    state.notifications = state.notifications.filter(n => n !== notification);
  }
};

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    domains
  },
  state: {
    isLoading: false,
    notifications: []
  },
  mutations,
  actions: {}
});