<template>
  <main>
    <lazy-car-user-header :title="titleHeader" icon="transaction-list" />

    <div id="transaction-filter" class="m-4 bg-primary-btn-tert">
      <div class="border-b border-primary-divider">
        <div class="px-4 py-2">
          <!-- <div
            class="flex items-center justify-end w-full my-2"
            v-if="loggedInUser.role !== 'agent' && role !== 'online-customer' && loggedInUser.role !== 'cashier'"
          >
            <lazy-car-export-excel
              :csvData="{
                records: getUsers,
                fileName: role.replace('-', ' ').toUpperCase(),
                source: 'USERS',
                disabled: getUsers ? false : true,
              }"
            />

            <a-button class="ml-2 text-white bg-primary-m-warning" @click="toggleLoginDrawer"> Add New {{ titleHeader }} </a-button>
          </div> -->
          <div class="flex items-center justify-end w-full my-2" v-if="loggedInUser.role !== 'cashier' && loggedInUser.role !== 'online-customer'">
            <lazy-car-export-excel
              :csvData="{
                records: getUsers,
                fileName: role.replace('-', ' ').toUpperCase(),
                source: 'USERS',
                disabled: getUsers ? false : true,
              }"
            />

            <a-button class="ml-2 text-white bg-primary-m-warning" @click="toggleLoginDrawer"> Add New {{ titleHeader }} </a-button>
          </div>
        </div>
      </div>
    </div>

    <div class="m-4 transaction-table">
      <!-- <a-input class="w-2/4 mb-3 md:w-15" placeholder="Search " @keyup="searchUser"></a-input> -->

      <LazyBetBaseInput placeholder="Search" @keyup="searchUser" class="w-2/4 mb-3 md:w-1/4" />

      <lazy-car-skeleton-table v-if="load" :columns="columns"></lazy-car-skeleton-table>
      <a-table
        :columns="columns"
        v-if="!load"
        :data-source="getUsers"
        :scroll="{ x: 'calc(700px + 50%)' }"
        :pagination="{ defaultPageSize: 10, size: 'small', showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100'] }"
        bordered
      >
        <template slot="username" slot-scope="index, record">
          <span @click="toggleProfile(record)" class="cursor-pointer text-primary-bg-sec">
            {{ record.username }}
          </span>
        </template>
        <template slot="wallet" slot-scope="index, record">
          <span>
            {{ $n(record.wallet.balance.toFixed(2)) }}
          </span>
        </template>

        <template slot="sportSales" slot-scope="index, record">
          <span v-if="record.role === 'staff'"> N/A </span>
          <span v-else>
            {{ $n(Math.floor(Math.random() * 99999)) }}
          </span>
        </template>
        <template slot="sportPaidOut" slot-scope="index, record">
          <span v-if="record.role === 'staff'"> N/A </span>
          <span v-else>
            {{ $n(Math.floor(Math.random() * 99999)) }}
          </span>
        </template>
        <template slot="productSales" slot-scope="index, record">
          <span v-if="record.role === 'staff'"> N/A </span>
          <span v-else>
            {{ $n(Math.floor(Math.random() * 99999)) }}
          </span>
        </template>
        <template slot="productSalesWinnings" slot-scope="index, record">
          <span v-if="record.role === 'staff'"> N/A </span>
          <span v-else>
            {{ $n(Math.floor(Math.random() * 99999)) }}
          </span>
        </template>
        <template slot="toCollect" slot-scope="index, record">
          <span v-if="record.role === 'staff'"> N/A </span>
          <span v-else>
            {{ $n(Math.floor(Math.random() * 99999)) }}
          </span>
        </template>
        <template slot="loadUnload" slot-scope="index, record">
          <div>
            <button
              class="w-full px-1 mb-1 text-xs text-white rounded-sm bg-primary-m-success"
              :class="loggedInUser.role === 'cashier' ? 'disabled' : ''"
              :disabled="loggedInUser.role === 'cashier'"
              @click="showFundModal('LOAD', record)"
            >
              Load
            </button>
            <button
              class="w-full px-1 text-xs text-white rounded-sm bg-primary-m-success"
              :class="loggedInUser.role === 'cashier' ? 'disabled' : ''"
              :disabled="loggedInUser.role === 'cashier'"
              @click="showFundModal('UNLOAD', record)"
            >
              Unload
            </button>
          </div>
        </template>
        <template slot="resetPassword" slot-scope="index, record">
          <div>
            <button
              :disabled="loggedInUser.role === 'cashier'"
              class="w-full px-1 mb-1 text-xs text-white rounded-sm bg-primary-m-success"
              :class="loggedInUser.role === 'cashier' ? 'disabled' : ''"
              @click="showResetPasswordModal(record)"
            >
              Reset PW
            </button>
            <button
              class="w-full px-1 text-xs text-white rounded-sm bg-primary-m-success"
              :class="record.role === 'staff' || record.role === 'cashier' || record.role === 'online-customer' ? 'disabled' : ''"
              :disabled="record.role === 'staff' || record.role === 'cashier' || record.role === 'online-customer'"
              @click="checkNetwork(record)"
            >
              Network
            </button>
          </div>
        </template>
      </a-table>
    </div>

    <!-- <div class="mx-4 trans-note">
      *Please note, when filtering specific transaction types, the balance shown is equivalent to the balance as at the time of the transaction
      displayed.
    </div> -->

    <!-- Register user drawer -->
    <lazy-car-register-user :role="role" />
    <lazy-car-user-profile :profileData="profileData" />
    <lazy-car-fund-transaction-modal v-if="isFundModalOpened" @close-fund="closeFundModal" :item="item" />
    <lazy-car-reset-password-modal v-if="isResetModalOpened" @close-fund="closeResetModal" :updateUser="updateUser" />
  </main>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import dayjs from 'dayjs';

const query = {
  startDate: '',
  endDate: '',
  type: '',
};

export default Vue.extend({
  // layout: 'user',
  props: {
    role: {
      type: String,
      required: true,
    },
    mainTitle: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
  },

  computed: {
    ...mapGetters({
      getUsers: 'user/getUsers',
      loggedInUser: 'loggedInUser',
      getFundModal: 'user/getFundModal',
    }),
    titleHeader() {
      if (this.role == 'area-manager') this.role = 'business-manager';
      let role = this.role.replace('-', ' ');
      return role.charAt(0).toUpperCase() + role.slice(1);
    },
  },

  data() {
    return {
      query,
      load: true,
      dateFormat: 'YYYY/MM/DD',
      dataIsLoading: false,
      isLoading: false,
      item: {},
      isFundModalOpened: false,
      isResetModalOpened: false,
      updateUser: {},
      profileData: {},
      tableHeader: [
        {
          id: 1,
          class: 't-head',
          title: 'ID',
        },
        {
          id: 2,
          class: 't-head text-center',
          title: 'Username',
        },
        {
          id: 3,
          class: 't-head text-left ',
          title: 'Current Balance',
        },
        {
          id: 4,
          class: 't-head text-right',
          title: 'Total Sports Sales',
        },
        {
          id: 5,
          class: 't-head text-right',
          title: 'Total Sports Paid Out ',
        },
        {
          id: 6,
          class: 't-head text-right',
          title: 'Product One sales',
        },
        {
          id: 7,
          class: 't-head text-right',
          title: 'Product One Winnings',
        },
        {
          id: 8,
          class: 't-head text-right',
          title: 'To Collect',
        },
        {
          id: 9,
          class: 't-head text-right',
          title: 'Load/Unload',
        },
        {
          id: 10,
          class: 't-head text-right',
          title: 'Reset PW',
        },
      ],
      columns: [
        {
          id: 2,
          name: 'username',
          datausername: 'username',
          key: 'username',

          width: 150,
          title: 'Username',
          scopedSlots: { customRender: 'username' },
        },
        // {
        //   id: 10,
        //   name: 'Roles',
        //   datausername: 'roles',
        //   key: 'roles',

        //   width: 150,
        //   title: 'Roles',
        //   scopedSlots: { customRender: 'roles' },
        // },
        { id: 3, name: 'wallet', dataIndex: 'wallet', key: 'wallet', title: 'Current Balance', scopedSlots: { customRender: 'wallet' } },
        {
          id: 4,
          name: 'sportSales',
          dataIndex: 'sportSales',
          key: 'sportSales',
          title: 'Total Sport Sales',
          scopedSlots: { customRender: 'sportSales' },
        },
        {
          id: 5,
          name: 'sportPaidOut',
          dataIndex: 'sportPaidOut',
          key: 'sportPaidOut',
          title: 'Total Sport Paid Out',
          scopedSlots: { customRender: 'sportPaidOut' },
        },
        {
          id: 6,
          name: 'productSales',
          dataIndex: 'productSales',
          key: 'productSales',
          title: 'Total product Sales',
          scopedSlots: { customRender: 'productSales' },
        },
        {
          id: 7,
          name: 'productSalesWinnings',
          dataIndex: 'productSalesWinnings',
          key: 'productSalesWinnings',
          title: 'Total product One Winnings',
          scopedSlots: { customRender: 'productSalesWinnings' },
        },
        { id: 8, name: 'toCollect', dataIndex: 'toCollect', key: 'toCollect', title: 'To Collect', scopedSlots: { customRender: 'toCollect' } },
        { id: 9, name: 'loadUnload', dataIndex: 'loadUnload', key: 'loadUnload', title: 'Load/Unload', scopedSlots: { customRender: 'loadUnload' } },
        {
          id: 10,
          name: 'resetPassword',
          dataIndex: 'resetPassword',
          key: 'resetPassword',
          title: 'Reset PW',
          scopedSlots: { customRender: 'resetPassword' },
        },
      ],
      selectedResult: '',
      isActive: 'current-month',
      startTo: new Date(),
      startFrom: new Date(),
      minDate: dayjs().subtract(90, 'days').startOf('isoWeek').format('YYYY-MM-DD'),
      maxDate: dayjs().format('YYYY-MM-DD'),
      currentDate: dayjs().format('YYYY-MM-DD'),
      date: new Date(),
      header: true,
      selectedRowKeys: [],
    };
  },
  watch: {
    getUsers() {
      if (this.getUsers) {
        this.load = false;
      }
    },
  },

  methods: {
    dayjs,
    async searchUser(e) {
      this.dataIsLoading = true;

      let username;
      if (typeof e === 'string') {
        username = e;
      } else {
        username = e.target.value;
      }
      if (!username || username.length < 3) {
        return this.getUsersApi({
          query: { role: this.role },
        });
      }
      try {
        // @ts-ignore
        await this.searchUserApi({
          query: { role: this.role, username: username },
        });
      } catch (error) {
      } finally {
        this.dataIsLoading = false;
      }
    },

    checkNetwork(user) {
      let query = {
        username: user.username,
      };

      this.getUserNetworkApi(query);
      this.$router.push({ path: '/user/downlines' });
    },

    async viewNetwork(user) {
      this.dataIsLoading = true;

      try {
        await this.getUserNetworkApi({
          query: { username: user.username },
        });
      } catch (error) {
      } finally {
        this.dataIsLoading = false;
      }
      // this.$router.push({
      //   path: '/user/_slug',
      //   query: { role: user.role, username: user.username },
      // });
    },

    showFundModal(action, user) {
      this.item.action = action;
      this.item.user = user;
      this.isFundModalOpened = true;
      // this.$store.commit('user/setFundModal', true);
    },

    closeFundModal() {
      this.isFundModalOpened = false;
    },

    showResetPasswordModal(user) {
      this.updateUser = user;
      this.isResetModalOpened = true;
      // this.$store.commit('user/setResetPasswordModal', true)
    },

    closeResetModal() {
      this.isResetModalOpened = false;
    },

    selectStatus(result) {
      this.selectedResult = result.slug;
    },

    toggleLogin() {
      this.loginVisible = !this.loginVisible;
    },

    // showProfileDrawer

    toggleProfile(user) {
      this.profileData = user;
      this.$store.commit('user/toggleProfileDrawer');
    },

    onLoginClose() {
      this.loginVisible = false;
    },

    ...mapMutations({
      toggleLoginDrawer: 'pool/toggleLoginDrawer',
      toggleProfileDrawer: 'user/toggleProfileDrawer',
    }),

    ...mapActions({
      getUsersApi: 'user/getUsersApi',
      searchUserApi: 'user/searchUserApi',
      getUserNetworkApi: 'user/getUserNetworkApi',
    }),
  },

  mounted() {
    // this.$nextTick(() => {
    this.getUsersApi({
      query: { role: this.role },
    });
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
// .ant-select-selection {
//   display: block;
//   box-sizing: border-box;
//   background-color: #1a2633;
//   border: 1px solid #d9d9d9;
//   border-top-width: 1.02px;
//   border-radius: 0.5rem;
//   outline: none;
//   transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
// }

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

.date-transaction {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  padding: 0 15px;
  align-items: center;
  height: 80px;
  color: #374562;
  font-weight: 600;
  // background-color: #3f5072;

  @apply bg-primary-btn-tert text-primary-default-main;
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
  background: #deb886;
  border: 1px solid #deb886;
  color: #213243;
}

.no-trans {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 70px;
  font-size: 15px;
}

.trans-note {
  font-size: 13px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  padding: 15px;
  // background: #3f5072;
  color: #fff;
  @apply bg-primary-bg-sec;
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
