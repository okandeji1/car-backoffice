<template>
  <div>
    <lazy-car-users role="online-customer"> </lazy-car-users>
  </div>
</template>

<script>
export default {
  layout: 'user',
  middleware: 'auth',
};
</script>

<style lang="scss" scoped></style>
