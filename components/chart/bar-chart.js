import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object | Array,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
    data() {
      return {
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                  display: true,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
          legend: {
            display: false,
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
