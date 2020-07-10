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
    let response = await read(`${endpoint}/redirects/${id}`);

    if (!response) {
      response = { data: {} };
    }

    return response;
  },
  async fetchList({ commit }, {endpoint, cursor}) {
    const response = await read(endpoint + "/redirects/" + (cursor && cursor != "reload" ? ("?cursor=" + cursor) : ""));

    if (cursor == "reload") {
      response.data.reload = true;
    }
    commit("setDomains", response || []);

    return response;
  },
  async updateOne({ commit }, {endpoint, domain}) {
    const response = await update(`${endpoint}/redirects/${domain.redirect_from}`, domain);

    return response;
  },
  async createOne({ commit }, {endpoint, domain}) {
    const response = await create(endpoint + "/redirects/", domain);

    return response;
  },
  async deleteOne({ commit }, {endpoint, domain}) {
    const response = await remove(`${endpoint}/redirects/${domain.redirect_from}`);

    return response;
  }
};

const mutations = {
  /**
   * @param {DomainState} state
   * @param {Domain[]} domains
   */
  setDomains(state, domains) {
    if (state.domains && state.domains.data && !domains.reload) {
      state.domains.data = [...state.domains.data, ...domains.data]
      state.domains.cursor = domains.cursor
    } else
    state.domains = domains;
  },
  /**
   * @param {DomainState} state
   * @param {Domain} domain
   */
  addDomain(state, domain) {
    state.data.push(domain);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
