<template>
  <div class="flex items-center justify-start p-4 mx-4 text-sm rounded-md info-notification">
    <svg-icon :name="icon" class="w-4 h-4 mr-4 fill-current"></svg-icon>
    <slot name="text"> </slot>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'close',
    },
  },
};
</script>

<style lang="scss" scoped></style>
