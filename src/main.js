import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/css/app.css';
import Spinner from './components/shared/Spinner.vue';
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import VueSimpleAlert from 'vue-simple-alert';

/** VUE GLOBAL COMPONENTS */
Vue.component('Spinner', Spinner);

Vue.config.productionTip = false;
Vue.use(VueSimpleAlert);

extend('required', {
  ...required,
  message: 'This field is required.',
});

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
