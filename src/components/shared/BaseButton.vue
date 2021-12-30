<template>
  <div class="flex">
    <button
      type="button"
      :disabled="disabled"
      :class="[padding, `btn-${btnStyle}`]"
      class="btn"
      @click.stop="onClick"
      @mousedown="onMousedown"
    >
      <Spinner v-if="loading" class="mr-3" :color="btnStyle == 'primary' ? '#1B1922' : '#EA4C69'" />
      <slot v-else name="leftIcon"></slot>
      <span :class="textStyle">{{ text }}</span>
      <slot name="rightIcon"></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    text: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    btnStyle: { type: String, default: 'primary' },
    size: { type: String, default: 'normal' },
  },

  computed: {
    padding() {
      switch (this.size) {
        case 'small':
          return 'px-3.5 py-2.5';
        default:
          return 'px-7.5 py-3';
      }
    },

    textStyle() {
      let weight = '500';
      let size = 'l';
      if (this.btnStyle == 'primary') {
        weight = '600';
      }
      if (this.size == 'small') {
        size = 's';
      }
      return `label-${size}-${weight}`;
    },
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

<style scoped>
.btn {
  @apply flex justify-center items-center rounded-lg outline-none focus:outline-none transition-all duration-200 ease-in disabled:opacity-30 disabled:cursor-not-allowed;
}
.btn-phantom {
  @apply bg-transparent border border-primary text-white focus:bg-primary focus:bg-opacity-30 hover:bg-primary hover:bg-opacity-20;
}
.btn-primary {
  @apply bg-primary border border-transparent text-secondary-dark hover:bg-primary-light;
}
.btn-phantom-secondary {
  @apply bg-transparent border border-secondary-40 text-secondary-20 focus:bg-secondary-20 focus:bg-opacity-30 hover:bg-secondary-20 hover:bg-opacity-20;
}
</style>
