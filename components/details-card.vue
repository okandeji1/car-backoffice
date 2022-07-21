<template>
  <div>
    <div class="flex-col p-2 w-full border-t-4" :class="display" v-for="(item, index) in details" :key="index">
      <h1 class="font-bold text-lg" :class="HDesplay">{{ item.title }} {{ item.model }}</h1>
      <div class="flex flex-col border shadow-lg justify-center items-center w-full">
        <div class="flex justify-center items-center p-4 w-full">
          <div class="flex border-b-2 justify-between w-full">
            <p>Body Type</p>
            <h3 class="font-bold text-lg">{{ item.body }}</h3>
          </div>
        </div>
        <div class="flex justify-center items-center p-4 w-full">
          <div class="flex border-b-2 justify-between w-full">
            <p>Transmission</p>
            <h3 class="font-bold text-lg">{{ item.transmission }}</h3>
          </div>
        </div>
        <div class="flex justify-center items-center p-4 w-full">
          <div class="flex border-b-2 justify-between w-full">
            <p>Seats</p>
            <h3 class="font-bold text-lg">{{ item.seat }}</h3>
          </div>
        </div>
        <div class="flex justify-center items-center p-4 w-full">
          <div class="flex border-b-2 justify-between w-full">
            <p>Engine</p>
            <h3 class="font-bold text-lg">{{ item.engine }}</h3>
          </div>
        </div>
        <div class="flex justify-center items-center p-4 w-full">
          <div class="flex border-b-2 justify-between w-full">
            <p>Max Power</p>
            <h3 class="font-bold text-lg">{{ item.maxPower }}</h3>
          </div>
        </div>
        <div class="flex justify-center items-center p-4 w-full">
          <div class="flex border-b-2 justify-between w-full">
            <p>Max Torque</p>
            <h3 class="font-bold text-lg">{{ item.maxTorque }}</h3>
          </div>
        </div>
        <div class="p-4" :class="HDesplay">
          <p class="text-base">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    details: {
      type: Array,
    },
    display: {
        type: String
    },
    HDesplay: {
        type: String
    }
  },

  computed: {},

  data() {
    return {};
  },

  methods: {},

  mounted() {},
};
</script>
