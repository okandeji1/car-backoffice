<template>
  <div>
    <table class="w-full border-collapse overview_table">
      <thead>
        <tr class="text-white bg-primary-sec-alt">
          <th v-for="(th, index) in tableHeader" :key="index" class="text-left">
            <span> {{ th.title }}</span>
            <svg-icon name="sort" class="inline-block w-3 h-3 fill-current"></svg-icon>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="td in tableData" :key="td.id">
          <td class="text-left">
            <a-button ghost class="text-blue-500 border-0" @click="showSelections(td)">{{ td.ticketId }}</a-button>
          </td>
          <td class="text-left">{{ moment(td.createdAt).format('Do MMM, YYYY HH:mm') }}</td>
          <td class="text-left">{{ moment(td.date).format('Do MMM, YYYY HH:mm') }}</td>
          <td class="text-left">{{ $n(td.betslip.totalStake) }}</td>
          <td class="text-left">{{ td.status }}</td>
          <td class="text-left" v-if="td.betslip.confirmedWinning">{{ $n(td.betslip.confirmedWinning.totalWinning) }}</td>
          <td class="text-left">{{ td.bettor }}</td>
        </tr>
      </tbody>
    </table>

    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      class="drawer"
      width="456"
    >
      <button class="flex focus:outline-none close" @click="onClose">
        <i class="fas fa-times"></i>
      </button>

      <a-collapse v-model="activeKey">
        <a-collapse-panel key="1" header="Bet Details">
          <div v-if="bet">
            <lazy-car-pool-bet-detail-top :bet="bet" />
          </div>
        </a-collapse-panel>

        <a-collapse-panel key="2" header="Events" :disabled="false">
          <div v-if="betSelections !== null">
            <div v-for="(selection, index) in betSelections" :key="index">
              <lazy-car-pool-bet-detail-bottom :selection="selection" />
            </div>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </a-drawer>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: {
    columns: {
      type: Array,
      required: true,
      default: [],
    },
    entries: {},
  },
  data() {
    return {
      betSelections: null,
      visible: false,
      bet: null,
      activeKey: ['1', '2'],
    };
  },
  computed: {
    tableHeader() {
      return this.columns;
    },
    tableData() {
      return this.entries;
    },
  },
  methods: {
    moment,

    showSelections(bet) {
      this.betSelections = bet.selections;
      this.bet = bet;
      this.visible = !this.visible;
    },
    afterVisibleChange(val) {},

    showDrawer() {
      this.visible = true;
    },

    onClose() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.ant-table td {
  white-space: nowrap;
}

.first_admin {
  min-height: 120px;
}

.quick_table {
  min-height: 120px;
}

.quick_look {
  width: 210px;
}

.overview_table,
.download_table {
  font-size: 12px;
}

.overview_table td,
.overview_table th,
.download_table td,
.download_table th {
  border: 1px solid #dbdada;
  padding: 2px 8px;
}

.overview_table tr:nth-child(even),
.download_table tr:nth-child(even) {
  background: #f4f4f4;
}

.quick_table td,
.quick_table th {
  border: 1px solid #dbdada;
}
</style>
