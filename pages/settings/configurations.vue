<template>
  <main>
    <lazy-car-user-header title="Configurations" icon="transaction-list" />

    <div class="mx-6 my-4">
      <a-tabs type="card">
        <a-tab-pane key="1" tab="General">
          <div class="grid-card">
            <lazy-car-rounded-card title="System Configuration">
              <form class="w-full mx-4 grid-card">
                <div class="flex flex-col justify-between mr-4">
                  <div class="w-full mt-6 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main"> Wallet Name </label>
                    <a-input style="padding-top: 8px" />
                  </div>

                  <div class="w-full mt-2 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main"> Wallet Url </label>
                    <a-input style="padding-top: 8px" />
                  </div>

                  <div class="w-full mt-2 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main">Wallet Logo </label>
                    <a-input style="padding-top: 8px" />
                  </div>

                  <div class="w-full mt-2 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main"> Wallet fav Icon </label>
                    <a-input style="padding-top: 8px" />
                  </div>
                  <div class="w-full mt-2 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main"> Wallet Currency Symbol </label>
                    <a-input style="padding-top: 8px" />
                  </div>

                  <div class="w-full mt-2 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main"> Wallet Support Email </label>
                    <a-input v-model="supportEmail" style="padding-top: 8px" />
                  </div>

                  <div class="w-full mt-2 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main"> Payout Request Limit (Value) </label>
                    <a-input v-model="payoutMax" style="padding-top: 8px" />
                  </div>
                </div>
                <div class="flex flex-col justify-between mr-4">
                  <div class="w-full mt-6 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main"> Wallet Name </label>
                    <a-input style="padding-top: 8px" />
                  </div>

                  <div class="w-full mt-2 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main"> Wallet Url </label>
                    <a-input style="padding-top: 8px" />
                  </div>

                  <div class="w-full mt-2 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main">Wallet Logo </label>
                    <a-input style="padding-top: 8px" />
                  </div>

                  <div class="w-full mt-2 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main"> Wallet fav Icon </label>
                    <a-input style="padding-top: 8px" />
                  </div>
                  <div class="w-full mt-2 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main"> Wallet Currency Symbol </label>
                    <a-input style="padding-top: 8px" />
                  </div>

                  <div class="w-full mt-2 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main"> Wallet Support Email </label>
                    <a-input v-model="supportEmail" style="padding-top: 8px" />
                  </div>

                  <div class="w-full mt-2 mb-4 text-left">
                    <label for="" class="text-sm text-primary-default-main"> Payout Request Limit (Value) </label>
                    <a-input v-model="payoutMax" style="padding-top: 8px" />
                  </div>
                </div>
              </form>
              <a-button size="large" class="mx-auto mt-3 text-white bg-primary-m-success" style="min-width: 200px">
                Confirm </a-button>
            </lazy-car-rounded-card>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Commission">
          <div>
            <div id="transaction-filter" class="mb-4 bg-primary-btn-tert">
              <lazy-car-user-header title="Search For Bets" icon="transaction-list" />
              <div class="border-b border-primary-divider">
                <div class="px-4 py-4">
                  <div class="date-transaction">
                    <div>
                      <div class="types date">
                        <label class="mb-1 text-sm" for="transactions-filter-from">Product</label>
                        <a-select :default-value="products[0].slug" class="text-sm bg-primary-input">
                          <a-select-option v-for="product in products" :key="product.id" :value="product.slug"> {{
                          product.name }} </a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <div>
                      <div class="types date">
                        <label class="mb-1 text-sm" for="transactions-filter-from">Type</label>
                        <a-select :default-value="types[0].slug" class="text-sm bg-primary-input">
                          <a-select-option v-for="type in types" :key="type.id" :value="type.slug"> {{ type.name }}
                          </a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <div>
                      <div class="types date">
                        <label class="mb-1 text-sm" for="transactions-filter-from">Role</label>
                        <a-select :default-value="roles[0].slug" class="text-sm bg-primary-input">
                          <a-select-option v-for="role in roles" :key="role.id" :value="role.slug"> {{ role.name }}
                          </a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <div>
                      <div class="date types">
                        <label class="mb-1 text-sm" for="transactions-filter-from">Search</label>
                        <a-input class="text-sm bg-primary-input text-primary-default-main" name="ticketId"
                          v-model="query.ticketId"> </a-input>
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
          </div>

          <span class="flex justify-end mb-4 mr-3 text-primary-default-main">
            <button class="mr-3">
              <svg-icon name="add" @click="showCommDrawer"
                class="inline-block w-6 h-6 fill-current text-primary-default-main"></svg-icon> Create Plan
            </button>
            <button>
              <svg-icon name="edit" class="inline-block w-6 h-6 fill-current text-primary-default-main"></svg-icon>
              Assign Plan
            </button>
          </span>
          <a-table :columns="columns" :data-source="getCommissions.data" :scroll="{ x: 'calc(700px + 50%)' }"
            :pagination="{ defaultPageSize: 10, size: 'small', showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100'] }"
            bordered>
            <template slot="sn" slot-scope="text, record, index"> {{ index + 1 }} </template>
            <template slot="product" slot-scope="index, record"> {{ record.product.toLowerCase() }} </template>
            <template slot="type" slot-scope="index, record"> {{ record.type.replace('_', ' ').toLowerCase() }}
            </template>
            <template slot="period" slot-scope="index, record">{{ record.period.toLowerCase() }} </template>
            <template slot="action" slot-scope="index, record">
              <div class="flex items-center justify-between">
                <!-- <button class="px-1 mx-2 text-xs text-white rounded-sm bg-primary-m-success" @click="showEditComm(record)">Edit</button> -->
                <a-popconfirm title="Are you sure you want to delete this message?" placement="topRight" ok-text="Yes"
                  cancel-text="No" @confirm="deleteCommission(record)">
                  <button class="px-1 mx-2 text-xs text-white bg-red-500 rounded-sm">Remove</button>
                </a-popconfirm>
              </div>
            </template>
          </a-table>

          <lazy-car-transaction-note></lazy-car-transaction-note>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Banners"> </a-tab-pane>
        <a-tab-pane key="4" tab="Roles">
          <lazy-car-role></lazy-car-role>
        </a-tab-pane>
        <a-tab-pane key="5" tab="Withdrawal">
          <!-- v-if="getWithdarawalSettings.length === 0" -->
          <span class="flex justify-end mb-4 mr-3" v-if="getWithdarawalSettings.length === 0">
            <button class="mr-3">
              <svg-icon name="add" @click="showWithdrawalDrawer(true)"
                class="inline-block w-6 h-6 fill-current text-primary-default-main"></svg-icon>
              Create Default Settings
            </button>
          </span>
          <a-table :columns="withdrawalColumns" :data-source="getWithdarawalSettings"
            :scroll="{ x: 'calc(700px + 50%)' }"
            :pagination="{ defaultPageSize: 10, size: 'small', showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100'] }"
            bordered>
            <template slot="action" slot-scope="index, record">
              <div class="flex items-center justify-between">
                <button class="px-1 mx-2 text-xs text-white rounded-sm bg-primary-m-success"
                  @click="editWithdrawalSetting(record)">Edit</button>
              </div>
            </template>
          </a-table>

          <lazy-car-transaction-note></lazy-car-transaction-note>
        </a-tab-pane>
        <a-tab-pane key="6" tab="Tags">
          <!-- v-if="getWithdarawalSettings.length === 0" -->
          <span class="flex justify-end mb-4 mr-3">
            <button class="mr-3">
              <svg-icon name="add" @click="showTagDrawer(true)"
                class="inline-block w-6 h-6 fill-current text-primary-default-main"></svg-icon>
              Create Tags
            </button>
          </span>
          <a-table :columns="tagColumns" :data-source="getTags.data" :scroll="{ x: 'calc(700px + 50%)' }"
            :pagination="{ defaultPageSize: 10, size: 'small', showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100'] }"
            bordered>
            <template slot="sn" slot-scope="text, record, index"> {{ index + 1 }} </template>
            <!-- <template slot="createdAt" slot-scope="index, record">
        <span>
          {{ moment(record.createdAt).format('Do MMM, YYYY HH:mm') }}
        </span>
      </template> -->
            <template slot="action" slot-scope="index, record">
              <div class="flex items-center justify-between">
                <button class="px-1 mx-2 text-xs text-white rounded-sm bg-primary-m-success">Edit</button>
              </div>
            </template>
          </a-table>

          <lazy-car-transaction-note></lazy-car-transaction-note>
        </a-tab-pane>
      </a-tabs>
    </div>
    <lazy-car-commission-drawer />
    <lazy-car-tag-drawer />
    <lazy-car-edit-commission :commission="commissionData" />
    <lazy-car-edit-withdrawal-settings :withdrawalData="withdrawalData" />
    <lazy-car-withdrawal-drawer />
  </main>
</template>
<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import dayjs from 'dayjs';
import { mapGetters, mapActions } from 'vuex';
import { notify } from '~/utils/utils';

const query = {
  aggregate: true,
  startDate: '',
  endDate: '',
  ticketId: '',
  status: '',
};

const columns = [
  {
    title: 'S/N',
    dataIndex: 's/n',
    key: 's/n',
    align: 'center',
    scopedSlots: { customRender: 'sn' },
  },
  {
    title: 'Name',
    dataIndex: 'plan',
    key: 'plan',
    scopedSlots: { customRender: 'plan' },
    align: 'left',
    // width: 80,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    align: 'center',
    scopedSlots: { customRender: 'role' },
    // ellipsis: true,
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    align: 'center',
    scopedSlots: { customRender: 'product' },
    // ellipsis: true,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    scopedSlots: { customRender: 'type' },
    // ellipsis: true,
  },
  {
    title: 'Period',
    dataIndex: 'period',
    key: 'period',
    scopedSlots: { customRender: 'period' },
    // ellipsis: true,
  },
  {
    title: 'Actions',
    scopedSlots: { customRender: 'action' },
  },
];

const withdrawalColumns = [
  {
    title: 'Limit',
    dataIndex: 'limit',
    key: 'limit',
    scopedSlots: { customRender: 'limit' },
    align: 'left',
    // width: 80,
  },
  {
    title: 'Min. Withdrawable',
    dataIndex: 'minWithdrawable',
    key: 'minWithdrawable',
    align: 'center',
    scopedSlots: { customRender: 'minWithdrawable' },
  },
  {
    title: 'Max Withdrawable',
    dataIndex: 'maxWithdrawable',
    key: 'maxWithdrawable',
    align: 'center',
    scopedSlots: { customRender: 'maxWithdrawable' },
  },
  {
    title: 'Min Balance',
    dataIndex: 'minBalance',
    key: 'minBalance',
    align: 'center',
    scopedSlots: { customRender: 'minBalance' },
  },
  {
    title: 'Actions',
    scopedSlots: { customRender: 'action' },
  },
];

const tagColumns = [
  {
    title: 'S/N',
    dataIndex: 's/n',
    key: 's/n',
    align: 'center',
    scopedSlots: { customRender: 'sn' },
  },
  {
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
    scopedSlots: { customRender: 'tag' },
    align: 'left',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    align: 'center',
    scopedSlots: { customRender: 'description' },
  },
  {
    title: 'Actions',
    scopedSlots: { customRender: 'action' },
  },
];

export default Vue.extend({
  middleware: 'user',

  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      getCommissions: 'user/getCommissions',
      getWithdarawalSettings: 'user/getWithdarawalSettings',
      getTags: 'user/getTags',
    }),
  },

  data() {
    return {
      commissionData: {},
      tagColumns,
      columns,
      withdrawalColumns,
      withdrawalData: {}, // Update data
      disabled: false,
      modalVisible: false,
      dateFormat: 'YYYY/MM/DD',
      isLoading: false,
      supportEmail: 'support@starbet.com',
      payoutMax: '5000',
      comPeriods: [
        {
          id: 1,
          name: 'Weekly',
          slug: 'weekly',
        },
        {
          id: 2,
          name: 'Monthly',
          slug: 'monthly',
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
      results: [
        { id: 1, name: 'All', slug: '' },
        { id: 2, name: 'Running', slug: 'RUNNING' },
        { id: 6, name: 'Won', slug: 'WON' },
        { id: 5, name: 'Partial Won', slug: 'PARTIAL_WON' },
        { id: 3, name: 'Lost', slug: 'LOST' },
        { id: 4, name: 'Paid', slug: 'PAID' },
        { id: 7, name: 'Cancelled', slug: 'CANCELLED' },
      ],
      products: [
        { id: 1, name: 'All', slug: '' },
        { id: 2, name: 'Sport', slug: 'sport' },
        { id: 3, name: 'GB Virtuals', slug: 'gb-virtuals' },
        { id: 4, name: 'TW  Virtuals', slug: 'tw-virtuals' },
        { id: 5, name: 'All Without Sport', slug: 'all-without-sport' },
      ],
      types: [
        { id: 1, name: 'All', slug: '' },
        { id: 2, name: 'Sales', slug: 'sales' },
        { id: 3, name: 'Sales + Bonus', slug: 'sales-bonus' },
        { id: 4, name: 'Profit', slug: 'profit' },
      ],
      gameTypes: [
        { id: 1, name: 'All', slug: '' },
        { id: 2, name: 'Single', slug: 'SINGLE' },
        { id: 6, name: 'Multiple', slug: 'MULTIPLE' },
        { id: 3, name: 'Combination', slug: 'COMBINATION' },
      ],
      roles: [
        { id: 1, name: 'All', slug: '' },
        { id: 2, name: 'Retail', slug: 'retail' },
      ],
      isVisible: false,
      isActive: 'current-month',
      startTo: moment().format('YYYY-MM-DD'),
      startFrom: moment().day('Monday').format('YYYY-MM-DD'),
      minDate: dayjs().subtract(90, 'days').startOf('isoWeek').format('YYYY-MM-DD'),
      maxDate: dayjs().format('YYYY-MM-DD'),
      currentDate: dayjs().format('YYYY-MM-DD'),
      date: dayjs(),
      query,
    };
  },
  methods: {
    async deleteCommission(record: any) {
      const query = {
        commissionId: record._id,
      };
      try {
        const res = await this.deleteCommissionApi({ query });
        if (res) {
          //  @ts-ignore
          this.getCommissionsApi({ query: { limit: 50 } });
          // @ts-ignore
          notify({
            type: 'success',
            message: 'Commission deleted successfully',
          });
        } else {
          // @ts-ignore
          notify({
            type: 'error',
            message: `Error! ${res.message}`,
          });
        }
      } catch (error) {
        // @ts-ignore
        notify({
          type: 'error',
          message: 'Internal server error',
        });
      }
    },

    async editWithdrawalSetting(record: any) {
      this.withdrawalData = record;
      this.$store.commit('user/toggleWithdrawalSettingsDrawer');
    },

    showCommDrawer() {
      this.$store.commit('user/setShowCommDrawer', true);
    },

    showRoleDrawer() {
      this.$store.commit('user/setShowRoleDrawer', true);
    },

    showWithdrawalDrawer(payload: boolean) {
      this.$store.commit('user/setShowWithdrawalDrawer', payload);
    },

    showTagDrawer(payload: boolean) {
      this.$store.commit('user/setShowTagDrawer', payload);
    },

    onSelect(e: any) {
      switch (e.slug) {
        case 'TODAY':
          this.query.startDate = moment().format('YYYY-MM-DD');
          this.query.endDate = moment().format('YYYY-MM-DD');
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

    ...mapActions({
      getCommissionsApi: 'user/getCommissionsApi',
      deleteCommissionApi: 'user/deleteCommissionApi',
      getWithdarawalSettingsApi: 'user/getWithdarawalSettingsApi',
      getTagsApi: 'user/getTagsApi',
      addWithdrawalSettingsApi: 'user/addWithdrawalSettingsApi',
      toggleWithdrawalSettingsDrawer: 'user/toggleWithdrawalSettingsDrawer',
    }),
  },

  mounted() {
    this.$nextTick(() => {
      this.getCommissionsApi({ query: { limit: 50 } });
      this.getWithdarawalSettingsApi({ query: { limit: 50 } });
      this.getTagsApi();
    });
  },
});
</script>
<style lang="scss" scoped>
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

.checkbox-container {
  max-width: 530px;
}

.radio-button>div {
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

.t-row>td {
  border-right: 1pt solid #d5dbe5;
  border-bottom: 1pt solid #d5dbe5;
  color: #374562;
  padding: 6px 8px;
}

.t-row:nth-child(odd) {
  background: #eef2fa;
}

.browny {
  @apply border bg-primary-m-warning border-primary-m-warning text-white;
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

.ecKlDR {
  border-radius: 0.5rem;
  // background: center center / cover rgb(15, 33, 46);
  color: rgb(213, 220, 235);
  width: 100%;
  // padding: 0.75rem;
}

.hiYJcb {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.grid-card {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.gBfbom {
  border-radius: 0.5rem;
  // background: center center / cover rgb(15, 33, 46);
  color: rgb(213, 220, 235);
  padding: 0px;
  border: 1px solid rgb(47, 69, 83);
}

.hSQmxA {
  color: rgb(213, 220, 235);
  background-color: rgb(47, 69, 83);
  padding: 0.5rem;
}

.YfLzF {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  -webkit-box-align: baseline;
  align-items: baseline;
}

.YfLzF> :not(button) {
  width: 100%;
}

.fFehkc {
  width: 100%;
  display: inline-flex;
  -webkit-box-align: center;
  flex-direction: column-reverse;
  align-items: flex-start;
}

.kmNobL {
  width: 100%;
  display: flex;
  flex-shrink: 0;
}

.bcHFFd {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  margin: 0px 0px 0.25em;
  color: rgb(177, 186, 211);
  transition: all 200ms ease-out 0s;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0px;
}

.YfLzF>*+* {
  margin-top: 1rem;
}

.kvUYUB {
  padding: 0.5rem;
}

.fBngGC {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.fBngGC>*+* {
  margin-top: 1rem;
}

.bEKOJb {
  font-weight: inherit;
  font-size: inherit;
  color: inherit;
}

.ktZwKn {
  position: relative;
  -webkit-box-flex: 1;
  flex-grow: 1;
  width: 100%;
  display: flex;
}

.fjetsA {
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.fjetsA>button,
.fjetsA a {
  height: fit-content;
  width: fit-content;
  max-width: fit-content;
}

.iDWLpt {
  font-weight: 600;
  font-size: inherit;
  border-radius: 0.25rem;
  touch-action: manipulation;
  position: relative;
  display: inline-flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  transition: background 300ms ease 0s, opacity 300ms ease 0s, transform 100ms ease 0s;
  line-height: 1.5;
  color: rgb(1, 62, 1);
  background: rgb(31, 255, 32);
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px 0px, rgb(0 0 0 / 12%) 0px 1px 2px 0px;
  padding: calc(0.5em + 2px) 1em;
}

.lbWXxN {
  display: inline-flex;
  position: relative;
  -webkit-box-align: center;
  align-items: center;
}

.iDWLpt>* {
  transition: background 300ms ease 0s, opacity 300ms ease 0s, transform 100ms ease 0s;
}

.ant-table-body {
  .ant-table-thead>tr>th {
    color: #fff;
    border-bottom: 1px solid #e8e8e8;
    @apply bg-primary-sec-alt px-3 py-2;
  }

  .ant-table-tbody>tr.ant-table-row:hover>td {
    background: none !important;
  }
}

// .ant-select-arrow,
// .ant-tabs-tab-prev,
// .ant-tabs-tab-next {
//   @apply text-primary-default-main;
// }

// .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
//   @apply bg-primary-bg-ter text-primary-default-main;
// }
</style>
