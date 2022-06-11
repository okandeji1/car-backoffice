<template>
  <main>
    <lazy-car-user-header title="Transaction List" icon="transaction-list" />

    <div id="transaction-filter" class="m-4 bg-primary-btn-tert">
      <lazy-car-user-header size="small" title="Search For transactions" icon="transaction-list" />

      <div class="border-b border-primary-divider">
        <div class="md:flex md:items-center md:justify-between md:h-16">
          <div class="grid grid-cols-2 py-4 md:items-center md:flex md:bg-primary-btn-tert bg-primary-sidebar">
            <span class="flex items-center justify-around mx-4 text-sm text-white md:text-primary-default-main">Filter by:</span>
            <div
              class="flex items-center justify-around h-8 text-white md:justify-between md:bg-primary-sidebar flow-row"
              v-for="period in periods"
              :key="period.id"
            >
              <button
                @click="onSelect(period)"
                :class="[isActive == period.slug ? 'browny' : '']"
                class="flex flex-row items-center justify-center px-4 mx-1 text-xs font-semibold rounded-md h-88"
              >
                {{ period.name }}
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
                <label class="mb-1 text-sm" for="transactions-filter-from">Transaction Type</label>
                <a-select :default-value="transactionTypes[0].slug" v-model="query.type" class="text-sm bg-primary-input">
                  <a-select-option v-for="transaction in transactionTypes" :key="transaction.id" :value="transaction.slug">
                    {{ transaction.name }}
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <div>
              <div class="date types">
                <label class="mb-1 text-sm" for="transactions-filter-from">Products</label>
                <a-select :default-value="products[0].slug" v-model="selectedProduct" class="text-sm bg-primary-input">
                  <a-select-option v-for="product in products" :key="product.id" :value="product.slug"> {{ product.name }} </a-select-option>
                </a-select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="grid grid-cols-2 gap-4 mx-2 md:flex md:flex-row md:justify-between md:px-2 md:mx-4 button">
          <a-button class="inline w-full my-3 bg-primary-m-danger md:w-40 text-white" @click="reset">Reset</a-button>
          <a-button class="inline w-full my-3 md:w-40 text-white bg-primary-m-success" @click="transaction" :loading="dataIsLoading">Apply</a-button>
        </div>
      </div>
    </div>

    <div class="m-4 transaction-table">
      <div v-if="getTransactions">
        <LazyBetBaseInput placeholder="Search Transaction" class="w-2/4 mb-3 md:w-1/4" />
        <a-table
          :columns="columns"
          v-if="!dataIsLoading"
          :data-source="getTransactions.data"
          :scroll="{ x: 'calc(700px + 50%)' }"
          :pagination="{ defaultPageSize: 10, size: 'small', showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100'] }"
          bordered
        >
          <template slot="createdAt" slot-scope="index, record">
            <span>
              {{ moment(record.createdAt).format('Do MMM, YYYY HH:mm') }}
            </span>
          </template>
          <template slot="status" slot-scope="index, record">
            <span class="flex items-center justify-center text-primary-green">
              <svg-icon :name="record.status.toLowerCase()" class="inline w-4 h-4 fill-current"></svg-icon>
            </span>
          </template>
          <template slot="ticketId" slot-scope="index, record">
            <span v-if="record.transactionData" class="cursor-pointer text-primary-bg-sec" @click="showSelection(record.transactionData)">
              {{ record.transactionData.ticketId }}
            </span>
          </template>
          <template slot="credit" slot-scope="index, record">
            <span class="font-semibold text-primary-green">
              {{ record.narration.includes('transfer') || record.narration.includes('winnings') ? $n(record.amount.toFixed(2)) : null }}
            </span>
          </template>
          <template slot="debit" slot-scope="index, record">
            <span class="font-semibold text-red-700">
              {{ record.narration.includes('withdrawal') || record.narration.includes(`bet of ${record.amount} placed`) ? record.amount : null }}
            </span>
          </template>
          <!-- <template slot="senderHistory" slot-scope="index, record">
            <span v-if="record.beneficiaryHistory || record.senderHistory">
              {{
                record.narration.includes('transfer') || record.narration.includes('winnings')
                  ? $n(record.beneficiaryHistory.balanceAfter.toFixed(2))
                  : $n(record.senderHistory.balanceAfter.toFixed(2))
              }}
            </span>
            <span v-else> N/A </span>
          </template> -->
          <template slot="senderHistory" slot-scope="index, record">
            <span v-if="record.beneficiaryHistory || record.senderHistory">
              {{
                record.narration.includes('transfer') || record.narration.includes('winnings')
                  ? $n(record.beneficiaryHistory.balanceAfter.toFixed(2))
                  : $n(record.senderHistory.balanceAfter.toFixed(2))
              }}
            </span>
            <span v-else> N/A </span>
          </template>
        </a-table>

        <lazy-car-skeleton-table v-if="dataIsLoading" :columns="columns"></lazy-car-skeleton-table>
      </div>
    </div>

    <div class="mx-4 trans-note">
      *Please note, when filtering specific transaction types, the balance shown is equivalent to the balance as at the time of the transaction
      displayed.
    </div>

    <a-drawer
      placement="right"
      :visible="visible"
      @close="onClose"
      class="drawer"
      :width="450"
      :headerStyle="{
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        height: '60px',
        width: '100%',
        background: '#fff',
      }"
      :body-style="{ paddingBottom: '60px', paddingTop: '70px' }"
    >
      <!-- <button class="flex focus:outline-none close" @click="onClose">
        <i class="fas fa-times"></i>
      </button> -->

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
  </main>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import dayjs from 'dayjs';
import moment from 'moment';

const query = {
  startDate: '',
  endDate: '',
  type: '',
};

export default Vue.extend({
  // layout: 'user',
  middleware: 'auth',
  computed: {
    ...mapGetters({
      getTransactions: 'user/getTransactions',
      loggedInUser: 'loggedInUser',
    }),
  },
  data() {
    return {
      query,
      dateFormat: 'YYYY/MM/DD',
      dataIsLoading: false,

      isLoading: false,
      visible: false,
      betSelections: null,
      bet: [],
      activeKey: ['1', '2'],

      dataIsLoading: false,
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
      products: [
        { id: 1, name: 'Sport', slug: 'SPORT' },
        { id: 2, name: 'Virtual', slug: 'VIRTUAL' },
      ],
      transactionTypes: [
        { id: 1, name: 'Wallet Transfer', slug: 'WALLET_TRANSFER' },
        { id: 2, name: 'Commission', slug: 'COMMISSION_PAYMENT' },
        { id: 3, name: 'Winnings', slug: 'BET_WINNING_PAYMENT' },
        { id: 4, name: 'Bank Transfer', slug: 'BANK_TRANSFER' },
        { id: 5, name: 'Account Transfer', slug: 'ACCOUNT_TRANSFER' },
      ],

      columns: [
        { id: 1, name: 'reference', dataIndex: 'reference', key: 'reference', title: 'Reference Id' },
        { id: 2, name: 'createdAt', dataIndex: 'createdAt', key: 'createdAt', title: 'Date', scopedSlots: { customRender: 'createdAt' } },
        { id: 3, name: 'narration', dataIndex: 'narration', key: 'narration', title: 'Description', scopedSlots: { customRender: 'narration' } },
        {
          id: 4,
          name: 'ticketId',
          dataIndex: 'ticketId',
          key: 'ticketId',
          title: 'Coupon Id',
          scopedSlots: { customRender: 'ticketId' },
        },
        {
          id: 5,
          name: 'credit',
          dataIndex: 'credit',
          key: 'credit',
          title: 'Credit',
          scopedSlots: { customRender: 'credit' },
        },
        {
          id: 6,
          name: 'debit',
          dataIndex: 'debit',
          key: 'debit',
          title: 'Debit',
          scopedSlots: {
            customRender: 'debit',
          },
        },
        {
          id: 7,
          name: 'status',
          dataIndex: 'status',
          key: 'status',
          title: 'Status',
          scopedSlots: {
            customRender: 'status',
          },
        },
        {
          id: 8,
          name: 'balance',
          dataIndex: 'senderHistory',
          key: 'balance',
          title: 'Balance',
          scopedSlots: { customRender: 'senderHistory' },
        },
      ],

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
      selectedProduct: '',
      isActive: 'TODAY',
      startTo: moment().format('YYYY-MM-DD'),
      startFrom: moment().day('Monday').format('YYYY-MM-DD'),
      minDate: dayjs().subtract(90, 'days').startOf('isoWeek').format('YYYY-MM-DD'),
      maxDate: dayjs().format('YYYY-MM-DD'),
      currentDate: dayjs().format('YYYY-MM-DD'),
      date: dayjs(),
      header: true,
    };
  },
  methods: {
    dayjs,
    moment,

    onClose() {
      this.visible = false;
    },

    async transaction() {
      this.dataIsLoading = true;

      let q = { limit: 500 }; // FIXME: Remove when date filter is working in backend

      if (this.query.startDate === '') {
        this.query.startDate = this.startFrom;
      }

      if (this.query.endDate === '') {
        this.query.endDate = this.startTo;
      }

      if (this.query.type) {
        q.type = this.query.type;
      }
      // q.startDate = moment(this.query.startDate).format('YYYY-MM-DD');
      // q.endDate = moment(this.query.endDate).format('YYYY-MM-DD');
      try {
        await this.getTransactionsApi({ query: q });
      } catch (error) {
      } finally {
        this.dataIsLoading = false;
      }
    },
    async showSelection(selection) {
      try {
        const res = await this.$axios.$get(`/api/v1/sportbook/pool/bas/bets/${selection.ticketId}`);
        this.betSelections = res.data.selections;
        this.bet = res.data;
        this.visible = !this.visible;
      } catch (error) {}
    },
    reset() {
      this.getTransactionsApi('query');
    },

    selectStatus(result) {
      this.selectedResult = result.slug;
    },

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
          this.query.startDate = this.startFrom;
          this.query.endDate = this.startTo;
          this.isActive = e.slug;
        // this.getSalesReportApi({ query: { product: query.product } });
      }
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
      this.getTransactionsApi({ query: { limit: 100 } });
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
</style>
