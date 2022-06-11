<template>
  <main>test</main>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  // layout: 'user',
  data() {
    return {
      loggedIn: this.$auth.loggedIn,
      user: this.$auth.user,
    };
  },
  methods: {},
});
</script>
