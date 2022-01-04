<template>
  <div class="h-fit flex flex-col justify-between px-5">
    <div>
      <div @click="back()">
        <BackBar class="mb-5" :text="'Cancel'" />
      </div>
      <ContactOverview :contact="contact" />
      <h2 class="mt-4 font-bold text-xl">Name</h2>
      <BaseInput
        :placeholder="contact.name"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :required="false"
        v-model="edited.name"
      />
      <h2 class="mt-4 font-bold text-xl">Title</h2>
      <BaseInput
        :placeholder="contact.title"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :required="false"
        v-model="edited.title"
      />
      <h2 class="mt-4 font-bold text-xl">Profile Picture</h2>
      <BaseInput
        :placeholder="contact.pic"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :required="false"
        v-model="edited.pic"
      />
      <h2 class="mt-4 font-bold text-xl">Address</h2>
      <BaseInput
        :placeholder="contact.address"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :required="false"
        v-model="edited.address"
      />
      <h2 class="mt-4 font-bold text-xl">Phone</h2>
      <BaseInput
        :placeholder="contact.phone"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :required="false"
        v-model="edited.phone"
      />
      <h2 class="mt-4 font-bold text-xl">Email</h2>
      <BaseInput
        :placeholder="contact.email"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :required="false"
        v-model="edited.email"
      />
    </div>
    <div class="mt-10 flex flex-row justify-center w-full">
      <div class="w-9/12" @click="save()">
        <BaseButton class="select-none" :text="'Save'" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import BackBar from '@/components/shared/BackBar';
import BaseInput from '@/components/shared/BaseInput';
import BaseButton from '@/components/shared/BaseButton';

import ContactOverview from '@/components/shared/ContactOverview';

export default {
  name: 'ContactEdit',
  components: {
    BackBar,
    BaseInput,
    ContactOverview,
    BaseButton,
  },
  data() {
    return {
      contact: {},
      edited: {},
    };
  },
  methods: {
    ...mapMutations({
      setToken: 'GET_TOKEN',
    }),
    ...mapGetters({
      getToken: 'auth/token',
      getContacts: 'contacts',
    }),
    back: function () {
      this.$router.back();
    },
    save: function () {
      console.log('SAVING');
    },
  },
  created() {
    this.contact = this.getContacts().find(c => c.id == this.$route.params.id);
    this.contact.address = this.contact.address.replace(/\\n/g, '<br />');
    this.edited = { ...this.contact };
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
