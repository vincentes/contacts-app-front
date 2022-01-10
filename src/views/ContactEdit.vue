<template>
  <div class="h-fit flex flex-col justify-between px-5">
    <div>
      <div>
        <BackBar @backPress="back()" class="mb-5" :text="'Cancel'" />
      </div>
      <ContactOverview :contact="contact" />
      <h2 class="mt-4 font-bold text-xl">Name</h2>
      <BaseInput
        :placeholder="contact.name"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :required="false"
        :textStyle="'text-violetito'"
        v-model="edited.name"
      />
      <h2 class="mt-4 font-bold text-xl">Title</h2>
      <BaseInput
        :placeholder="contact.title"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :required="false"
        :textStyle="'text-violetito'"
        v-model="edited.title"
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
        :placeholder="contact.address"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :rules="'required'"
        v-model="edited.address"
      />
      <h2 class="mt-4 font-bold text-xl">Phone</h2>
      <BaseInput
        :placeholder="contact.phone"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :rules="'required'"
        :textStyle="'text-violetito'"
        v-model="edited.phone"
      />
      <h2 class="mt-4 font-bold text-xl">Email</h2>
      <BaseInput
        :placeholder="contact.email"
        :background="'bg-cute'"
        :padding="'pl-3 py-3'"
        :required="'required'"
        :textStyle="'text-violetito'"
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
import BaseTextArea from '@/components/shared/BaseTextArea';
import ContactOverview from '@/components/shared/ContactOverview';
import instance from '@/api/index';
import UploadIcon from '@/components/shared/icon/UploadIcon';

export default {
  name: 'ContactEdit',
  components: {
    BackBar,
    BaseInput,
    ContactOverview,
    BaseButton,
    BaseTextArea,
    UploadIcon,
  },
  data() {
    return {
      contact: {},
      edited: {},
      inputFileInfo: 'Upload a file',
    };
  },
  methods: {
    ...mapMutations({
      setToken: 'GET_TOKEN',
      setContact: 'SET_CONTACT',
    }),
    ...mapGetters({
      getToken: 'auth/token',
      getContacts: 'contacts',
    }),
    back: function () {
      this.$router.replace({ name: 'Contact', params: { id: this.contact.id } });
    },
    fileSelector() {
      this.$refs.selectedFiles.click();
    },
    setFile() {
      this.edited.pic = this.$refs.selectedFiles.files[0];
      this.inputFileInfo = this.edited.pic.name;
    },
    save: function () {
      let formData = new FormData();
      for (var key in this.edited) {
        formData.append(key, this.edited[key]);
      }

      instance({
        method: 'post',
        url: `/api/contact/` + this.contact.id,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + this.getToken(),
        },
      }).then(response => {
        this.setContact(response.data.updated[0]);
        this.back();
      });
    },
  },
  created() {
    this.contact = this.getContacts().find(c => c.id == this.$route.params.id);
    this.edited = { ...this.contact };
    // Remove messages, we don't need them. It'll only mess with our POST method.
    delete this.edited.messages;
    delete this.edited.created_at;
    delete this.edited.updated_at;
    delete this.edited.user_id;
    delete this.edited.pic;
  },
};
</script>

<style scoped>
.h-fit {
  height: calc(100vh - 4rem) !important;
}
</style>
