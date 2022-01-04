import axios from 'axios';
// import store from '@/store'
// import router from '@/router'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      // store.commit('auth/logout', {root: true})
      // router.push({name: 'Welcome'})
    }

    if (error.response.status == 403) {
      // router.push({name: 'Forbidden'})
    }

    return Promise.reject(error);
  }
);

export default instance;
