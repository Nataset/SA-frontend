import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import AuthService from "@/services/AuthService";
import PurchaseProduct from "../services/PurchaseProduct";
import EditReward from "../services/EditReward.js";

const end_point =
  process.env.SHOP_VUE_APP_SHOP_ENDPOINT || "http://localhost:8000";

Vue.use(Vuex);

let auth_key = "auth-shop";
let auth = JSON.parse(localStorage.getItem(auth_key));
const initialStateUser = {
  user: auth ? auth.user : "",
  jwt: auth ? auth.jwt : "",
  isAuthen: auth ? true : false,
};

export default new Vuex.Store({
  state: {
    currentUser: initialStateUser,
    endPoint: end_point,
    items: [],
    editItem: {},
  },
  getters: {
    currentUser: (state) => state.currentUser,
    items: (state) => state.items,
    editItem: (state) => state.editItem,
    endPoint: (state) => state.endPoint,
    isAuthen: (state) => state.currentUser.isAuthen,
    isAdmin: (state) => state.currentUser.user.role == "admin",
  },
  mutations: {
    setCurrentUser(state, user, jwt) {
      state.currentUser.user = user;
      state.currentUser.jwt = jwt;
      state.currentUser.isAuthen = true;
    },

    resetCurrentUser(state) {
      state.currentUser.user = "";
      state.currentUser.jwt = "";
      state.currentUser.isAuthen = false;
    },

    setItems(state, res) {
      state.items = res;
    },
    getItemById(state, res) {
      state.editItem = res;
    },
  },
  actions: {
    async register({ commit }, body) {
      let res = await AuthService.register(body);
      if (res.success) {
        commit("setCurrentUser", res.user, res.jwt);
      }
      return res;
    },

    async login({ commit }, body) {
      let res = await AuthService.login(body);
      if (res.success) {
        commit("setCurrentUser", res.user, res.jwt);
      }
      return res;
    },

    async logout({ commit }) {
      AuthService.logout();
      commit("resetCurrentUser");
    },

    async fetchItems({ commit }) {
      try {
        let res = await axios.get(end_point + "/api/items");
        commit("setItems", res.data);
        return res.data;
      } catch (error) {
        console.error("Fetch Items error");
        console.error(error);
      }
    },
    async addItem({ commit }, payload) {
      let url = `${end_point}/api/items/add`;
      let body = payload;

      let res = await axios.post(url, body);
    },
    async getItemById({ commit }, id) {
      let url = `${end_point}/api/items/${id}`;
      let res = await axios.get(url);
      commit("getItemById", res.data);
    },
  },
  modules: {},
});
