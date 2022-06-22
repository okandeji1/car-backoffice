<template>
  <div class="min-h-screen">
    <lazy-car-navbar />
    <Nuxt class="h-full w-full"/>
    <lazy-car-footer />
  </div>
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
