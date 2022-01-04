<template>
  <label class="label">{{ text }}</label>
</template>

<script>
export default {
  name: 'Label',
  props: {
    text: { type: String, default: '' },
  },
};
</script>

<style scoped>
.label {
  @apply block text-sm font-medium text-gray-700;
}
</style>
