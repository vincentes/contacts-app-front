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
      <div
        @click="fileSelector()"
        class="flex flex-row justify-between caret-violetito mb-2 border-cute border-2 bg-cute pl-3 py-3 text-violetito"
      >
        <span class="text-ellipsis w-8/12 overflow-hidden truncate">{{ inputFileInfo }}</span>
        <div class="mr-5">
          <UploadIcon />
        </div>
        <input
          ref="selectedFiles"
          :type="'file'"
          class="w-0 text-ellipsis overflow-hidden truncate hidden input caret-violetito mb-2 border-cute border-2 bg-cute pl-3 py-3 text-violetito"
          :placeholder="'Upload an image'"
          @change="setFile"
        />
      </div>
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
import UploadIcon from '@/components/shared/icon/UploadIcon';

import instance from '@/api/index';

export default {
  name: 'ContactCreate',
  components: {
    BackBar,
    BaseInput,
    BaseButton,
    BaseTextArea,
    UploadIcon,
  },
  data() {
    return {
      contact: {},
      inputFileInfo: 'Upload a file',
    };
  },
  methods: {
    ...mapMutations({
      addContact: 'ADD_CONTACT',
    }),
    ...mapGetters({
      getToken: 'auth/token',
      getUser: 'auth/user',
    }),
    back: function () {
      this.$router.replace({ name: 'Contacts' });
    },
    goToContact: function (id) {
      this.$router.replace({ name: 'Contact', params: { id: id } });
    },
    setFile() {
      this.contact.pic = this.$refs.selectedFiles.files[0];
      this.inputFileInfo = this.contact.pic.name;
    },
    fileSelector() {
      this.$refs.selectedFiles.click();
    },
    create() {
      this.contact['user_id'] = this.getUser().id;

      let formData = new FormData();
      for (var key in this.contact) {
        formData.append(key, this.contact[key]);
      }

      instance({
        method: 'post',
        url: '/api/contact/',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + this.getToken(),
        },
      }).then(response => {
        this.addContact(response.data.contact);
        this.goToContact(response.data.contact.id);
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
