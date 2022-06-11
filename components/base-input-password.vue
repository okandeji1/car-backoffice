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
        :type="revealType"
        @keyup.enter="onPressEnter"
      />
      <span class="absolute cursor-pointer">
        <svg-icon @click="listener" :name="eyeIcon" class="inline-block w-4 h-4 fill-current text-primary-default-main reveal"></svg-icon>
      </span>
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
      default: 'password',
    },
    reveal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hasError: this.error,
      hasReveal: this.reveal,
      visible: false,
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

    listener() {
      this.$emit('onClick');
      this.visible = !this.visible;
    },
    isRevealed() {
      this.visible = !this.visible;
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
        'w-full': (this.display = 'block'),
      };
    },

    isError() {
      return { 'border-red-500': this.error == true };
    },

    eyeIcon() {
      return this.visible ? 'reveal' : 'unreveal';
    },

    revealType() {
      return this.visible ? 'text' : 'password';
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
