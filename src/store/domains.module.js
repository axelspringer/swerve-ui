import {httpGet} from "../services/api";

const state = {
  currentDomain: null,
  domains: []
};

const getters = {

};

const actions = {
  async fetchOne({commit}, {domain}) {
    const response = await Promise.resolve({
      data: {
        id: domain,
        domain: "https://foo.com",
        redirect: "https://bar.com",
        promotable: false,
        paths: [
          {from: "/baz", to: "/foo/bar"}
        ],
        description: "Some description",
        status: "301"
      }
    });

    return response;
  },
  async fetchList({commit}) {
    const response = await Promise.resolve({data: [
      {ID: '1', Domain: 'foo.com'},
      {ID: '2', Domain: 'bar.com'},
      {ID: '3', Domain: 'baz.com'},
    ]});

    commit('setDomains', response.data);

    return response;
  },
  async saveOne({commit}, data) {

  }
};

const mutations = {
  setCurrentDomain(state, domain) {
    state.currentDomain = domain;
  },
  setDomains(state, domains) {
    state.domains = domains;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}