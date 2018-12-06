import {httpPost} from "../services/api";
import {getToken, storeToken, clearToken} from "../services/token";


const state = {
  token: getToken()
};

const getters = {

};

const actions = {
  async fetchToken({commit}, {username, password}) {
    try {
      const response = await httpPost("https://some.api.endpoint", {
        username,
        password
      });
  
      const token = response.data.access_token;
  
      commit('storeToken', token);
    } catch (error) {
      console.log(error);
    }
  }
};

const mutations = {
  storeToken(state, token) {
    state.token = token;
    storeToken(token);
  },
  clearToken(state) {
    state.token = null;
    clearToken();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}