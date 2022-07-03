<template>
  <div>
    <lazy-car-slider></lazy-car-slider>
    <a-card class="flex flex-col w-full border md:hidden" title="Cars For Sale">
      <div class="flex justify-between items-center w-full my-2">
        <a-button class="w-32 h-10 p-2 flex items-center justify-center bg-primary-m-secondary text-white text-md font-black">New Car</a-button>
        <a-button class="w-32 h-10 p-2 flex items-center justify-center text-white text-md font-black bg-gray-600">Used Car</a-button>
      </div>
      <div class="flex justify-between items-center w-full my-2">
        <a-select class="w-32 h-10">
          <a-option>Brand</a-option>
        </a-select>
        <a-select class="w-32 h-10">
          <a-option>Model</a-option>
        </a-select>
      </div>
      <div class="flex justify-between items-center w-full my-2">
        <a-select class="w-32 h-10">
          <a-option>Body Type</a-option>
        </a-select>
        <a-select class="w-32 h-10">
          <a-option>Price Range</a-option>
        </a-select>
      </div>
      <a-button class="w-full h-10 bg-primary-m-primary text-white text-md font-black">Search</a-button>
      <div class="flex justify-center w-full p-2">
        <p class="text-primary-m-primary">Advance search</p>
      </div>
    </a-card>
    <div class="flex flex-col w-full p-2 md:justify-center md:items-center">
      <h1 class="text-xl font-black text-left">New Cars Guide</h1>
      <div class="flex flex-col md:flex-row">
        <div class="flex flex-col w-full h-20 border my-1" v-for="(car, index) in newCars" :key="index">
          <img :src="car.img" alt="" class="w-64 h-48" />
          <h3 class="font-bold text-lg cursor-pointer ml-4">{{ car.title }}</h3>
          <p class="text-sm text-gray-500 ml-4">Model Price</p>
          <p class="text-primary-m-primary text-lg ml-4">₦{{ car.price }}</p>
        </div>
      </div>
      <div class="flex flex-col md:flex-row">
        <div class="flex flex-col w-full h-20 border my-1" v-for="(car, index) in newCars" :key="index">
          <img :src="car.img" alt="" class="w-64 h-48" />
          <h3 class="font-bold text-lg cursor-pointer ml-4">{{ car.title }}</h3>
          <p class="text-sm text-gray-500 ml-4">Model Price</p>
          <p class="text-primary-m-primary text-lg ml-4">₦{{ car.price }}</p>
        </div>
      </div>
    </div>
    <!-- Used car tab -->
    <div class="flex flex-col w-full p-2 md:justify-center md:items-center">
      <h1 class="text-xl font-black text-left">Used Cars For Sale</h1>
      <div class="flex flex-col md:flex-row">
        <div class="flex flex-col w-full h-20 border my-1" v-for="(car, index) in newCars" :key="index">
          <img :src="car.img" alt="" class="w-64 h-48" />
          <h3 class="font-bold text-lg cursor-pointer ml-4">{{ car.title }}</h3>
          <p class="text-sm text-gray-500 ml-4">Model Price</p>
          <p class="text-primary-m-primary text-lg ml-4">₦{{ car.price }}</p>
        </div>
      </div>
      <div class="flex flex-col md:flex-row">
        <div class="flex flex-col w-full h-20 border my-1" v-for="(car, index) in newCars" :key="index">
          <img :src="car.img" alt="" class="w-64 h-48" />
          <h3 class="font-bold text-lg cursor-pointer ml-4">{{ car.title }}</h3>
          <p class="text-sm text-gray-500 ml-4">Model Price</p>
          <p class="text-primary-m-primary text-lg ml-4">₦{{ car.price }}</p>
        </div>
      </div>
    </div>
    <!-- Car Brand -->
    <div class="flex flex-col justify-center items-center p-2">
      <h1 class="font-bold text-lg">Car Price Brand</h1>
      <a-row :gutter="4" type="flex">
        <a-col :span="8" v-for="(brand, index) in brands" :key="index" class="mb-2">
          <div class="flex flex-col justify-center items-center border w-full px-2 py-2">
            <img :src="brand.img" alt="" />
            <h3>{{ brand.name }}</h3>
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- Featured promo (installment) -->
    <div class="flex flex-col p-2">
      <h1 class="font-bold text-lg">Featured Promo</h1>
      <a-carousel autoplay :dots="false" class="md:hidden">
        <div class="flex flex-col shadow-lg border" v-for="(item, index) in featured" :key="index">
          <img :src="item.img" alt="" class="w-full" />
          <div class="flex justify-center items-center bg-primary-m-primary m-1">
            <h2 class="font-bold text-lg cursor-pointer">
              {{ item.price }} <span>{{ item.period }}</span>
            </h2>
          </div>
          <p class="font-bold text-md text-black m-2">{{ item.name }} {{ item.model }} With {{ item.price }}</p>
          <div class="flex justify-between items-center m-2">
            <a-button ghost class="text-primary-m-primary font-bold border border-primary-bg-sec">View Details</a-button>
            <a-button class="bg-primary-m-primary font-bold text-white">Get Promo</a-button>
          </div>
        </div>
      </a-carousel>
      <p class="text-center cursor-pointer text-primary-m-primary p-2 text-lg md:hidden">View all promos</p>
    </div>
    <!-- Featured large screen -->
    <div class="hidden md:flex justify-center items-center p-2">
      <div class="flex flex-col mx-2 justify-center border shadow-lg" v-for="(item, index) in featured" :key="index">
        <img :src="item.img" alt="" class="w-full" />
        <div class="flex justify-center items-center bg-primary-m-primary m-1">
          <h2 class="font-bold text-lg cursor-pointer">
            {{ item.price }} <span>{{ item.period }}</span>
          </h2>
        </div>
        <p class="font-bold text-md text-black m-2">{{ item.name }} {{ item.model }} With {{ item.price }}</p>
        <div class="flex justify-between items-center m-2">
          <a-button ghost class="text-primary-m-primary font-bold border border-primary-bg-sec">View Details</a-button>
          <a-button class="bg-primary-m-primary font-bold text-white">Get Promo</a-button>
        </div>
      </div>
    </div>
    <!-- Partners -->
    <a-divider type="horizontal" orientation="center" class="font-bold text-2xl">Our Partners</a-divider>
    <div class="flex justify-center items-center flex-col md:flex-row w-full">
      <img :src="item.img" alt="" class="m-2" v-for="(item, index) in partners" :key="index" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const newCars = [
  // {
  //   img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/new-ghost-white-fr-3-4-1-1598911711.jpg',
  //   title: 'Toyota Hilux',
  //   price: '12,000,000'
  // },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4n7ChA4fHFqilLvxqsZgKiKNnHy0qA9ghFg&usqp=CAU',
    title: 'Mercedes Benz',
    price: '12,000,000',
  },
  {
    img:
      'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/2022/04_12/family_chooser_tecnica_m.png',
    title: 'lamborghini',
    price: '12,000,000',
  },
  {
    img:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-honda-civic-sedan-1558453497.jpg?crop=1xw:0.9997727789138833xh;center,top&resize=480:*',
    title: 'Honda',
    price: '12,000,000',
  },
  {
    img: 'https://d3ogcz7gf2u1oh.cloudfront.net/dealers/1000islands/assets/2019camry.png',
    title: 'Toyota Hilux',
    price: '12,000,000',
  },
];

const brands = [
  {
    img: require('assets/images/toyota.png'),
    name: 'Toyota',
  },
  {
    img: require('assets/images/mitsubishi.png'),
    name: 'Mitsubishi',
  },
  {
    img: require('assets/images/ford.png'),
    name: 'Ford',
  },
  {
    img: require('assets/images/mg.png'),
    name: 'MG',
  },
  {
    img: require('assets/images/chery.png'),
    name: 'Chery',
  },
  {
    img: require('assets/images/honda.png'),
    name: 'Honda',
  },
  {
    img: require('assets/images/kia.png'),
    name: 'Kia',
  },
  {
    img: require('assets/images/hyundai.png'),
    name: 'Hyundai',
  },
  {
    img: require('assets/images/nissan.png'),
    name: 'Nissan',
  },
  {
    img: require('assets/images/isuzu.png'),
    name: 'Isuzu',
  },
  {
    img: require('assets/images/mazda.png'),
    name: 'Mazda',
  },
  {
    img: require('assets/images/suzuki.png'),
    name: 'Suzuki',
  },
];

const featured = [
  {
    img: require('assets/images/fordp.jpg'),
    name: 'Ford',
    period: 'Monthly Payment',
    price: '100,000',
    model: '2.2L XLS 4x2 MT',
  },
  {
    img: require('assets/images/chang.jpg'),
    name: 'Changan Alsvin',
    period: 'Low Monthly',
    price: '100,000',
    model: '1.4L MT',
  },
  {
    img: require('assets/images/chang.jpg'),
    name: 'Changan Alsvin',
    period: 'Monthly Payment',
    price: '100,000',
    model: '1.4L MT',
  },
  {
    img: require('assets/images/chang.jpg'),
    name: 'Changan Alsvin',
    period: 'Low Monthly',
    price: '100,000',
    model: '1.5L DCT',
  },
];

const partners = [
  {
    img: require('assets/images/logo.jpeg'),
  },
  {
    img: require('assets/images/logo.jpeg'),
  },
  {
    img: require('assets/images/logo.jpeg'),
  },
  {
    img: require('assets/images/logo.jpeg'),
  },
];

export default {
  layout: 'site',
  middleware: 'guest',

  data() {
    return {
      newCars,
      brands,
      featured,
      partners,
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
</script>

<style lang="scss" scoped>
.ant-card-head-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>
