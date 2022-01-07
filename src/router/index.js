import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contacts.vue'),
  },
  { path: '/contact/create', name: 'Contact.Create', component: () => import('../views/ContactCreate.vue') },
  { path: '/contact/:id/', name: 'Contact', component: () => import('../views/Contact.vue') },
  { path: '/contact/:id/edit', name: 'Contact.Edit', component: () => import('../views/ContactEdit.vue') },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
