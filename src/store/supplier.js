import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
const api_endpoint =
  process.env.SHOP_VUE_APP_SHOP_ENDPOINT || "http://localhost:8000";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { suppliers: [], data: [] },
  getters: {
    suppliers: (state) => state.suppliers,
    data: (state) => state.data,
  },
  mutations: {
    fetchSuppliers(state, { res }) {
      state.suppliers = res.data;
    },
  },
  actions: {
    async fetchSuppliers({ commit }) {
      let url = `${api_endpoint}/api/suppliers`;

      let res = await axios.get(url);

      commit("fetchSuppliers", { res });
    },
    async addSupplier({ commit }, payload) {
      let url = `${api_endpoint}/api/suppliers/add`;
      let body = payload;

      let res = await axios.post(url, body);
    },
  },
  modules: {},
});
