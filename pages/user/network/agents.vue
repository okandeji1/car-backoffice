<template>
  <div>
    <lazy-car-users role="agent" mainTitle="Agent List"> </lazy-car-users>
  </div>
</template>

<script>
export default {
  layout: 'user',
  middleware: 'auth',
};
</script>

<style lang="scss" scoped></style>
