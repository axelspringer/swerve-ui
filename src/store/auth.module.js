import {create} from "api-client";
import {getToken, getEndpoint, setLoginData, clearLoginData} from "../services/token";
import { read } from "fs";


const state = {
  token: getToken(),
  endpoint: getEndpoint(),
};

const getters = {

};

const actions = {
  async fetchLoginData({commit}, {username, password, endpoint}) {
      const response = await create(endpoint + "/login", {
        username,
        password
      })
  
      commit('storeLoginData', {
        endpoint,
      });

      return response;
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
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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