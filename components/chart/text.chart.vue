<template>
  <div>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, dolores.</p>

    <SalesChart :chart-data="dataCollection"></SalesChart>
  </div>
</template>

<script>
import SalesChart from './sales-chart.js';
export default {
  data() {
    return {
      dataCollection: null,
      loading: false,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.dataCollection = {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        dataSets: [
          {
            label: 'Temp (C)',
            backgroundColor: '#e8f3ff',
            borderColor: 'lightblue',
            pointBackgroundColor: 'blue',
            borderWidth: 1,
            pointBorderColor: 'blue',
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
