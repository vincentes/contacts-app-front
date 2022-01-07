<template>
  <div>
    <h1 class="ml-4 text-4xl font-bold flex flex-row justify-between">
      Contacts
      <div class="font-light text-violetito mr-5" @click="create()">+</div>
    </h1>
    <div class="sticky top-5 mx-5 mt-5 shadow-lg">
      <BaseInput v-model="search" :placeholder="'Search'" :background="'bg-secondary'" :padding="'pl-3 py-3'">
        <template v-slot:rightIcon>
          <SearchIcon />
        </template>
      </BaseInput>
    </div>
    <div class="mt-10">
      <div v-for="(item, index) in filteredContacts" @click="navigate(item.id)" :key="item.id">
        <ContactItem
          :even="index % 2 == 0"
          :name="item.name"
          :pic="item.pic"
          :message="item.messages[0] ? item.messages[0].content : 'No messages found.'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/shared/BaseInput';
import SearchIcon from '@/components/shared/icon/SearchIcon';
import ContactItem from '@/components/shared/partial/contacts/ContactItem';
import instance from '@/api/index';
import { mapGetters } from 'vuex';

export default {
  name: 'Contacts',
  components: {
    BaseInput,
    SearchIcon,
    ContactItem,
  },
  data() {
    return {
      messages: [],
      raw: [],
      search: '',
    };
  },
  methods: {
    ...mapGetters({
      getToken: 'auth/token',
    }),
    navigate: function (id) {
      this.$router.push({ name: 'Contact', params: { id: id } });
    },
    create() {
      this.$router.push({ name: 'Contact.Create' });
    },
  },
  computed: {
    filteredContacts: function () {
      return this.raw.filter(contact => contact.name.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  created() {
    instance
      .get(`/api/contacts/`, {
        headers: {
          Authorization: 'Bearer ' + this.getToken(),
        },
      })
      .then(response => {
        console.log(response.data);
        this.raw = response.data;
        this.$store.commit('SET_CONTACTS', response.data);
      });
  },
};
</script>
