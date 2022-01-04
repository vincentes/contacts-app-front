<template>
  <div class="flex flex-row px-5 py-10" :class="!even ? 'bg-primary' : 'bg-secondary'">
    <img :src="pic" class="rounded-full w-2/12" />
    <div class="ml-6 flex flex-col space-y-1 w-8/12 justify-center">
      <div class="text-2xl overflow-hidden truncate font-bold w-8/12">{{ name }}</div>
      <p class="text-ellipsis w-10/12 overflow-hidden truncate text-violetito">
        {{ message }}
      </p>
    </div>
    <div class="w-2/12 flex flex-col justify-center items-center">
      <div class="text-center">
        <RightIcon />
      </div>
    </div>
  </div>
</template>

<script>
import RightIcon from '@/components/shared/icon/RightIcon';

export default {
  name: 'ContactItem',
  components: {
    RightIcon,
  },
  props: {
    even: { type: Boolean, default: false },
    name: { type: String, default: 'James Bond' },
    message: { type: String, default: 'I always enjoyed studying a new tongue.' },
    pic: {
      type: String,
      default:
        'https://static.wikia.nocookie.net/jamesbond/images/8/81/James_Bond_%28Daniel_Craig%29_-_Profile.jpg/revision/latest?cb=20220103100438',
    },
  },
};
</script>

<style></style>
