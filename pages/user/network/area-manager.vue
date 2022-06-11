<template>
  <div>
    <lazy-car-users role="area-manager" mainTitle="Area Manager List"> </lazy-car-users>
  </div>
</template>

<script>
export default {
  layout: 'user',
  middleware: 'auth',
};
</script>

<style lang="scss" scoped></style>
