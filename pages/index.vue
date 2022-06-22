<template>
  <div>
    <lazy-car-slider></lazy-car-slider>
    <div class="w-full bg-white mt-2">
      <div class="flex flex-col justify-items-center p-2 shadow-lg bg-primary-m-primary w-full border border-primary-m-primary">
      <h1>Cars For Sale</h1>
      <div class="flex justify-between items-center">
        <a-button>New Car</a-button>
        <a-button>Used Car</a-button>
      </div>
      <div class="flex justify-between items-center">
        <a-select>
          <a-option>Brand</a-option>
        </a-select>
        <a-select>
          <a-option>Model</a-option>
        </a-select>
      </div>
      <div class="flex justify-between items-center border">
        <a-select>
          <a-option>Body Type</a-option>
        </a-select>
        <a-select>
          <a-option>Price Range</a-option>
        </a-select>
      </div>
      <a-button>Search</a-button>
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'site',
  middleware: 'guest',

  data() {
    return {};
  },

  computed: {
    ...mapGetters({}),
  },
  methods: {},

  mounted() {
    this.$nextTick(() => {});
  },
};
</script>

<style lang="scss" scoped></style>
