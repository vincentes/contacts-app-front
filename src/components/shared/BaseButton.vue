<template>
  <div class="w-full flex justify-center bg-violet py-4 rounded-full">
    <button
      type="button"
      :disabled="disabled"
      class="btn text-white"
      @click.stop="onClick"
      @mousedown="onMousedown"
    >
      <span class="uppercase">{{ text }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    text: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },

  methods: {
    onClick() {
      this.$emit('onClick');
    },
    onMousedown() {
      this.$emit('onMousedown');
    },
  },
};
</script>
