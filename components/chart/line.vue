<script>
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
  },

  data() {
    return {};
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style lang="scss" scoped>
.line-chart {
  width: 60vw;
}
</style>
