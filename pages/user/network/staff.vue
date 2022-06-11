<template>
  <div>
    <lazy-car-users role="staff" mainTitle="Staff List" subTitle="Add Staff"> </lazy-car-users>
  </div>
</template>

<script>
export default {
  layout: 'user',
  middleware: 'auth',
};
</script>

<style lang="scss" scoped></style>
