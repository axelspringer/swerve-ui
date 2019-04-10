import {create} from "api-client";
import {getToken, getEndpoint, setLoginData, clearLoginData} from "../services/token";


const state = {
  token: getToken(),
  endpoint: getEndpoint(),
};

const getters = {

};

const actions = {
  async fetchLoginData({commit}, {username, password, endpoint}) {
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
  
      commit('storeLoginData', {
        token,
        endpoint,
      });

      return response;
    } catch (error) {
      return error;
    }
  }
};

const mutations = {
  storeLoginData(state, data) {
    state.token = data.token;
    state.endpoint = data.endpoint
    setLoginData(data);
  },
  clearLoginData(state) {
    state.token = null;
    state.endpoint = null;
    clearLoginData();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}