<template>
  <div class="h-fit flex flex-col justify-between px-4">
    <div>
      <BackBar @backWasClicked="back()">
        <template v-slot:action>
          <div @click="trash()">
            <TrashIcon />
          </div>
        </template>
      </BackBar>
      <ContactOverview :contact="contact" />
      <div class="mt-5 flex flex-col space-y-6 justify-evenly">
        <div>
          <h2 class="font-bold text-xl">Address</h2>
          <p class="mt-2 text-violetito" v-html="contact.address"></p>
        </div>
        <div>
          <h2 class="font-bold text-xl">Phone</h2>
          <p class="mt-2 text-violetito">{{ contact.phone }}</p>
        </div>
        <div>
          <h2 class="font-bold text-xl">Email</h2>
          <p class="mt-2 text-violetito">{{ contact.email }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-center w-full">
      <div class="w-9/12" @click="edit()">
        <BaseButton class="select-none" :text="'Edit'" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import TrashIcon from '@/components/shared/icon/TrashIcon';
import BaseButton from '@/components/shared/BaseButton';
import BackBar from '@/components/shared/BackBar';
import ContactOverview from '@/components/shared/ContactOverview';
import instance from '@/api/index';

export default {
  name: 'Contact',
  components: { BaseButton, TrashIcon, ContactOverview, BackBar },
  data() {
    return {
      contact: {},
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
    navigate: function (id) {
      this.$router.push({ name: 'Contact', params: { id: id } });
    },
    back: function () {
      this.$router.back();
    },
    doDelete: function () {
      instance
        .delete('api/contact/' + this.contact.id, {
          headers: {
            Authorization: 'Bearer ' + this.getToken(),
          },
        })
        .then(() => {
          this.back();
        });
    },
    trash: function () {
      this.$fire({
        title: 'Confirm',
        text: 'Are you sure that you want to delete ' + this.contact.name + ' from your contact list?',
        type: 'warning',
        confirmButtonText: 'Yes, delete!',
        confirmButtonColor: '#9378FF',
        cancelButtonColor: '#98869C',
        showCancelButton: true,
      }).then(result => {
        if (result.value) {
          this.doDelete();
        }
      });
    },
    edit() {
      this.$router.push({ name: 'Contact.Edit', params: { id: this.contact.id } });
    },
  },
  computed: {
    filteredContacts: function () {
      return this.raw.filter(contact => contact.name.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  created() {
    this.contact = this.getContacts().find(c => c.id == this.$route.params.id);
    this.contact.address = this.contact.address.replace(/\\n/g, '<br />');
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
