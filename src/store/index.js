import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
  },
  plugins: [createPersistedState()],
  state: {
    contacts: [],
  },
  mutations: {
    SET_CONTACTS(state, value) {
      state.contacts = value;
    },
  },
  getters: {
    contacts(state) {
      return state.contacts;
    },
  },
});
