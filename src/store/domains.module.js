import { read, create, update, remove } from "api-client";

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

const actions = {
  async fetchOne({ commit }, {endpoint, id}) {
    let response = await read(`${endpoint}/api/domain/${id}`);

    if (!response) {
      response = { data: {} };
    }

    return response;
  },
  async fetchList({ commit }, {endpoint, cursor}) {
    const response = await read(endpoint + "/api/domain" + (cursor && cursor != "reload" ? ("?cursor=" + cursor) : ""));

    if (cursor == "reload") {
      response.data.reload = true;
    }
    commit("setDomains", response.data || []);

    return response;
  },
  async updateOne({ commit }, {endpoint, domain}) {
    const response = await update(`${endpoint}/api/domain/${domain.domain}`, domain);

    return response;
  },
  async createOne({ commit }, {endpoint, domain}) {
    const response = await create(endpoint + "/api/domain/", domain);

    return response;
  },
  async deleteOne({ commit }, {endpoint, domain}) {
    const response = await remove(`${endpoint}/api/domain/${domain.domain}`);

    return response;
  }
};

const mutations = {
  /**
   * @param {DomainState} state
   * @param {Domain[]} domains
   */
  setDomains(state, domains) {
    if (state.domains && state.domains.domains && !domains.reload) {
      state.domains.domains = [...state.domains.domains, ...domains.domains]
      state.domains.cursor = domains.cursor
    } else
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
