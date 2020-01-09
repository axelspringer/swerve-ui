import { create } from 'api-client';
import { getToken, setLoginData, clearLoginData } from '../services/token';

const state = {
  token: getToken()
};

const getters = {};

const actions = {
  async fetchLoginData({ commit }, { username, password, endpoint }) {
    const response = await create(endpoint + '/login', {
      username,
      password
    });

    return response;
  }
};

const mutations = {
  storeLoginData(state, data) {
    state.token = data.token;
    setLoginData(data);
  },
  clearLoginData(state) {
    state.token = null;
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    clearLoginData();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
