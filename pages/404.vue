<template>
  <main class="flex justify-center items-center h-screen primary__gradient">
    <h1 class="text-white text-6xl">404</h1>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  layout: 'test',
  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped>
.lh-6 {
  line-height: 6rem;
}
.height-32 {
  height: 32rem;
}
.active {
  @apply;
}
</style>
