<template>
  <div class="flex w-full min-height mdHeight">
    <div class="w-full">
      <a-carousel v-for="currentItem in items" :key="currentItem.id" class="w-full flex items-center">
        <img :src="currentItem.imgUrl" class="w-full h-full" />
      </a-carousel>
    </div>
    <!-- <a-carousel autoplay>
      <div v-if="currentItem in items">
        <img :src="currentItem.imgUrl" class="w-full h-full" />
      </div>
    </a-carousel> -->
  </div>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js';

const items = [
  // {
  //   id: 1,
  //   imgUrl: 'https://media.istockphoto.com/photos/new-black-metallic-sedan-car-in-spotlight-modern-desing-brandless-picture-id907671144?s=612x612',
  // },
  // {
  //   id: 2,
  //   imgUrl: 'https://media.istockphoto.com/photos/line-of-new-compact-cars-at-dealership-picture-id165051585?s=612x612',
  // },
  // {
  //   id: 3,
  //   imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE42nZ3oYwvsslpJ96yO6layqxgPBSka9q7g&usqp=CAU',
  // },
  // {
  //   id: 4,
  //   imgUrl: 'https://img.philkotse.com/2022/05/10/fKTS831V/philkotse-01-philkotse-600x300-mobile--ce9a_wm.jpg',
  // },
  {
    id: 5,
    imgUrl: 'https://img.philkotse.com/2022/04/15/5d6zsoWZ/hometop1-wap-7217_wm.jpg',
  },
];
export default {
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },

  computed: {
    currentItem() {
      return this.items[Math.abs(this.currentIndex) % this.items.length];
    },
  },

  data() {
    return {
      items,
      perView: 1,
      autoplay: 2000,
      currentIndex: 0,
      breakpoints: {
        800: {
          perView: 1,
        },
        480: {
          perView: 1,
        },
      },
    };
  },

  methods: {
    startSlider() {
      this.timer = setInterval(this.next, 4000);
    },
  },

  mounted() {
    this.startSlider();
  },
};
</script>

<style scoped>
.glide__track {
  display: flex;
  height: 100%;
}

.glide__slides {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100% !important;
}

.min-height {
  min-height: 8rem;
}

.glide__slide {
  height: 100%;
}

.ant-carousel .slick-slider .slick-initialized{
    position: relative;
    display: block;
    box-sizing: border-box;
    -webkit-touch-callout: none;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
    width: 100% !important;
}

@media only screen and (min-width: 600px) {
  .mdHeight {
    height: 23rem;
  }
}
</style>
