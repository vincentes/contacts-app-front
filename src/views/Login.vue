<template>
  <div class="mx-10 flex flex-col justify-center items-center space-y-10">
    <img class="w-32" src="../assets/img/ball.png" />
    <h1 class="text-4xl font-bold">Welcome</h1>
    <div class="bg-secondary w-full mx-5 shadow-xl p-10 rounded-3xl">
      <form @submit.prevent="login()">
        <div class="text-xl font-bold">Username</div>
        <BaseInput
          :placeholder="'Username'"
          :background="'bg-cute'"
          :padding="'pl-3 py-3'"
          :rules="'required'"
          v-model="auth.email"
          @keydown="resetLoginError()"
        />
        <div class="text-xl font-bold mt-10">Password</div>
        <BaseInput
          :placeholder="'Password'"
          :background="'bg-cute'"
          :type="'password'"
          :padding="'pl-3 py-3'"
          :rules="'required'"
          v-model="auth.password"
          @keydown="resetLoginError()"
        />
        <span class="text-red-500 mt-5">{{ loginError }}</span>

        <button type="submit" :disabled="processing" class="w-full">
          <BaseButton
            class="mt-10 select-none"
            :text="'Login'"
            :disabled="isDisabled()"
            :class="isDisabled() ? 'opacity-50' : 'opacity-100'"
          />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/shared/BaseInput';
import BaseButton from '@/components/shared/BaseButton';
import { mapActions, mapMutations } from 'vuex';
import instance from '@/api/index';

export default {
  name: 'Login',
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      auth: {
        email: '',
        password: '',
      },
      loginError: '',
      processing: false,
    };
  },

  methods: {
    ...mapActions({
      info: 'auth/info',
    }),
    ...mapMutations({
      setToken: 'SET_TOKEN',
    }),
    isDisabled() {
      return !this.auth.email || !this.auth.password;
    },
    async login() {
      if (!this.auth.email || !this.auth.password) {
        return;
      }

      console.log('async logging in');
      this.processing = true;
      await instance.get('/sanctum/csrf-cookie');
      await instance
        .post('api/signin', this.auth)
        .then(({ data }) => {
          this.$store.commit('auth/SET_TOKEN', data.token);
          this.$fire({
            title: 'Login success',
            text: 'You have been logged in. Welcome back.',
            type: 'success',
            confirmButtonColor: '#9378FF',
            timer: 1500,
          }).then(() => {
            this.info();
          });
        })
        .catch(({ response: { data } }) => {
          this.loginError = data.message;
        })
        .finally(() => {
          this.processing = false;
        });
    },
    resetLoginError() {
      this.loginError = '';
    },
  },
};
</script>
