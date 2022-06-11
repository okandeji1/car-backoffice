<template>
  <main>
    <lazy-car-user-header title="Cash Desk" icon="cashier-desk" />
    <a-table
      class="p-2"
      :columns="cashDeskColumns"
      :data-source="searchQuery.length > 0 ? searchQuery : desk"
      :pagination="false"
      :scroll="{ x: true }"
      bordered
    >
      <template slot="sn" slot-scope="index, record" class="flex-row felx">
        <span>
          <button @click="cancel(record)"><svg-icon name="trash" class="w-4 h-4 fill-current text-error" /></button>
        </span>
      </template>
      <template slot="SmartBetCode" slot-scope="index, record">
        <div>
          <span v-if="record.SmartBetCode">
            <a-input class="px-2 control-basic" :value="record.SmartBetCode" @change="(e) => edit(e.target.value, record)" />
          </span>
          <span v-else>
            <a-input class="px-2 control-basic" @change="(e) => handleChange(e.target.value, record)" />
          </span>
        </div>
      </template>
      <template slot="ItemDate" slot-scope="index, record">
        <span v-if="record.ItemDate">{{ $dayjs(record.ItemDate).format('DD MMM HH:mm') }}</span>
        <span v-else></span>
      </template>
      <template slot="OddName" slot-scope="index, record">
        <div>
          <span v-if="record.OddsCollection">
            <a-input
              ref="smartCodeInput"
              class="px-2 control-basic"
              :value="record.OddsCollection[0].MatchOdds[0].OddAttribute.OddName"
              @change="(e) => changeOdd(e.target.value, record)"
              @keydown.tab.prevent="processTags()"
            />
          </span>
          <span v-else>
            <a-input class="px-2 control-basic" />
          </span>
        </div>
      </template>
      <template slot="OddOutcome" slot-scope="index, record">
        <div>
          <span v-if="record.OddsCollection">
            {{ record.OddsCollection[0].MatchOdds[0].Outcome.OddOutcome }}
          </span>
        </div>
      </template>
    </a-table>
    <div class="flex p-2">
      <button @click="handleAdd"><svg-icon name="plus" class="w-4 h-4 fill-current" /></button>
    </div>
    <div class="flex flex-col justify-center p-2 md:flex-row">
      <div class="flex flex-col justify-between md:flex-row">
        <div class="flex p-2 my-2 rounded bg-basic-400 md:mr-2">{{ $t('pool.betMenu.totalCombinations') }}: 0</div>
        <div class="flex p-2 my-2 rounded bg-basic-400 md:mr-2">{{ $t('pool.betMenu.minBonus') }}: 0</div>
        <div class="flex p-2 my-2 rounded bg-basic-400 md:mr-2">{{ $t('pool.betMenu.minWinning') }}: 0</div>
      </div>
      <div class="flex items-center justify-between">
        <h3 class="mr-2">{{ $t('pool.betMenu.stake') }}</h3>
        <input type="text" class="px-2 control-basic" name="" id="" />
      </div>
    </div>
    <div class="flex flex-col justify-center p-2 md:flex-row">
      <div class="flex flex-col justify-between md:flex-row">
        <div class="flex p-2 my-2 rounded bg-basic-400 md:mr-2">{{ $t('components.rightMenu.totalOdds') }}: 0</div>
        <div class="flex p-2 my-2 rounded bg-basic-400 md:mr-2">{{ $t('pool.betMenu.maxBonus') }}: 0</div>
        <div class="flex p-2 my-2 rounded bg-basic-400 md:mr-2">{{ $t('components.rightMenu.totalWinnings') }}: 0</div>
      </div>
      <div class="flex justify-between">
        <button class="my-2 btn-filled-error md:mr-2">{{ $t('user.sport.cancel') }}</button>
        <button class="my-2 btn-filled-success md:mr-2">{{ $t('user.sport.proceed') }}</button>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue';

const cashDeskColumns = [
  {
    title: '',
    key: 'sn',
    dataIndex: 'sn',
    scopedSlots: { customRender: 'sn' },
  },
  {
    title: 'Event ID',
    key: 'SmartBetCode',
    dataIndex: 'SmartBetCode',
    scopedSlots: { customRender: 'SmartBetCode' },
  },
  {
    title: 'Date',
    key: 'ItemDate',
    dataIndex: 'ItemDate',
    scopedSlots: { customRender: 'ItemDate' },
  },
  {
    title: 'Event Name',
    key: 'ItemName',
    dataIndex: 'ItemName',
    scopedSlots: { customRender: 'ItemName' },
  },
  {
    title: 'Smart Code',
    key: 'OddName',
    dataIndex: 'OddName',
    scopedSlots: { customRender: 'OddName' },
  },
  {
    title: 'Odd Value',
    key: 'OddOutcome',
    dataIndex: 'OddOutcome',
    scopedSlots: { customRender: 'OddOutcome' },
  },
  {
    title: 'League',
    key: 'TournamentName',
    dataIndex: 'TournamentName',
    scopedSlots: { customRender: 'TournamentName' },
  },
];
const desk = [
  {
    SmartBetCode: '',
    ItemDate: '',
    ItemName: '',
    OddsCollection: '',
    OddOutcome: '',
    TournamentName: '',
  },
];

export default Vue.extend({
  // // layout: 'user',
  data() {
    return {
      cashDeskColumns,
      searchQuery: [],
      desk,
      visible: false,
    };
  },
  methods: {
    async handleChange(value: any, column: any) {
      if (value.length < 5) {
        return null;
      }
      try {
        //   Get most popular event
        let res = await this.$axios.$get('/api/v1/sportbook/feeds/prematch/matches/most-popular');
        const target = res[0].AreaMatches[0].Items.filter((item) => {
          return item;
        }).find((i) => i.SmartBetCode == value);
        if (target) {
          // Check if search has data
          if (this.searchQuery.length > 0) {
            const newData = [...this.searchQuery];
            newData.splice(newData.indexOf(column), 1, target);
            this.$refs.smartCodeInput.focus();
            this.searchQuery = newData;
          } else {
            this.$refs.smartCodeInput.focus();
            this.searchQuery.push(target);
          }
        } else {
          this.$notification.error({
            message: 'You have entered an incorrect event ID',
          });
        }
      } catch (error) {}
    },
    async edit(key: any, column: any) {
      const newData = [...this.searchQuery];
      if (key.length < 5) {
        // Make all the row empty
        column.SmartBetCode = key;
        column.ItemDate = '';
        column.ItemName = '';
        column.OddsCollection[0].MatchOdds[0].OddAttribute.OddName = '';
        column.OddsCollection[0].MatchOdds[0].Outcome.OddOutcome = '';
        column.TournamentName = '';
        // Get the column index and replace it
        newData.splice(newData.indexOf(column), 1, column);
        // Update the table
        return (this.searchQuery = newData);
      }
      // Get new data from the api
      let res = await this.$axios.$get('/api/v1/sportbook/feeds/prematch/matches/most-popular');
      const target = res[0].AreaMatches[0].Items.filter((item) => {
        return item;
      }).find((i) => i.SmartBetCode == key);
      if (target) {
        // Replace the old data with the new data gotten from api
        newData.splice(newData.indexOf(column), 1, target);
        // Update the table
        this.searchQuery = newData;
        this.$refs.smartCodeInput.focus();
      } else {
        this.$notification.error({
          message: 'You have entered an incorrect event ID',
        });
        return this.searchQuery;
      }
    },
    // Change odd value
    async changeOdd(odd: any, column: any) {
      let cap = odd.charAt(0).toUpperCase() + odd.slice(1);
      // Create new instance of search query
      const newData = [...this.searchQuery];
      if (cap === '' || typeof cap === undefined) {
        column.OddsCollection[0].MatchOdds[0].Outcome.OddOutcome = '';
        newData.splice(newData.indexOf(column), 1, column);
        return;
      }
      // Get the Odd values
      column.OddsCollection.forEach((element) => {
        element.MatchOdds.forEach((item) => {
          // Compare the odds
          if (item.OddAttribute.OddName === cap) {
            // Update the column odd value
            column.OddsCollection[0].MatchOdds[0].Outcome.OddOutcome = item.Outcome.OddOutcome;
            column.OddsCollection[0].MatchOdds[0].OddAttribute.OddName = item.OddAttribute.OddName;
            // Update the table
            newData.splice(newData.indexOf(column), 1, column);
          }
        });
      });
    },
    handleAdd() {
      const newData = {
        SmartBetCode: '',
        ItemDate: '',
        ItemName: '',
        OddsCollection: '',
        OddOutcome: '',
        TournamentName: '',
      };
      if (this.searchQuery.length > 0) {
        // this.searchQuery.push(newData);
        this.searchQuery = [...this.searchQuery, newData];
      } else {
        this.desk = [...this.desk, newData];
      }
    },
    cancel(column: any) {
      const newData = [...this.searchQuery];
      if (this.searchQuery.length > 0) {
        // Get the column index delete it
        newData.splice(newData.indexOf(column), 1);
        // Update the table
        return (this.searchQuery = newData);
      } else {
        if (this.desk.length === 1) {
          this.$notification.error({
            message: 'You cannot delete the last index',
          });
        } else {
          const newData = [...this.desk];
          // delete column;
          newData.splice(newData.indexOf(column), 1);
          return (this.desk = newData);
        }
      }
    },
    // On pressing tab key, add new row
    processTags(event: any) {
      this.handleAdd();
    },
  },
});
</script>
