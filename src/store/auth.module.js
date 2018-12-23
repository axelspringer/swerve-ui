import {create} from "api-client";
import {getToken, setToken, clearToken} from "../services/token";


const state = {
  token: getToken()
};

const getters = {

};

const actions = {
  async fetchToken({commit}, {username, password}) {
    try {
      /*
      const response = await create("https://some.api.endpoint", {
        username,
        password
      });
      */

      if (username !== 'admin' && password !== 'admin') {
        return Promise.reject();
      }

      const response = await Promise.resolve({data: {access_token: 'access_token'}});
  
      const token = response.data.access_token;
  
      commit('storeToken', token);

      return response;
    } catch (error) {
      return error;
    }
  }
};

const mutations = {
  storeToken(state, token) {
    state.token = token;
    setToken(token);
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