<template>
  <div class="relative text-white icon-main" :class="[headerClass]">
    <div class="flex items-center icon-style bg-primary-default-main" @click="listener">
      <svg-icon :name="icon" class="inline-block w-4 h-4 mx-1 my-1 fill-current text-primary-bg"> </svg-icon>
    </div>
    <span> {{ title }} </span>
    <div class="absolute right-0 pr-3">
      <slot name="close"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Header',
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'normal',
    },
    bgColor: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    headerClass() {
      return {
        'h-7': this.size === 'small',
        'h-8': this.size === 'normal',
        'bg-primary-bg-ter': this.bgColor === 'primary',
        'bg-primary-sidebar': this.bgColor === 'secondary',
      };
    },
  },
  methods: {
    listener() {
      this.$emit('onClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-style {
  display: flex;
  flex-direction: row;
  justify-content: normal;
  align-items: center;
  float: left;
  min-height: 19px;
  min-width: 35px;
  margin-right: 6px;
  padding-right: 12px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.icon-style::after {
  content: '';
  height: 20pt;
  width: 10px;
  position: absolute;
  top: 0;
  right: -4px;
  transform: skew(-10deg);
  // background: var(--bg-tertiary);
  z-index: 1;
  @apply bg-primary-bg-ter;
  // content: '';
  // height: 20pt;
  // width: 10px;
  // position: absolute;
  // top: 0;
  // right: -4px;
  // transform: skew(-10deg);
  // // background: var(--bg-tertiary);
  // z-index: 1;;
}

.icon-main {
  // padding: 4px 0;
  color: #fff;
  background-color: #ffd200;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14.67px;
  display: flex;
  align-items: center;
}
</style>
