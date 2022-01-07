<template>
  <div class="w-full flex flex-row space-x-3 mt-6">
    <img :src="'http://localhost:8000/storage/' + contact.pic" class="w-16 rounded-full object-contain" />
    <div class="w-full flex flex-col space-y-1">
      <h1 class="text-2xl font-bold">{{ contact.name }}</h1>
      <p class="text-violetito">{{ contact.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactOverview',
  props: {
    contact: { type: Object, default: () => ({}) },
  },
};
</script>

<style></style>
