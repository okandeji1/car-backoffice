<template>
  <main>
    <lazy-car-user-header title="Report List" icon="transaction-list" />

    <div id="transaction-filter" class="m-4 bg-primary-btn-tert">
      <lazy-car-user-header size="small" title="Search For Reports" icon="transaction-list" />

      <!-- New Report -->
      <div class="border-b border-primary-divider">
        <div class="md:flex md:items-center md:justify-between md:h-16">
          <div class="grid grid-cols-2 py-4 md:items-center md:flex md:bg-primary-btn-tert bg-primary-sidebar">
            <span class="flex items-center justify-around mx-4 text-sm text-white md:text-primary-default-main">Filter by:</span>
            <div
              class="flex items-center justify-around h-8 text-white md:justify-between md:bg-primary-sidebar flow-row"
              v-for="product in products"
              :key="product.id"
            >
              <button
                @click="selectProduct(product)"
                :class="[isActive == product.slug ? 'browny' : '']"
                class="flex flex-row items-center justify-center px-4 mx-1 text-xs font-semibold rounded-md h-88"
              >
                {{ product.name }}
              </button>
            </div>
          </div>
        </div>
        <div class="px-4">
          <div class="date-transaction">
            <div>
              <div class="date">
                <label class="mb-1 text-sm font-medium" for="transactions-filter-from">Date From</label>
                <a-date-picker name="startDate" :default-value="moment(startFrom)" v-model="query.startDate" />
              </div>
            </div>
            <div>
              <div class="date">
                <label class="mb-1 text-sm font-medium" for="transactions-filter-from">Date To</label>
                <a-date-picker name="endDate" :default-value="moment(startTo)" v-model="query.endDate" />
              </div>
            </div>
            <div>
              <div class="types date">
                <label class="mb-1 text-sm" for="transactions-filter-from">Channel</label>
                <a-select :default-value="channels[0].slug" size="large" class="text-sm text-primary-default-main bg-primary-input">
                  <a-select-option v-for="channel in channels" :key="channel.id" :value="channel.slug"> {{ channel.name }} </a-select-option>
                </a-select>
              </div>
            </div>
            <div>
              <div class="date types">
                <label class="mb-1 text-sm" for="transactions-filter-from">Period</label>
                <a-select
                  :default-value="periods[0].slug"
                  @select="handleSelect"
                  size="large"
                  class="text-sm text-primary-default-main bg-primary-input"
                >
                  <a-select-option v-for="period in periods" :key="period.id" :value="period.slug"> {{ period.name }} </a-select-option>
                </a-select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mx-2 md:flex md:flex-row md:justify-between md:px-2 md:mx-4 button">
        <a-button class="inline w-full my-3 text-white bg-primary-m-danger md:w-40" @click="reset">Reset</a-button>
        <a-button class="inline w-full my-3 text-white md:w-40 bg-primary-m-success" :loading="dataIsLoading">Apply</a-button>
      </div>
    </div>
    <div class="flex items-center justify-between w-full px-3">
      <LazyBetBaseInput placeholder="Search" class="w-2/4 mb-3 md:w-1/4" />
      <lazy-car-export-excel
        :csvData="{
          records: getUsers,
          fileName: 'SALES REPORT',
          source: 'SALES',
          disabled: getUsers ? false : true,
        }"
      />
    </div>
    <div class="px-4" v-if="getSalesReport">
      <a-table v-if="!dataIsLoading" :columns="columns" :data-source="getSalesReport.data" :scroll="{ x: 'calc(700px + 50%)' }" bordered>
        <template slot="role" slot-scope="index, record"> {{ record.role }} </template>
        <template slot="username" slot-scope="index, record"> {{ record.username }} </template>
        <template slot="actualStake" slot-scope="index, record">
          {{ $n(record.actualStake) }}
        </template>
        <template slot="confirmedWinning" slot-scope="index, record">
          {{ $n(record.confirmedWinning) }}
        </template>
        <template slot="grossProfit" slot-scope="index, record">
          {{ $n(record.grossProfit) }}
        </template>
        <template slot="commission" slot-scope="index, record">
          <span>{{ $n(record.commission.value) }}</span>
          <span>{{ record.commission.percentage }}</span>
        </template>
        <template slot="bonus"> 0.00 </template>
        <template slot="jackpot"> 0.00 </template>
      </a-table>

      <lazy-car-skeleton-table v-if="dataIsLoading" :columns="columns"></lazy-car-skeleton-table>
    </div>

    <div class="mx-4 trans-note">
      *Please note, when filtering specific transaction types, the balance shown is equivalent to the balance as at the time of the transaction
      displayed.
    </div>
  </main>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import dayjs from 'dayjs';
import moment from 'moment';

const columns = [
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    scopedSlots: { customRender: 'role' },
    width: '200px',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    scopedSlots: { customRender: 'username' },
    width: '160px',
  },
  {
    title: 'Settled Bets ',
    dataIndex: 'totalActualBets',
    key: 'totalActualBets',
    scopedSlots: { customRender: 'totalActualBets' },
    width: '12.2%',
  },
  {
    title: 'Stake',
    dataIndex: 'actualStake',
    width: '12.2',
    key: 'actualStake',
    scopedSlots: { customRender: 'actualStake' },
  },
  {
    title: 'Winning',
    dataIndex: 'confirmedWinning',
    width: '12.2',
    key: 'confirmedWinning',
    scopedSlots: { customRender: 'confirmedWinning' },
  },
  {
    title: 'Gross Profit',
    dataIndex: 'grossProfit',
    width: '12.2',
    key: 'grossProfit',
    scopedSlots: { customRender: 'grossProfit' },
  },
  {
    title: 'Commission',
    dataIndex: 'commission',
    width: '12.2',
    key: 'commission',
    scopedSlots: { customRender: 'commission' },
  },
  {
    title: 'Bonus',
    dataIndex: 'bonus',
    width: '12.2',
    key: 'bonus',
    scopedSlots: { customRender: 'bonus' },
  },
  {
    title: 'Jackpot',
    dataIndex: 'jackpot',
    width: '12.2',
    key: 'jackpot',
    scopedSlots: { customRender: 'jackpot' },
  },
];

const query = {
  product: 'SPORT',
  startDate: '',
  endDate: '',
};

export default Vue.extend({
  // layout: 'user',
  computed: {
    ...mapGetters({
      getSalesReport: 'user/getSalesReport',
      loggedInUser: 'loggedInUser',
      getUsers: 'user/getUsers',
    }),
  },
  data() {
    return {
      dateFormat: 'YYYY/MM/DD',
      isLoading: false,
      query,
      products: [
        {
          id: 1,
          name: 'All Products',
          slug: 'all-products',
          isActive: true,
        },
        {
          id: 2,
          name: 'Sportbook',
          slug: 'sport',
          isActive: false,
        },
        {
          id: 3,
          name: 'Virtual',
          slug: 'virtual',
          isActive: false,
        },
        {
          id: 4,
          name: 'Casino',
          slug: 'casino',
          isActive: false,
        },
      ],

      periods: [
        {
          id: 1,
          name: 'Manual',
          slug: 'MANUAL',
          isActive: false,
        },
        {
          id: 2,
          name: 'Today',
          slug: 'TODAY',
          isActive: false,
        },
        {
          id: 3,
          name: 'Current Week',
          slug: 'CURRENT_WEEK',
          isActive: true,
        },
        {
          id: 4,
          name: 'Current Month',
          slug: 'CURRENT_MONTH',
          isActive: false,
        },
        {
          id: 5,
          name: 'Yesterday',
          slug: 'YESTERDAY',
          isActive: false,
        },
        {
          id: 6,
          name: 'Last Week',
          slug: 'LAST_WEEK',
          isActive: false,
        },
        {
          id: 7,
          name: 'Last Month',
          slug: 'LAST_MONTH',
          isActive: false,
        },
      ],

      channels: [
        { id: 1, name: 'All', slug: '' },
        { id: 2, name: 'Retail', slug: 'retail' },
        { id: 6, name: 'Online', slug: 'online' },
      ],
      selectedResult: 'All',
      selectedPeriod: 'MANUAL',
      selectedProduct: 'MANUAL',
      dataIsLoading: false,
      isActive: 'sport',
      // isChannelActive: 'sport',
      startTo: moment().format('YYYY-MM-DD'),
      startFrom: moment().day('Monday').format('YYYY-MM-DD'),
      minDate: dayjs().subtract(90, 'days').startOf('isoWeek').format('YYYY-MM-DD'),
      maxDate: dayjs().format('YYYY-MM-DD'),
      currentDate: dayjs().format('YYYY-MM-DD'),
      date: dayjs(),
      header: true,
      columns,
      expandedRowKeys: [],
    };
  },
  methods: {
    dayjs,
    moment,

    onSelect(e) {
      switch (e) {
        case 'TODAY':
          this.query.startDate = moment().startOf('day').format('YYYY-MM-DD');
          this.query.endDate = moment().endOf('day').format('YYYY-MM-DD');

          return;
        case 'YESTERDAY':
          this.query.startDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
          this.query.endDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
          return;
        case 'CURRENT_WEEK':
          this.query.startDate = moment().day('Monday').format('YYYY-MM-DD');
          this.query.endDate = moment().format('YYYY-MM-DD');
          return;
        case 'LAST_WEEK':
          this.query.startDate = moment().subtract(1, 'week').startOf('week').add(1, 'days').format('YYYY-MM-DD');
          this.query.endDate = moment().subtract(1, 'week').endOf('week').add(1, 'days').format('YYYY-MM-DD');
          return;
        case 'CURRENT_MONTH':
          this.query.startDate = moment().startOf('month').format('YYYY-MM-DD');
          this.query.endDate = moment().format('YYYY-MM-DD');
          return;
        case 'LAST_MONTH':
          this.query.startDate = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
          this.query.endDate = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
          return;
        default:
          this.query.startDate = this.startFrom;
          this.query.endDate = this.startTo;
        // this.getSalesReportApi({ query: { product: query.product } });
      }
    },

    handleSelect(slug) {
      switch (slug) {
        case 'TODAY':
          this.query.startDate = moment().startOf('day').format('YYYY-MM-DD');
          this.query.endDate = moment().endOf('day').format('YYYY-MM-DD');
          this.selectedPeriod = slug;
          return;
        case 'YESTERDAY':
          this.query.startDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
          this.query.endDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
          this.selectedPeriod = slug;
          return;
        case 'CURRENT_WEEK':
          this.query.startDate = moment().day('Monday').format('YYYY-MM-DD');
          this.query.endDate = moment().format('YYYY-MM-DD');
          this.selectedPeriod = slug;
          return;
        case 'LAST_WEEK':
          this.query.startDate = moment().subtract(1, 'week').startOf('week').add(1, 'days').format('YYYY-MM-DD');
          this.query.endDate = moment().subtract(1, 'week').endOf('week').add(1, 'days').format('YYYY-MM-DD');
          this.selectedPeriod = slug;
          return;
        case 'CURRENT_MONTH':
          this.query.startDate = moment().startOf('month').format('YYYY-MM-DD');
          this.query.endDate = moment().format('YYYY-MM-DD');
          this.selectedPeriod = slug;
          return;
        case 'LAST_MONTH':
          this.query.startDate = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
          this.query.endDate = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
          this.selectedPeriod = slug;
          return;
        default:
          this.query.startDate = this.startFrom = moment().format('YYYY-MM-DD');
          this.query.endDate = this.startTo = moment().format('YYYY-MM-DD');
          this.selectedPeriod = slug;
        // this.getSalesReportApi({ query: { product: query.product } });
      }
    },

    selectProduct(product) {
      this.isActive = product.slug;
      // this.selectedProduct = product;
    },

    selectStatus(result) {
      this.selectedResult = result.slug;
    },

    async salesReport() {
      this.dataIsLoading = true;
      if (this.query.startDate === '') {
        this.query.startDate = this.startFrom;
      }

      if (this.query.endDate === '') {
        this.query.endDate = this.startTo;
      }
      this.query.startDate = moment(this.query.startDate).format('YYYY-MM-DD');
      this.query.endDate = moment(this.query.endDate).format('YYYY-MM-DD');
      try {
        await this.getSalesReportApi({ query: this.query });
      } catch (error) {
      } finally {
        this.dataIsLoading = false;
      }
    },
    reset() {
      this.isActive = 'sport';
      this.query.startDate = this.startFrom;
      this.query.endDate = this.startTo;
      this.handleSelect('TODAY');
      // this.getSalesReportApi({ query: { product: query.product } });
    },

    ...mapMutations({
      checkBetSlip: 'bet/checkBetSlip',
      setParent: 'user/setParent',
    }),

    ...mapActions({
      getSalesReportApi: 'user/getSalesReportApi',
    }),
  },

  mounted() {
    // this.$nextTick(() => {
    //   this.getSalesReportApi({ query: { product: query.product } });
    // });
  },
});
</script>
<style lang="scss" scoped>
.ant-input {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum', 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  height: 40px;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
  transition: all 0.3s;
}
.ant-form-item-label,
.ant-form-item-control-wrapper {
  display: block;
  width: 15rem;
}
.ant-calendar-picker {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum', 'tnum';
  position: relative;
  display: inline-block;
  outline: none;
  cursor: text;
  transition: opacity 0.3s;
  width: 100%;
}

.ant-calendar-picker-input.ant-input {
  height: 40px;
}

.form-row {
  border-bottom: 1px solid #dbdada;
  min-height: 22px;
}

.form-row .control-label {
  max-width: 35%;
  text-align: right;
  font-size: 14px;
}

.form-row label,
.form-row .periods-container {
  flex: 1;
}

.ant-select-arrow {
  @apply fill-current text-primary-default-main;
}

.checkbox-container {
  max-width: 530px;
}

.radio-button > div {
  flex-basis: 33.3%;
}

.submitPlace {
  background: #1a2633;
}

.no-results-container .no-results-header {
  background: #eeb941;
  color: #000;
  padding: 5px 10px;
  border-bottom: 1px solid #f4f4f4;
  font-size: 12px;
}
.no-results-container .no-results-body {
  background: #1a2633;
  color: #fff;
  padding: 14px 10px;
  font-size: 12px;
}

.h-88 {
  height: 88%;
}

.date {
  display: flex;
  flex-direction: column;
  justify-content: unset;
  align-items: unset;
  height: 100%;
  width: 100%;
}

.types .ant-select-selection {
  // border: 1px solid #d9d9d9;
  border-top-width: 1.02px;
  border-radius: 0.5rem;
  @apply bg-primary-input;
}

.t-head {
  background-color: #303a4d;
  border-right: 1px solid #374562;
  color: #fff;
  padding: 0 8px;
  text-align: left;
  font-size: 13px;
  height: 30px;
}

.t-row {
  color: #374562;
  font-size: 13px;
  font-weight: 600;
  height: 38px;
  background: #eef2fa;
  border-right: 1px solid #bec7da;
  border-bottom: 1px solid #bec7da;
}

.t-row > td {
  border-right: 1pt solid #d5dbe5;
  border-bottom: 1pt solid #d5dbe5;
  color: #374562;
  padding: 6px 8px;
}

.t-row:nth-child(odd) {
  background: #eef2fa;
}

.browny {
  @apply border bg-primary-m-warning border-primary-m-warning  text-white;
}

.no-trans {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 70px;
  font-size: 15px;
}

.td-skele {
  background-color: #fff;
  border-right: 1pt solid #d5dbe5;
  border-bottom: 1pt solid #d5dbe5;
  color: #374562;
  font-weight: 500;
  padding: 6px 8px;
}

.tran-skele {
  display: flex;
  flex-direction: row;
  // justify-content: flex-start;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  min-height: 46px;
}

.skele-bar {
  width: 130px;
  background-color: #f2f2f2;
  height: 10px;
  border-radius: 2px;
  overflow: hidden;
}

.skele-bar::before {
  display: block;
  content: '';
  width: 130px;
  height: 10px;
  background: linear-gradient(90deg, #dedcdc, #b2b2b2, #dedcdc);
  transform: translateX(-100%);
  animation-name: heart;
  animation-delay: 0.25s;
  animation-duration: 1.3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
}

@keyframes heart {
  40%,
  to {
    transform: translateX(100%);
  }
}

.expand-parent {
  background-color: #f44336;
}

table > tbody > tr.expand-parent:hover {
  background-color: #f44336;
}
</style>
