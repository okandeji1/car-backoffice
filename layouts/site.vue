<template>
  <main class="min-h-screen flex flex-col content">
    <lazy-car-navbar />
    <Nuxt class="" />
    <lazy-car-footer />
  </main>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({}),
  },

  data() {
    return {};
  },

  methods: {
    ...mapActions({}),
  },

  mounted() {
    this.$nextTick(() => {});
  },
};
</script>

<style>
.content {
  transition: all 0.3s;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
