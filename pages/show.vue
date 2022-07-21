<template>
<main>
  <div class="flex flex-col md:flex-row md:justify-between md:p-2" v-for="(item, index) in car" :key="index">
    <div class="flex flex-col order-1 md:order-2 w-full">
      <h1 class="font-bold text-lg">{{item.title}} {{item.model}} <span class="text-primary-m-secondary">Overview</span></h1>
      <h1 class="font-bold text-lg text-primary-m-secondary hidden md:flex">{{item.price}}</h1>
      <lazy-car-details-card :details="car" display="hidden md:flex" HDesplay="hidden"></lazy-car-details-card>
    </div>
    <div class="flex flex-col order-2 md:order-1 w-full">
      <img :src="item.img" alt="">
      <h1 class="font-bold text-lg text-primary-m-secondary p-2 md:hidden">{{item.price}}</h1>
    </div>
  </div>
  <!-- Description -->
  <lazy-car-details-card :details="car" display="md:hidden flex" HDesplay="flex"></lazy-car-details-card>
  <!-- Specification -->
  <div class="flex"></div>
</main>
</template>
<script>
import { mapGetters } from 'vuex';

const car = [
  {
    img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/new-ghost-white-fr-3-4-1-1598911711.jpg',
    title: 'Toyota Hilux',
    price: '12,000,000',
    model: '2.2L XLS 4x2 MT',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae perspiciatis explicabo dolorem voluptate eos quo nemo. Quaerat consectetur eius totam, sint laudantium, debitis ea assumenda velit quidem iusto itaque commodi. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut qui labore fugit necessitatibus cum voluptates non ipsum, porro beatae ducimus eaque officia, eum amet laboriosam blanditiis neque dolor mollitia delectus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem praesentium distinctio ipsam enim, nam pariatur. Eligendi fugit vitae labore, placeat reiciendis doloribus aspernatur veritatis quod modi provident, laudantium sit totam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis repellat ea culpa. Dolore necessitatibus dolorum commodi porro earum eius harum, cumque ipsa nostrum, ullam quas eos facilis esse consequatur amet!',
    body: 'Pickup',
    transmission: 'AT, MT',
    seat: '4',
    engine: '2.4L',
    maxPower: '179hp',
    maxTorque: '430Nm',
  },
];

export default {
  layout: 'site',
  middleware: 'guest',

  data() {
    return {
      car,
    };
  },

  computed: {
    ...mapGetters({}),
  },
  methods: {},

  mounted() {
    this.$nextTick(() => {});
  },
};
</script></script>
<style></style>