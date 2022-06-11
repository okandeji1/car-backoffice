import Vue from 'vue';
import { Bar, Doughnut, Line, Pie, PolarArea } from 'vue-chartjs';

const registerComponent = function (name, originalComponent) {
  Vue.component(name, {
    extends: originalComponent,
    props: ['data', 'options'],
    mounted() {
      this.renderChart(this.data, this.options);
    },
  });
};

registerComponent('bar-chart', Bar);
registerComponent('doughnut-chart', Doughnut);
registerComponent('line-chart', Line);
registerComponent('pie-chart', Pie);
registerComponent('polar-area', PolarArea);
