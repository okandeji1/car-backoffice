<template>
  <main class="flex flex-col items-center justify-center text-primary-default-main">
    <div class="mt-10">
      <div class="message">
        <svg-icon name="black-settings" class="inline-block w-10 h-10"></svg-icon>
        <h3 class="text-6xl">Forbidden</h3>
      </div>
      <div class="reason">
        <p>Sorry, your access is refused due to security reasons of our server and also our sensitive data.</p>
        Please go back to the previous page to continue browsing.
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  layout: 'default',
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
