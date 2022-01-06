<template>
  <div>
    <!--Label-->
    <Label :text="label" />
    <div class="mt-1 relative rounded-md">
      <!--Left icon-->
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="leftIcon"></slot>
      </div>
      <!--Input and validation -->
      <ValidationProvider :rules="rules" v-slot="{ errors }">
        <input
          :type="type"
          class="input caret-violetito mb-2 border-cute border-2"
          :class="[
            { 'border-transparent': hasCuteBorder, 'pl-10': hasLeftIcon, 'pr-10': hasRightIcon },
            background,
            padding,
            margin,
            textStyle,
          ]"
          :value="value"
          :placeholder="placeholder"
          @input="onInput"
        />
        <span class="text-violetito">{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider rules="required" v-slot="{ errors }">
        <!--Right icon-->
        <div class="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
          <slot name="rightIcon"></slot>
        </div>
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <p v-if="errors" class="error">We'll only use this for spam.</p>
  </div>
</template>

<script>
import Label from '@/components/shared/Label';
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'BaseInput',
  components: { Label, ValidationProvider },
  data() {
    return {
      hasCuteBorder: { type: Boolean, default: true },
    };
  },
  props: {
    label: { type: String },
    type: { type: String, default: 'text' },
    errors: { type: Array },
    value: { type: String },
    placeholder: { type: String },
    background: { type: String },
    padding: { type: String },
    margin: { type: String },
    required: { type: Boolean, default: false },
    textStyle: { type: String, required: false, default: '' },
    rules: { type: String, default: '' },
  },
  computed: {
    hasLeftIcon() {
      return this.$slots.leftIcon ? true : false;
    },

    hasRightIcon() {
      return this.$slots.rightIcon ? true : false;
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
      this.$emit('keydown', event.target.value);
    },
  },
  setup(props) {
    const bg = props.background;
    if (bg.includes('border-cute')) {
      this.hasCuteBorder = false;
    }
  },
};
</script>

<style scoped>
.input {
  @apply outline-none focus:outline-none ring-primary  block w-full sm:text-sm rounded-md;
}
.error {
  @apply mt-2 text-sm text-red-600;
}
</style>
