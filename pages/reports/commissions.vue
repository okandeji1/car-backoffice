<template>
  <main>
    <lazy-car-user-header title="Commissions" icon="transaction-list" />

    <div id="transaction-filter" class="m-4 bg-primary-btn-tert">
      <lazy-car-user-header size="small" title="Search For Commissions" icon="transaction-list" />

      <div class="pt-4 border-b border-primary-divider">
        <div class="md:flex md:items-center md:justify-between md:h-16">
          <div class="grid grid-cols-2 md:items-center md:flex md:bg-primary-btn-tert bg-primary-btn-tert">
            <span class="flex items-center justify-around mx-4 text-sm text-white md:text-primary-default-main">Filter by:</span>
            <div
              class="flex items-center justify-around text-white h-15 md:justify-between md:bg-primary-sidebar flow-row"
              v-for="commissionType in commissionTypes"
              :key="commissionType.id"
            >
              <button
                @click="onSelect(commissionType)"
                :class="[isActive == commissionType.slug ? 'browny' : '']"
                class="flex flex-row items-center justify-center px-4 mx-1 text-xs font-semibold rounded-md h-88"
              >
                {{ commissionType.name }}
              </button>
            </div>
          </div>
        </div>
        <div class="px-4 py-4">
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
          </div>
        </div>
      </div>

      <div>
        <div class="grid grid-cols-2 gap-4 mx-2 md:flex md:flex-row md:justify-between md:px-2 md:mx-4 button">
          <a-button class="inline w-full my-3 text-white bg-primary-m-danger md:w-40">Reset</a-button>
          <a-button class="inline w-full my-3 text-white md:w-40 bg-primary-m-success">Apply</a-button>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between w-full px-3">
      <LazyBetBaseInput placeholder="Search" class="w-2/4 mb-3 md:w-1/4" />
      <lazy-car-export-excel
        :csvData="{
          records: getUsers,
          fileName: 'COMMISSIONS REPORT',
          source: 'COMMISSIONS',
          disabled: getUsers ? false : true,
        }"
      />
    </div>

    <div class="px-4" v-if="data">
      <a-table :columns="columns" :data-source="data" :scroll="{ x: 'calc(700px + 50%)' }"> </a-table>

      <lazy-car-skeleton-table v-if="dataIsLoading" :columns="columns"></lazy-car-skeleton-table>

      <div class="mx-4 trans-note">
        *Please note, when filtering specific transaction types, the balance shown is equivalent to the balance as at the time of the transaction
        displayed.
      </div>
    </div>
  </main>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import dayjs from 'dayjs';
import moment from 'moment';

const query = {
  aggregate: true,
  startDate: '',
  endDate: '',
};

const data = [
  {
    key: 1,
    product: 'Sportbook',
    settleBet: '339',
    stake: '4000',
    winnings: '4,564,341',
    grossProfit: '-3,212,421',
    commission: '202',
    bonus: '0',
    jackpot: '0',
    children: [
      {
        key: 10,
        product: 'Product One',
        settleBet: '339',
        stake: '4000',
        winnings: '4,564,341',
        grossProfit: '-3,212,421',
        commission: '202',
        bonus: '0',
        jackpot: '',
      },
    ],
  },
  {
    key: 2,
    product: 'Casino',
    settleBet: '339',
    stake: '4000',
    winnings: '4,564,341',
    grossProfit: '-3,212,421',
    commission: '202',
    bonus: '0',
    jackpot: '0',
    children: [
      {
        key: 11,
        product: 'Product One',
        settleBet: '339',
        stake: '4000',
        winnings: '4,564,341',
        grossProfit: '-3,212,421',
        commission: '202',
        bonus: '0',
        jackpot: '',
      },
    ],
  },
  {
    key: 3,
    product: 'Product One',
    settleBet: '339',
    stake: '4000',
    winnings: '4,564,341',
    grossProfit: '-3,212,421',
    commission: '202',
    bonus: '0',
    jackpot: '0',
    children: [
      {
        key: 12,
        product: 'Product One',
        settleBet: '339',
        stake: '4000',
        winnings: '4,564,341',
        grossProfit: '-3,212,421',
        commission: '202',
        bonus: '0',
        jackpot: '',
      },
    ],
  },
];

const columns = [
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Settled Bets ',
    dataIndex: 'settleBet',
    key: 'settleBet',
    width: '12.2%',
  },
  {
    title: 'Stake',
    dataIndex: 'stake',
    width: '12.2',
    key: 'stake',
  },
  {
    title: 'Winning',
    dataIndex: 'winnings',
    width: '12.2',
    key: 'winnings',
  },
  {
    title: 'Gross Profit',
    dataIndex: 'grossProfit',
    width: '12.2',
    key: 'grossProfit',
  },
  {
    title: 'Commission',
    dataIndex: 'commission',
    width: '12.2',
    key: 'commission',
  },
  {
    title: 'Bonus',
    dataIndex: 'bonus',
    width: '12.2',
    key: 'bonus',
  },
  {
    title: 'Jackpot',
    dataIndex: 'jackpot',
    width: '12.2',
    key: 'jackpot',
  },
];

export default Vue.extend({
  // layout: 'user',
  middleware: 'auth',
  computed: {
    ...mapGetters({
      getTransactions: 'user/getTransactions',
      loggedInUser: 'loggedInUser',
      getUsers: 'user/getUsers',
    }),
  },
  data() {
    return {
      dateFormat: 'YYYY/MM/DD',
      dataIsLoading: false,
      commissionTypes: [
        {
          id: 1,
          name: 'Agent Commission',
          slug: 'agent-commission',
          isActive: true,
        },
        {
          id: 2,
          name: 'Sport Commission Estimate',
          slug: 'sport-commission-estimate',
          isActive: false,
        },
        {
          id: 3,
          name: 'Virtual Product One Commission',
          slug: 'virtua-product-one-commission',
          isActive: false,
        },
        {
          id: 4,
          name: 'Virtual Product Two Commission',
          slug: 'virtua-product-two-commission',
          isActive: false,
        },
        {
          id: 5,
          name: 'Virtual Product Three Commission',
          slug: 'virtua-product-three-commission',
          isActive: false,
        },
      ],

      results: [
        { id: 1, name: 'All', slug: '' },
        { id: 2, name: 'Running', slug: 'running' },
        { id: 6, name: 'Won', slug: 'won' },
        { id: 5, name: 'Partial Won', slug: 'partial_won' },
        { id: 3, name: 'Lost', slug: 'lost' },
        { id: 4, name: 'Void', slug: 'void' },
        { id: 7, name: 'Cancelled', slug: 'cancelled' },
      ],

      // columns: [
      //   {
      //     couponId: '5B52-36B-4D48',
      //     date: '11/29/2021',
      //     dateOfResult: '08/03/2021',
      //     amount: 'N25 576',
      //     status: 'False',
      //     winning: 'N61 837',
      //     user: 'Cathleen Bolton',
      //     class: 'text-left w-3/20',
      //   },
      //   {
      //     couponId: '0411-4CD-A9FB',
      //     date: '03/27/2022',
      //     dateOfResult: '01/23/2022',
      //     amount: 'N69 836',
      //     status: 'False',
      //     winning: 'N19 435',
      //     user: 'Whitney Spears',
      //     class: 'text-left w-3/20',
      //   },
      //   {
      //     couponId: 'AFF3-FC7-F89B',
      //     date: '05/05/2022',
      //     dateOfResult: '12/15/2020',
      //     amount: 'N59 913',
      //     status: 'False',
      //     winning: 'N6 324',
      //     user: 'Troy Everett',
      //     class: 'text-left w-2/5',
      //   },
      //   {
      //     couponId: 'AFF3-FC7-F89B',
      //     date: '05/05/2022',
      //     dateOfResult: '12/15/2020',
      //     amount: 'N59 913',
      //     status: 'False',
      //     winning: 'N6 324',
      //     user: 'Troy Everett',
      //     class: 'text-left w-3/20',
      //   },
      //   {
      //     couponId: 'AFF3-FC7-F89B',
      //     date: '05/05/2022',
      //     dateOfResult: '12/15/2020',
      //     amount: 'N59 913',
      //     status: 'False',
      //     winning: 'N6 324',
      //     user: 'Troy Everett',
      //     class: 'text-left w-3/20',
      //   },
      // ],
      tableHeader: [
        {
          id: 1,
          class: 't-head',
          title: 'ID',
        },
        {
          id: 2,
          class: 't-head text-center',
          title: 'Date',
        },
        {
          id: 3,
          class: 't-head text-left ',
          title: 'Description',
        },
        {
          id: 4,
          class: 't-head text-right',
          title: 'Debit',
        },
        {
          id: 5,
          class: 't-head text-right',
          title: 'Credit',
        },
      ],
      selectedResult: '',
      selectedCommissionType: '',
      isActive: 'agent-commission',
      startTo: moment().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD'),
      startFrom: moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'),
      minDate: dayjs().subtract(90, 'days').startOf('isoWeek').format('YYYY-MM-DD'),
      maxDate: dayjs().format('YYYY-MM-DD'),
      currentDate: dayjs().format('YYYY-MM-DD'),
      date: dayjs(),
      header: true,
      data,
      columns,

      query,
      expandedRowKeys: [],
    };
  },
  methods: {
    dayjs,
    moment,

    onSelect(e) {
      switch (e.slug) {
        case 'TODAY':
          this.query.startDate = moment().startOf('day').format('YYYY-MM-DD');
          this.query.endDate = moment().endOf('day').format('YYYY-MM-DD');
          this.isActive = e.slug;
          return;
        case 'YESTERDAY':
          this.query.startDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
          this.query.endDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
          this.isActive = e.slug;
          return;
        case 'CURRENT_WEEK':
          this.query.startDate = moment().day('Monday').format('YYYY-MM-DD');
          this.query.endDate = moment().format('YYYY-MM-DD');
          this.isActive = e.slug;
          return;
        case 'LAST_WEEK':
          this.query.startDate = moment().subtract(1, 'week').startOf('week').add(1, 'days').format('YYYY-MM-DD');
          this.query.endDate = moment().subtract(1, 'week').endOf('week').add(1, 'days').format('YYYY-MM-DD');
          this.isActive = e.slug;
          return;
        case 'CURRENT_MONTH':
          this.query.startDate = moment().startOf('month').format('YYYY-MM-DD');
          this.query.endDate = moment().format('YYYY-MM-DD');
          this.isActive = e.slug;
          return;
        case 'LAST_MONTH':
          this.query.startDate = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
          this.query.endDate = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
          this.isActive = e.slug;
          return;
        default:
          this.query.startDate = this.startFrom = moment().format('YYYY-MM-DD');
          this.query.endDate = this.startTo = moment().format('YYYY-MM-DD');
          this.isActive = e.slug;
        // this.getSalesReportApi({ query: { product: query.product } });
      }
    },

    selectCommissionType(commissionType) {
      this.isActive = commissionType.slug;
      this.selectedCommissionType = commissionType;
    },
    selectStatus(result) {
      this.selectedResult = result.slug;
    },

    ...mapMutations({
      checkBetSlip: 'bet/checkBetSlip',
      setParent: 'user/setParent',
    }),

    ...mapActions({
      getTransactionsApi: 'user/getTransactionsApi',
    }),
  },

  mounted() {
    this.$nextTick(() => {
      this.getTransactionsApi('query');
    });
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
  height: 32px;
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

.h-15 {
  height: 4rem !important;
}
</style>
