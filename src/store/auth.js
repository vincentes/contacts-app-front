import instance from '@/api/index';
import router from '../router';

export default {
  namespaced: true,
  state: {
    authenticated: false,
    user: {},
    token: null,
  },
  getters: {
    authenticated(state) {
      return state.authenticated;
    },
    user(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    },
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value;
    },
    SET_USER(state, value) {
      state.user = value;
    },
    SET_TOKEN(state, token) {
      console.log(token);
      state.token = token;
    },
  },
  actions: {
    info({ commit, state }) {
      return instance
        .get('/api/profile', {
          headers: { Authorization: 'Bearer ' + state.token },
        })
        .then(({ data }) => {
          commit('SET_USER', data);
          commit('SET_AUTHENTICATED', true);
          console.log(state.user);
          router.push({ name: 'Contacts' });
        })
        .catch(() => {
          commit('SET_USER', {});
          commit('SET_AUTHENTICATED', false);
        });
    },
  },
};
