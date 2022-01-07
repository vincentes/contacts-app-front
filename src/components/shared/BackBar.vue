<template>
  <div class="flex flex-row w-full justify-between">
    <div class="flex flex-row space-x-3 items-center align-middle" @click="$emit('backWasClicked')">
      <LeftIcon />
      <span class="text-violetito" @click="back()">{{ text }}</span>
    </div>
    <div class="mr-5 align-bottom">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
import LeftIcon from '@/components/shared/icon/LeftIcon';

export default {
  name: 'BackBar',
  components: {
    LeftIcon,
  },
  props: {
    text: { type: String, default: 'Back' },
  },
  methods: {
    back: function () {
      this.$emit('backPress');
    },
  },
};
</script>

<style></style>
