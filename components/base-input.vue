<template>
  <div class="flex flex-col w-full">
    <label class="mb-2 text-sm font-semibold text-primary-default-main" v-if="label">{{ label }}</label
    ><span class="relative">
      <input
        :value="value"
        v-bind="$attrs"
        @input="updateValue"
        @focus="onFocus"
        @blur="onBlur"
        :error="hasError"
        :display="display"
        :size="size"
        :rounded="rounded"
        :class="[isError, cologBg, inputClass]"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :type="type"
        @keyup.enter="onPressEnter"
        autocomplete="current-password"
      />
      <!-- <span class="text-xs text-red"></span -->
    </span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: [String, Number],
    label: String,
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: [Number, String],
      default: '',
    },
    size: {
      type: String,
      default: 'small',
    },
    rounded: {
      type: String,
      default: 'small',
    },
    display: {
      type: String,
      default: 'block',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  data() {
    return {
      hasError: this.error,
    };
  },

  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
    onPressEnter(e) {
      this.$emit('onPressEnter', e);
    },
    onFocus(e) {
      this.$emit('onFocus', e);
    },
    onBlur(e) {
      this.$emit('onBlur', e);
    },
    onclick(e) {
      this.$emit('onClick', e);
    },
  },
  computed: {
    cologBg() {
      return 'bg-primary-input text-md border focus:outline-none';
    },
    inputClass() {
      return {
        'border-gray-400 ': this.error == false,
        'px-4 py-2': this.size == 'small',
        'px-4 py-3': this.size == 'medium',
        rounded: this.rounded == 'small',
        'border-gray-400': this.error == false,
        'w-full': (this.display = 'block'),
      };
    },

    isError() {
      return { 'border-red-500': this.error == true };
    },

    inputType() {
      return {
        password: this.type == 'password',
        number: this.type == 'number',
      };
    },

    classes() {
      const size = {
        large: 'lg',
        small: 'sm',
      }[this.size];
      return {
        [`ant-input-number-${size}`]: !!size,
        'ant-input-number-disabled': this.disabled,
        'ant-input-number-focused': !this.disabled && this.focused,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.reveal {
  margin-left: -30px;
  margin-top: 16px;
}

.text-md {
  font-size: 16px;
}
</style>
