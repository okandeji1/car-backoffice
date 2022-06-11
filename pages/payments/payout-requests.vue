<template>
  <main>
    <lazy-car-user-header title="Payments" icon="transaction-list" />

    <div id="transaction-filter" class="m-4 bg-primary-btn-tert">
      <lazy-car-user-header size="small" title="Search For Payout request" icon="transaction-list" />

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
                <label class="mb-1 text-sm" for="transactions-filter-from">Status</label>
                <a-select :default-value="statuses[0].slug" v-model="query.status" class="text-sm bg-primary-input">
                  <a-select-option v-for="status in statuses" :key="status.id" :value="status.slug"> {{ status.name }} </a-select-option>
                </a-select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mx-2 md:flex md:flex-row md:justify-between md:px-2 md:mx-4 button">
        <a-button class="inline w-full my-3 text-white bg-primary-m-danger md:w-40">Reset</a-button>
        <a-button class="inline w-full my-3 text-white md:w-40 bg-primary-m-success">Apply</a-button>
      </div>
    </div>

    <div class="m-4 transaction-table">
      <div class="flex flex-col items-center justify-between w-full px-3 py-2 md:flex-row">
        <div class="flex flex-col justify-between mb-3 md:flex-row">
          <a-button type="button" class="w-full mr-2 text-white bg-primary-m-warning" @click="cueItems('APPROVE')"> Approve Items </a-button>
          <a-button
            type="button"
            class="w-full mr-2 text-white bg-primary-m-info"
            @click="cueItems('APPROVE-ALL')"
            :disabled="getPayoutRequests.data.length === 0"
          >
            Approve All
          </a-button>
          <a-button type="button" class="w-full text-white bg-primary-m-danger" @click="setModalVisible(true)"> Decline Items </a-button>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="getPayoutRequests.data"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :scroll="{ x: 'calc(700px + 50%)' }"
        :pagination="{
          position: 'top',
          defaultPageSize: 10,
          size: 'small',
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        }"
        bordered
      >
        <template slot="createdAt" slot-scope="index, record">
          <span>
            {{ moment(record.createdAt).format('Do MMM, YYYY HH:mm') }}
          </span>
        </template>
        <template slot="sender" slot-scope="index, record">
          <span>
            {{ record.sender }}
          </span>
        </template>
        <template slot="paymentGateway" slot-scope="index, record">
          <span>
            {{ record.paymentGateway }}
          </span>
        </template>
        <template slot="amount" slot-scope="index, record">
          <span>
            {{ record.amount }}
          </span>
        </template>
        <template slot="status" slot-scope="index, record">
          <span>
            {{ record.status }}
          </span>
        </template>
      </a-table>
    </div>

    <a-modal title="Decline Comment" :dialog-style="{ top: '20px' }" :visible="modalVisible" @ok="onModalOk" @cancel="() => setModalVisible(false)">
      <div class="grid grid-cols-1 gap-5">
        <div class="flex flex-col w-full">
          <div class="mt-4 input-field">
            <label class="mb-1 text-xs font-semibold text-text-default">Comment </label>
            <a-input placeholder="Enter comment" v-model="comment" />
          </div>
        </div>
      </div>
    </a-modal>
  </main>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import dayjs from 'dayjs';
import moment from 'moment';
import { notify } from '~/utils/utils';

const query = {
  startDate: '',
  endDate: '',
  type: 'BANK_TRANSFER',
  status: 'ALL',
  username: '',
};

export default Vue.extend({
  // layout: 'user',
  middleware: 'user',
  computed: {
    ...mapGetters({
      getPayoutRequests: 'user/getPayoutRequests',
      loggedInUser: 'loggedInUser',
    }),
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  data() {
    return {
      query,
      comment: '',
      modalVisible: false,
      selectedRowKeys: [],
      selectedRows: [],
      dateFormat: 'YYYY/MM/DD',
      isLoading: false,
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
      statuses: [
        { id: 1, name: 'All', slug: 'ALL' },
        { id: 6, name: 'Approved', slug: 'APPROVED' },
        { id: 5, name: 'Declined', slug: 'DECLINED' },
        { id: 3, name: 'Pending', slug: 'PENDING' },
      ],
      types: [
        { id: 1, name: 'All', slug: '' },
        { id: 2, name: 'Deposit', slug: 'deposit' },
        { id: 6, name: 'Withdrawal', slug: 'withdrawal' },
      ],
      columns: [
        { name: 'reference', dataIndex: 'reference', key: 'reference', title: 'Reference' },
        { name: 'sender', dataIndex: 'sender', key: 'sender', title: 'Sender', scopedSlots: { customRender: 'sender' } },
        { name: 'amount', dataIndex: 'amount', key: 'amount', title: 'Amount', scopedSlots: { customRender: 'amount' } },
        {
          name: 'gateway',
          dataIndex: 'gateway',
          key: 'gateway',
          title: 'Gateway',
          scopedSlots: { customRender: 'gateway' },
        },
        { name: 'status', dataIndex: 'status', key: 'status', title: 'Status', scopedSlots: { customRender: 'status' } },
        { name: 'createdAt', dataIndex: 'createdAt', key: 'createdAt', title: 'Date', scopedSlots: { customRender: 'createdAt' } },
      ],
      selectedResult: '',
      isActive: 'TODAY',
      startTo: moment().format('YYYY-MM-DD'),
      startFrom: moment().day('Monday').format('YYYY-MM-DD'),
      status: '',
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
    async cueItems(action) {
      if ((action === 'APPROVE' || action === 'DECLINE') && this.selectedRowKeys.length === 0) {
        return notify({
          type: 'warning',
          message: 'Please select an item',
        });
      }
      const referenceList = [];
      const data = {
        action,
      };
      if (action === 'APPROVE' || action === 'DECLINE') {
        for (const row of this.selectedRows) {
          for (const [key, value] of Object.entries(row)) {
            if (key === 'reference') {
              if (!referenceList.includes(value)) {
                referenceList.push(value);
              }
            }
          }
        }
        data.referenceList = referenceList;
      }
      if (action === 'DECLINE') {
        if (this.comment) {
          data.comment = this.comment;
        }
      }
      try {
        const res = await this.decidePayoutRequestApi(data);
        if (res.status) {
          this.selectedRowKeys = [];
          this.getLoggingUser(); // Get balance
          // await this.getPayoutRequestsApi({ query: { status: 'PENDING', limit: 200 } });
          await this.getPayoutRequestsApi({ query: { status: 'PENDING' } });
          notify({
            type: 'success',
            message: res.message,
          });
        }
      } catch (error) {}
    },

    onModalOk() {
      this.setModalVisible(false);
      this.cueItems('DECLINE');
    },

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },

    setModalVisible(modalVisible) {
      if (this.selectedRowKeys.length === 0) {
        return notify({
          type: 'warning',
          message: 'Please select an item',
        });
      }
      this.modalVisible = modalVisible;
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
    selectStatus(result) {
      this.query.status = result.slug;
    },

    ...mapMutations({
      checkBetSlip: 'bet/checkBetSlip',
      setParent: 'user/setParent',
    }),

    ...mapActions({
      getLoggingUser: 'getLoggingUser',
      getPayoutRequestsApi: 'user/getPayoutRequestsApi',
      decidePayoutRequestApi: 'user/decidePayoutRequestApi',
    }),
  },

  mounted() {
    this.$nextTick(() => {
      this.getPayoutRequestsApi({ query: { status: 'PENDING' } });
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
  height: 32px;
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
