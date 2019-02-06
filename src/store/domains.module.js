import { read, create, update, remove } from "api-client";
import Vue from "vue";

/**
 * @typedef {Object} Domain
 * @property {Number} id
 * @property {String} domain
 * @property {String} redirect
 * @property {Path[]} paths
 */

 /**
  * @typedef {Object} Path
  * @property {String} from
  * @property {String} to
  */

/**
 * @typedef {Object} DomainState
 * @property {Domain[]} domains
 */

const state = {
  domains: []
};

const getters = {};

const endpoint =
  process.env.NODE_ENV == "development"
    ? "http://localhost:8082/api/domain"
    : "https://api.swerve.tortuga.cloud/domains";

const actions = {
  async fetchOne({ commit }, { id }) {
    let response = await read(`${endpoint}/${id}`);

    if (!response) {
      response = { data: {} };
    }

    return response;
  },
  async fetchList({ commit }) {
    const response = await read(endpoint);

    commit("setDomains", response.data || []);

    return response;
  },
  async updateOne({ commit }, data) {
    const response = await update(`${endpoint}/${data.id}`, data);

    return response;
  },
  async createOne({ commit }, data) {
    const response = await create(endpoint, data);

    return response;
  },
  async deleteOne({ commit }, data) {
    const response = await remove(`${endpoint}/${data.id}`)

    return response;
  }
};

const mutations = {
  /**
   * @param {DomainState} state
   * @param {Domain[]} domains
   */
  setDomains(state, domains) {
    state.domains = domains;
  },
  /**
   * @param {DomainState} state
   * @param {Domain} domain
   */
  addDomain(state, domain) {
    state.domains.push(domain);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
