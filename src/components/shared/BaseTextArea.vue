<template>
  <div>
    <textarea
      ref="input"
      :rows="rows"
      :placeholder="placeholder"
      :style="{ '--placeholder-color': placeholderColor }"
      class="textarea w-full focus:outline-none caret-violetito text-violetito focus:border-white"
      :class="[
        background,
        color,
        yPadding,
        xPadding,
        borderRadius,
        resize,
        borderWidth,
        errors.length ? 'border-functional-error' : borderColor,
      ]"
      @input="updateValue($event.target.value)"
    ></textarea>
    <h4 v-if="errors.length" class="text-functional-error text-xs mt-1">{{ errors[0] }}</h4>
  </div>
</template>
<script>
export default {
  name: 'BaseTextArea',
  components: {},
  props: {
    value: { type: String, required: false, default: '' },
    label: String,
    placeholder: { type: String, default: '' },
    placeholderColor: { type: String, default: '#6E6885' },
    background: { type: String, default: 'bg-secondary-dark' },
    color: { type: String, default: 'text-white' },
    yPadding: { type: String, default: 'py-3' },
    xPadding: { type: String, default: 'px-4' },
    borderRadius: { type: String, default: 'rounded-lg' },
    borderColor: { type: String, default: 'border-transparent' },
    borderWidth: { type: String, default: 'border-1.5' },
    rows: { type: String, default: '3' },
    resize: { type: String, default: 'resize-none' },
    errors: { type: Array, required: false, default: () => [] },
  },
  methods: {
    updateValue(value) {
      this.$refs.input.value = value;
      this.$emit('input', value);
    },
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.textarea {
  min-height: 6rem;
  white-space: pre-wrap;
}
.textarea::placeholder {
  color: var(--placeholder-color);
}
</style>
