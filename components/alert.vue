<template>
  <div v-if="show" class="flex items-center w-full h-8 p-2 text-" :class="setType">
    <svg-icon :name="icon.name" class="w-3 h-3 mr-2 fill-current" :class="icon.class" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'error',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      icon: {
        name: 'close',
        class: 'text-red-500',
      },
      show: false,
    };
  },
  computed: {
    setType() {
      if (this.type === 'error') {
        this.icon = {
          name: 'close',
          class: 'text-red-500',
        };
        return {
          'bg-red-200 border border-red-500': true,
        };
      }
    },
  },

  created() {
    this.show = this.visible;
  },

  methods: {
    toggle() {
      this.banker = !this.banker;
      this.$emit('isBanker', this.banker);
    },
  },
};
</script>

<style></style>
