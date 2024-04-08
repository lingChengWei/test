import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
  },
  getters: {},
  mutations: {},
  actions: {
    logout() {
      router.push("/login");
    },
  },
  modules: {},
});
