import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/css/app.css';
import { ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import VueSimpleAlert from 'vue-simple-alert';

/** VUE GLOBAL COMPONENTS */

Vue.config.productionTip = false;
Vue.use(VueSimpleAlert);

extend('required', {
  ...required,
  message: 'This field is required.',
});

extend('email', { ...email, message: 'This email is invalid.' });

new Vue({
  router,
  store,
  components: {
    ValidationProvider,
  },
  mounted: function () {
    document.body.classList.add('bg-primary');
  },
  render: h => h(App),
}).$mount('#app');
