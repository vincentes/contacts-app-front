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
    SET_CONTACT(state, value) {
      const index = state.contacts.findIndex(c => c.id === value.id);
      state.contacts[index] = value;
    },
    ADD_CONTACT(state, value) {
      if (!value.messages) {
        value.messages = [];
      }
      state.contacts.push(value);
    },
  },
  getters: {
    contacts(state) {
      return state.contacts;
    },
  },
});
