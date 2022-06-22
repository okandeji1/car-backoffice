<template>
  <div class="new">
    <lazy-car-user-header title="Admin Area" icon="menu" />

    <div class="my-4 mb-4 first_admin">
      <ul class="grid gap-2 text-center grid-cols-h-competitions text-xs-cus">
        <li
          class="flex flex-col items-center justify-around h-12 py-8 leading-9 text-black rounded cursor-pointer opa min-w-40 text-text-d-primary bg-primary-sidebar"
          v-for="btn in buttons"
          :key="btn.id"
        >
          <div>
            <nuxt-link :to="{ path: btn.link }">
              <button class="flex items-center justify-around w-full text-white focus:outline-none">
                <svg-icon :name="btn.icon" class="inline-block w-8 h-8 ml-2 fill-current"></svg-icon>
                <span class="items-center pl-2 pr-4 text-xl"> {{ btn.title }} </span>
              </button>
            </nuxt-link>
          </div>
        </li>
      </ul>
    </div>
    <!-- Tenant -->
    <div class="my-2 mb-4 second_1_admin table-heading">
      <lazy-car-user-header title="Accounting" icon="menu" />

      <a-table bordered :columns="saleHeading" :data-source="accountingData" :scroll="{ x: 'calc(700px + 50%)', y: 420 }" :pagination="false">
      </a-table>
    </div>
    <!-- Tenant -->
    <div class="my-2 mb-4 second_2_admin table-heading">
      <lazy-car-user-header title="Sales" icon="menu" />

      <a-table bordered :columns="saleHeading" :data-source="gameData" :scroll="{ x: 'calc(700px + 50%)', y: 420 }" :pagination="false"> </a-table>
    </div>

    <div class="w-11/12 mx-auto my-4">
      <lazy-car-chart-bar :chart-data="chartdata" :options="chartOptions"></lazy-car-chart-bar>
    </div>

    <div class="my-2 mb-4 fifth_admin table-heading">
      <lazy-car-user-header title="Last 10 Transactions" icon="menu" />

      <a-table bordered :columns="transactionColumns" :data-source="getTransactions.data" :scroll="{ x: 'calc(700px + 50%)', y: 420 }" :pagination="false">
        <template slot="createdAt" slot-scope="index, record">
          <span>
            {{ dayjs(record.createdAt).format('DD MMM, YYYY HH:mm') }}
          </span>
        </template>
        <template slot="status" slot-scope="index, record">
          <span class="flex items-center justify-center text-primary-green">
            <svg-icon :name="record.status.toLowerCase()" class="inline w-4 h-4 fill-current"></svg-icon>
          </span>
        </template>
        <template slot="reference" slot-scope="index, record">
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
        <template slot="senderHistory" slot-scope="index, record">
          <span v-if="record.beneficiaryHistory || record.senderHistory">
            {{
              record.narration.includes('transfer') || record.narration.includes('winnings') || record.narration.includes('by')
                ? $n(record.beneficiaryHistory.balanceAfter.toFixed(2))
                : $n(record.senderHistory.balanceAfter.toFixed(2))
            }}
          </span>
        </template>
      </a-table>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

// Transactions column
const transactionColumns = [
  {
    title: 'Transaction ID',
    key: 'transactionId',
    dataIndex: 'transactionId',
  },
  {
    title: 'Transaction Date',
    key: 'transactionDate',
    dataIndex: 'transactionDate',
    width: '25%',
  },
  {
    title: 'Description',
    key: 'transactionDescription',
    dataIndex: 'transactionDescription',
  },
  {
    title: 'Credit',
    key: 'credit',
    dataIndex: 'credit',
  },
  {
    title: 'Balance',
    key: 'balance',
    dataIndex: 'balance',
  },
];

export default Vue.extend({
  // middleware: 'auth',

  computed: {
    ...mapGetters({
      getTransactions: 'user/getTransactions'
    }),
  },

  data() {
    return {
      transactionColumns,
      buttons: [
        {
          id: 1,
          title: 'Sales',
          icon: 'chart',
          link: '/user/reports/sales',
        },
        {
          id: 2,
          title: 'Dealers',
          icon: 'chart',
          link: '/user/reports/#',
        },
        {
          id: 3,
          title: 'Customers',
          icon: 'chart',
          link: '/user/reports/#',
        },
      ],
      saleHeading: [
        {
          title: 'Dealers',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Today',
          dataIndex: 'today',
          key: 'today',
        },
        {
          title: 'Yesterday',
          dataIndex: 'yesterday',
          key: 'yesterday',
        },
        {
          title: 'WTD',
          dataIndex: 'wtd',
          key: 'wtd',
        },
        {
          title: 'MTD',
          key: 'mtd',
          dataIndex: 'mtd',
        },
        {
          title: 'SPLM',
          key: 'splm',
          dataIndex: 'splm',
        },
      ],
      gameData: [
        {
          key: 1,
          name: 'Sales Count',
          today: '310',
          yesterday: '220',
          wtd: '430',
          mtd: '540',
          splm: '650',
        },
        {
          key: 2,
          name: 'Sales Amount',
          today: '10,632',
          yesterday: '20,897',
          wtd: '30,655',
          mtd: '40,909',
          splm: '50,674',
        },
        
        {
          key: 4,
          name: 'GGR',
          today: '10,123',
          yesterday: '20,234',
          wtd: '30,345',
          mtd: '40,213',
          splm: '50,234',
        },
        {
          key: 5,
          name: 'GGR %',
          today: '-10%',
          yesterday: '20%',
          wtd: '30%',
          mtd: '-40%',
          splm: '50%',
        },
      ],
      accountingData: [
        {
          key: 1,
          name: 'Deposits',
          today: '310',
          yesterday: '220',
          wtd: '430',
          mtd: '540',
          splm: '650',
        },
        {
          key: 2,
          name: 'Withdrawals',
          today: '10,632',
          yesterday: '20,897',
          wtd: '30,655',
          mtd: '40,909',
          splm: '50,674',
        },
        {
          key: 3,
          name: 'Net',
          today: '19,345',
          yesterday: '23,893',
          wtd: '38,321',
          mtd: '40,908',
          splm: '50,843',
        },
      ],
      dataCollection: null,
      chartdata: {
        labels: ['01-01', '01-02', '01-03', '01-04', '01-05', '01-06'],
        datasets: [
          {
            label: 'Sales',
            data: [40000, 20600, 30500, 50550, 18050, 48000],
            backgroundColor: 'rgba(29, 47, 102, 0.2)',
            borderColor: 'rgb(29, 47, 102)',
            borderWidth: 1,
          },
          {
            label: 'Revenue',
            data: [30000, 40060, 10500, 20550, 38500, 38000],
            backgroundColor: 'rgba(221, 79, 70,0.2)',
            borderColor: 'rgb(221, 79, 70)',
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
          position: 'bottom',
        },

        title: {
          display: true,
          text: 'Revenue',
          align: 'end',
        },

        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  methods: {
    fillData() {
      // @ts-ignore
      this.dataCollection = {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        dataSets: [
          {
            label: 'Temp (C)',
            backgroundColor: '#e8f3ff',
            borderColor: 'lightblue',
            pointBackgroundColor: 'blue',
            borderWidth: 1,
            pointBorderColor: 'blue',
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        ],
      };
    },

    ...mapMutations({
    }),

    ...mapActions({
      
    }),

    transactionStatus(status: any) {
      let name;
      switch (status) {
        case 'SUCCESS':
          return (name = 'tick');
        case 'FAILED':
          return (name = 'pending');
        default:
          return (name = 'pending');
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.fillData();
    });
  },
});
</script>

<style lang="scss">
.ant-btn {
  border: none;
}

.table-heading {
  .ant-table-fixed {
    .ant-table-thead > tr > th {
      color: #fff;
      border-bottom: 1px solid #e8e8e8;
      @apply bg-primary-sec-alt px-3 py-2;
    }

    .ant-table-tbody > tr > td {
      padding: 6px 6px;
    }
    .ant-table-tbody > tr.ant-table-row:hover > td {
      background: none !important;
    }
  }
}

// .ant-table-fixed-header > .ant-table-content > .ant-table-scroll > .ant-table-body {
//   @apply bg-primary-table
// }

.grid-cols-h-competitions {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.min-w-40 {
  min-width: 10rem;
}

.first_admin {
  min-height: 120px;
  display: grid;
  grid-template-columns: 1fr 450px;
  gap: 0.5rem;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .first_admin {
    min-height: 120px;
    display: block;
  }
}

@media only screen and (max-width: 768px) {
  .first_admin {
    min-height: 120px;
    grid-template-columns: 1fr 350px;
  }
}

.grid-temp-btn {
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}

.quick_table {
  min-height: 120px;
}

.quick_look {
  max-width: 510px;
}

.overview_table {
  border-collapse: collapse;
  table-layout: fixed;
  border-spacing: 0;
  width: 100%;
}

.overview_table,
.download_table {
  font-size: 12px;
}

.overview_table td,
.overview_table th,
.download_table td,
.download_table th {
  padding: 6px 8px;
  @apply border-none;
  // @apply border border-gray-500;
}

.overview_table tr:nth-child(even),
.download_table tr:nth-child(even) {
  // background: #f4f4f4;
}

.quick_table td,
.quick_table th {
  @apply border border-gray-500;
}

.unread {
  @apply text-green-600;
}

.ant-table-body,
.ant-table-placeholder,
.ant-table-fixed-header > .ant-table-content > .ant-table-scroll > .ant-table-body {
  @apply bg-primary-table;
}

.opa:hover {
  opacity: 0.8;
}
</style>
