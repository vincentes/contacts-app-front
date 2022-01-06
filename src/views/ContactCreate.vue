<template>
  <div class="h-fit flex flex-col justify-between px-5">
    <div>
      <div>
        <BackBar @backPress="back()" class="mb-5" :text="'Cancel'" />
      </div>
      <h2 class="mt-4 font-bold text-xl">Name</h2>
      <BaseInput
        :placeholder="'Name'"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :rules="'required'"
        :textStyle="'text-violetito'"
        v-model="contact.name"
      />
      <h2 class="mt-4 font-bold text-xl">Title</h2>
      <BaseInput
        :placeholder="'Title'"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :rules="'required'"
        :textStyle="'text-violetito'"
        v-model="contact.title"
      />
      <h2 class="mt-4 font-bold text-xl">Profile Picture</h2>
      <BaseInput
        :placeholder="'Upload file'"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :rules="'required'"
        :textStyle="'text-violetito'"
        v-model="contact.pic"
      />
      <h2 class="mt-4 font-bold text-xl">Address</h2>
      <BaseTextArea
        :placeholder="'Address'"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :rules="'required'"
        v-model="contact.address"
      />
      <h2 class="mt-4 font-bold text-xl">Phone</h2>
      <BaseInput
        :placeholder="'Phone'"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :rules="'required'"
        :textStyle="'text-violetito'"
        v-model="contact.phone"
      />
      <h2 class="mt-4 font-bold text-xl">Email</h2>
      <BaseInput
        :placeholder="'Email'"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :required="'required'"
        :textStyle="'text-violetito'"
        v-model="contact.email"
      />
    </div>
    <div class="mt-10 flex flex-row justify-center w-full">
      <div class="w-9/12" @click="create()">
        <BaseButton class="select-none" :text="'Create'" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import BackBar from '@/components/shared/BackBar';
import BaseInput from '@/components/shared/BaseInput';
import BaseButton from '@/components/shared/BaseButton';
import BaseTextArea from '@/components/shared/BaseTextArea';
import instance from '@/api/index';

export default {
  name: 'ContactCreate',
  components: {
    BackBar,
    BaseInput,
    BaseButton,
    BaseTextArea,
  },
  data() {
    return {
      contact: {
        name: 'Addddd',
        address: 'Shakespeare',
      },
      edited: {},
    };
  },
  methods: {
    ...mapMutations({
      addContact: 'ADD_CONTACT',
    }),
    ...mapGetters({
      getToken: 'auth/token',
    }),
    back: function () {
      this.$router.replace({ name: 'Contacts' });
    },
    create() {
      console.log('CREATING');
      instance({
        method: 'post',
        url: '/api/contact/',
        headers: {
          Authorization: 'Bearer ' + this.getToken(),
        },
        data: this.contact,
      }).then(({ response }) => {
        console.log(response.data);
        this.setContact(response.data.contact[0]);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.h-fit {
  height: calc(100vh - 4rem) !important;
}
</style>
