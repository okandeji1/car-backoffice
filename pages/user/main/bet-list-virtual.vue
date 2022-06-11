<template>
  <main>
    <lazy-car-user-header title="Betlist Virtuals" icon="ticket-overview" />

    <div id="transaction-filter" class="m-4 bg-primary-btn-tert">
      <lazy-car-user-header title="Search For Bets" icon="transaction-list" />
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
                <label class="mb-1 text-sm" for="transactions-filter-from">Game Type</label>
                <a-select :default-value="gameTypes[0].slug" class="text-sm">
                  <a-select-option v-for="type in gameTypes" :key="type.id" :value="type.slug"> {{ type.name }} </a-select-option>
                </a-select>
              </div>
            </div>
            <div>
              <div class="date types">
                <label class="mb-1 text-sm" for="transactions-filter-from">Coupon Code</label>
                <a-input class="text-sm bg-transparent text-primary-default-main" name="ticketId" v-model="query.ticketId"> </a-input>
              </div>
            </div>
            <div>
              <div class="date types">
                <label class="mb-1 text-sm" for="transactions-filter-from">Outcome</label>
                <a-select :default-value="results[0].slug" class="text-sm text-primary-default-main" name="status" v-model="query.status">
                  <a-select-option v-for="result in results" :key="result.id" :value="result.slug"> {{ result.name }} </a-select-option>
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

    <div class="px-4" v-if="getBets">
      <!-- <a-input style="width: 20%" class="w-2/4 mb-3 md:w-1/3" placeholder="Search User or Coupon Id"></a-input> -->
      <LazyBetBaseInput placeholder="Search Coupon Id" class="w-2/4 mb-3 md:w-1/4" />

      <a-table
        :columns="columns"
        v-if="!dataIsLoading"
        :data-source="getBets.data"
        :scroll="{ x: 'calc(700px + 50%)' }"
        :pagination="{
          defaultPageSize: 10,
          size: 'small',
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          //total: 0 || this.getBets.meta.total,
          //showTotal: (total, range) => {
          //return total > 1 ? `Showing ${range[0]} to ${range[1]} of ${total} entries` : `Showing ${range[0]} to ${range[1]} of ${total} entry`;
          //},
        }"
        bordered
      >
        <template slot="createdAt" slot-scope="index, record">
          <span>
            {{ moment(record.createdAt).format('Do MMM, YYYY HH:mm') }}
          </span>
        </template>
        <template slot="date" slot-scope="index, record">
          <span>
            {{ moment(record.date).format('Do MMM, YYYY HH:mm') }}
          </span>
        </template>
        <template slot="date" slot-scope="index, record">
          <span>
            {{ moment(record.date).format('Do MMM, YYYY HH:mm') }}
          </span>
        </template>
        <template slot="betslip" slot-scope="index, record">
          <span>
            {{ record.betslip.totalStake }}
          </span>
        </template>
        <template slot="confirmedWinning" slot-scope="index, record">
          <span>
            {{ record.betslip.confirmedWinning.totalWinning.toFixed(2) }}
          </span>
        </template>
        <template slot="show" slot-scope="index, record" class="cursor-pointer">
          <span @click="showSelections(record)">
            <svg-icon name="eye" class="inline w-4 h-4 cursor-pointer fill-current"></svg-icon>
          </span>
        </template>
      </a-table>

      <lazy-car-skeleton-table v-if="dataIsLoading" :columns="columns"></lazy-car-skeleton-table>
    </div>
  </main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import dayjs from 'dayjs';

const query = {
  aggregate: true,
  startDate: '',
  endDate: '',
  ticketId: '',
  status: '',
};

export default {
  // // layout: 'user',
  middleware: 'auth',

  computed: {
    ...mapGetters({ getBets: 'user/getBets', loggedInUser: 'loggedInUser' }),
    // showInfo() {
    //   const getCurrentEntries = this.searchEntries.length <= 0 ? this.entries : this.searchEntries;
    //   return array.show(getCurrentEntries)(this.currentPage, this.currentEntries);
    // },
    // showPagination() {
    //   return array.pagination(this.currentPage, this.currentPage, 3);
    // },
  },
  data() {
    return {
      query,
      columns: [
        { id: 1, name: 'ticketId', title: 'Coupon Id' },
        { id: 2, name: 'createdAt', title: 'Date' },
        { id: 3, name: 'date-of-result', title: 'Date Of Result' },
        { id: 4, name: 'betslip', title: 'Amount' },
        { id: 5, name: 'status', title: 'Status' },
        { id: 6, name: 'confirmedWinning', title: 'Winning' },
        { id: 7, name: 'bettor', title: 'User' },
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
      results: [
        { id: 1, name: 'All', slug: '' },
        { id: 2, name: 'Running', slug: 'RUNNING' },
        { id: 6, name: 'Won', slug: 'WON' },
        { id: 5, name: 'Partial Won', slug: 'PARTIAL_WON' },
        { id: 3, name: 'Lost', slug: 'LOST' },
        { id: 4, name: 'Paid', slug: 'PAID' },
        { id: 7, name: 'Cancelled', slug: 'CANCELLED' },
      ],
      gameTypes: [
        { id: 1, name: 'All', slug: '' },
        { id: 2, name: 'Single', slug: 'SINGLE' },
        { id: 6, name: 'Multiple', slug: 'MULTIPLE' },
        { id: 3, name: 'Combination', slug: 'COMBINATION' },
      ],
      entries: [],

      dataIsLoading: false,
      bets: [],
      status: '',
      date: '',
      ticketId: '',
      currentPage: 1,
      allPages: 1,
      searchInput: '',
      searchEntries: [],
      dateFormat: 'YYYY/MM/DD',
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
    selectStatus(result) {
      this.selectedResult = result.slug;
    },
    async fetchTableData() {
      this.dataIsLoading = true;

      let res = await this.$axios.$get(
        `/api/v1/sportbook/pool/bas/bets/search?username=${this.loggedInUser.username}&startDate=2021-07-01&endDate=2021-07-31`,
      );
      this.dataIsLoading = false;

      return res.data;
    },

    async betReports() {
      this.dataIsLoading = true;

      let q = { aggregate: true };
      if (this.query.startDate === '') {
        this.query.startDate = this.startFrom;
      }

      if (this.query.endDate === '') {
        this.query.endDate = this.startTo;
      }

      if (this.query.ticketId && this.query.ticketId.length > 2) {
        q.ticketId = this.query.ticketId;
      }
      if (query.status) {
        q.status = this.query.status;
      }
      q.startDate = moment(this.query.startDate).format('YYYY-MM-DD');
      q.endDate = moment(this.query.endDate).format('YYYY-MM-DD');
      try {
        await this.getBetApi({ query: q });
      } catch (error) {
      } finally {
        this.dataIsLoading = false;
      }
    },

    reset() {
      this.getBetApi({ query: { aggregate: true } });
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
          this.query.startDate = this.startFrom = moment().format('YYYY-MM-DD');
          this.query.endDate = this.startTo = moment().format('YYYY-MM-DD');
          this.isActive = e.slug;
        // this.getSalesReportApi({ query: { product: query.product } });
      }
    },

    ...mapActions({
      getBetApi: 'user/getBetApi',
    }),
  },

  mounted() {
    // this.$nextTick(() => {
    //   this.getBetApi({
    //     query: { aggregate: true },
    //   });
    // });
  },
};
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
  height: 28px;
  padding: 14px 11px;
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
  margin: 0 auto;
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
.ant-select-selection {
  display: block;
  box-sizing: border-box;
  background-color: #1a2633;
  color: #fff;
  border: 1px solid #d9d9d9;
  border-top-width: 1.02px;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* @screen md {
  .ant-form {
    width: 35rem;
  }
} */

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
  color: #fff;
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
  height: 28px;
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
  margin: 0 auto;
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
.ant-select-selection {
  display: block;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-top-width: 1.02px;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* @screen md {
  .ant-form {
    width: 35rem;
  }
} */

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
  color: #fff;
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

.yell {
  background: #eeb941;
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

.overview_table td {
  color: #374562;
}

.overview_table tr:nth-child(even),
.download_table tr:nth-child(even) {
  background: #eef2fa;
}

.quick_table td,
.quick_table th {
  border: 1px solid #dbdada;
}

.legend {
  background: #1a2633;
}

.bg-brand {
  background: #1a2633;
}

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
  // height: px;
  padding: 14px 11px;
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
  @apply;
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
