<template>
  <main>
    <lazy-car-user-header title="Bonuses" icon="transaction-list" />

    <a-tabs type="card">
      <a-tab-pane key="1" tab="Overview">
        <div v-if="loggedInUser.role == 'agent'">
          <base-notification icon="info">
            <template #text>
              <span>The sales recorded are based on settled date and not transaction date.</span>
            </template>
          </base-notification>

          <lazy-car-user-header size="small" bgColor="secondary" title="General Overview" icon="transaction-list" class="mt-6" />

          <div class="date">
            <div class="date__selector">
              <span class="text-lg md:text-primary-default-main">Week starting from:</span>
              <div class="text-primary-default-main" v-for="period in periods" :key="period.id">
                <button
                  @click="onSelect(period)"
                  :class="[isActive == period.slug ? 'browny' : '']"
                  class="flex flex-row items-center justify-center px-4 mx-1 font-light uppercase rounded-md h-88"
                >
                  {{ period.name }}
                </button>
              </div>

              <a-date-picker format="DD-MM-YYYY" :disabled-date="disabledDate" />
            </div>
          </div>

          <div>
            <div class="bonus">
              <div class="bonus__container">
                <div class="bonus__box">
                  <div class="flex justify-end w-full p-2 bonus__icon">
                    <svg-icon name="info" class="w-6 h-6 fill-current text-primary-default-main"></svg-icon>
                  </div>
                  <div class="bonus__circle">
                    <svg-icon name="close" class="w-16 h-16 fill-current text-primary-default-main"></svg-icon>
                  </div>
                  <div class="bonus__text">
                    <span> Target Archived </span>
                    <div class="divider"></div>
                    <div class="bonus__text--small">
                      <span>Turnovr for the week</span>
                      <span>21/02/2022 to 27/02/2022</span>
                    </div>
                  </div>
                  <div class="bomus__img"></div>
                </div>
                <div class="bonus__footer">
                  <span>Virtual Bonus</span>
                  <svg-icon name="arrow" class="w-4 h-4 fill-current"></svg-icon>
                </div>
              </div>

              <div class="bonus__container">
                <div class="bonus__box">
                  <div class="flex justify-end w-full p-2 bonus__icon">
                    <svg-icon name="info" class="w-6 h-6 fill-current text-primary-default-main"></svg-icon>
                  </div>
                  <div class="bonus__circle">
                    <svg-icon name="pause" class="w-16 h-16 fill-current text-primary-default-main"></svg-icon>
                  </div>
                  <div class="bonus__text">
                    <span> In Progress </span>
                    <div class="divider"></div>
                    <div class="bonus__text--small">
                      <span> Turnovr for the week </span>
                      <span>21/02/2022 to 27/02/2022</span>
                    </div>
                  </div>
                  <div class="bomus__img"></div>
                </div>

                <div class="bonus__footer">
                  <span>Sport Bonus</span>
                  <svg-icon name="arrow" class="w-4 h-4 fill-current"></svg-icon>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loggedInUser.role == 'tenant'">
          <div v-if="loggedInUser.role == 'tenant'" id="transaction-filter" class="m-4 bg-primary-btn-tert">
            <lazy-car-user-header size="small" title="Bonus Overview" icon="transaction-list" />

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
                      <a-date-picker name="startDate" :default-value="startFrom" v-model="query.startDate" />
                    </div>
                  </div>
                  <div>
                    <div class="date">
                      <label class="mb-1 text-sm font-medium" for="transactions-filter-from">Date To</label>
                      <a-date-picker name="endDate" :default-value="startTo" v-model="query.endDate" />
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
              <a-button class="inline w-full my-3 text-white bg-primary-m-danger md:w-40">Reset</a-button>
              <a-button class="inline w-full my-3 text-white md:w-40 bg-primary-m-success" :loading="dataIsLoading">Apply</a-button>
            </div>
          </div>

          <div class="flex items-center justify-between w-full px-3">
            <LazyBetBaseInput placeholder="Search" class="w-2/4 mb-3 md:w-1/4" />
            <lazy-car-export-excel
              :csvData="{
                records: getUsers,
                fileName: 'BONUSES REPORT',
                source: 'BONUSES',
                disabled: getUsers ? false : true,
              }"
            />
          </div>
          <div class="px-4">
            <a-table v-if="!dataIsLoading" :columns="columns" :data-source="data" :scroll="{ x: 'calc(700px + 50%)' }" bordered>
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
        </div>
      </a-tab-pane>

      <a-tab-pane key="2" tab="Virtual Bonus">
        <div v-if="loggedInUser.role == 'agent'">
          <base-notification icon="info">
            <template v-slot:text>
              <span>
                Virtual Bonus applies if you trade at least 3 times in a week with a minimum of 50 bets daily and a minimum of N100,000 turnover on
                all virtual products in a week.
              </span>
            </template>
          </base-notification>

          <lazy-car-user-header size="small" bgColor="secondary" title="Weekly Overview" icon="transaction-list" class="mt-6" />

          <div class="weekly-overview date">
            <div class="date__selector">
              <span class="text-lg md:text-primary-default-main">Week starting from:</span>
              <div v-for="period in periods" :key="period.id" class="text-primary-default-main">
                <button
                  @click="onSelect(period)"
                  :class="[isActive == period.slug ? 'browny' : '']"
                  class="flex flex-row items-center justify-center px-4 mx-1 font-light uppercase rounded-md h-88"
                >
                  {{ period.name }}
                </button>
              </div>

              <a-date-picker format="DD-MM-YYYY" :disabled-date="disabledDate" />
            </div>
            <div class="flex items-center justify-around pt-12 weekly-overview__progress-bar">
              <div class="icon-box">
                <svg-icon name="jogging" class="inline-block w-8 h-8 fill-current"></svg-icon>
              </div>

              <div class="weekly-overview__progress-bar--wrapper">
                <div class="weekly-overview__progress-bar--app">
                  <div class="flex w-full">
                    <div class="progress-stage" style="width: 90%"></div>
                    <svg-icon name="rounded-triangle" class="inline-block w-6 h-6 fill-current text-primary-m-warning r-triangle"></svg-icon>
                  </div>

                  <!-- <div class="status-modal">
                  <h3>
                    Curent Status:
                    <span> Level 4 </span>
                  </h3>

                  <span>Stake in NGN: 1756653/1000000</span>
                  <div class="weekly-overview__progress-bar--app">
                    <div class="progress-stage" style="width: 100%"></div>
                  </div>
                  <span>Daily target reached : {{ dailyBetTargetReached }}/ {{ requiredDailyBetTarget }} </span>
                  <div class="weekly-overview__progress-bar--app">
                    <div class="progress-stage" style="width: 100%"></div>
                  </div>

                  <span>Daily target reached : {{ numberOfDaysTraded }}/ {{ requiredTradingDays }} </span>
                  <div class="weekly-overview__progress-bar--app">
                    <div class="progress-stage" style="width: 100%"></div>
                  </div>

                  <span> </span>
                </div> -->
                </div>
                <ul class="steps">
                  <li class="passed" style="width: 25%" v-for="(bonus, index) in bonusModel.requirements">
                    <div class="band">
                      <div class="band__title">Level {{ index + 1 }}</div>
                      <div class="band__circle" @click="showBandModal">
                        <span></span>
                      </div>
                      <div class="band__modal">
                        <h3>Level {{ bonus.level }} requirements</h3>
                        <span>
                          Weekly stake target: <b> {{ $n(Math.round(Number(bonus.weeklyStakeTarget) / 10) * 10, 'currency') }} </b>
                        </span>
                        <span>
                          Daily Bets target: <b> {{ bonus.dailyBetTarget }} </b>
                        </span>
                        <span>
                          Traded Days: <b> {{ bonus.tradedDays }} </b>
                        </span>
                        <span>
                          Bonus Eligible: <b> {{ bonus.eligibleAmount }} </b>
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="icon-box">
                <svg-icon name="cup" class="inline-block w-6 h-6 fill-current"></svg-icon>
              </div>
            </div>
            <div class="weekly-overview__visuals">
              <div class="weekly-overview__visuals-pie-chart">
                <div class="turnover">
                  <div class="turnover__title">
                    <h1 class="text-primary-default-main">Turnover for the week</h1>
                    <h2 class="text-primary-default-main">{{ firstDayOfTheWeek }} To {{ lastDayOfTheWeek }}</h2>
                  </div>

                  <div class="turnover__pie-chart">
                    <div class="inner-circle" style="width: 250px; height: 250px">
                      <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" width="175" height="175">
                        <circle cx="50" cy="50" r="50" class="circle" stroke-width="15" stroke="#fff" fill="transparent"></circle>
                      </svg>
                      <div class="inner-circle_pos" style="width: 200px; height: 200px; background: #ba85c4">
                        <strong>₦191,912.44</strong><span>Out of&nbsp;₦1,000,000.00</span>
                      </div>
                      <svg viewBox="0 0 100 100" width="250" height="250" style="position: absolute; transform: rotate(-90deg); overflow: visible">
                        <circle
                          cx="50"
                          cy="50"
                          r="50"
                          stroke-width="15"
                          stroke="#ba85c4"
                          fill="transparent"
                          stroke-dashoffset="Infinity"
                          stroke-dasharray="315"
                        ></circle>
                      </svg>
                    </div>
                  </div>

                  <div class="turnover__footer">
                    <button @click="">Bonus Earned ₦0</button>
                  </div>
                </div>
              </div>
              <div class="weekly-overview__visuals-progress">
                <div class="progress">
                  <div class="progress__body" v-for="progress in dailyProgress" :key="progress.id">
                    <div class="progress__day">{{ progress.day.slice(0, 3) }}</div>
                    <div class="progress__start-bet">{{ startBet }} Bets</div>
                    <div class="progress__bar">
                      <div data-v-65c41c1c="" class="flex w-full">
                        <div data-v-65c41c1c="" class="progress-stage" style="width: 90%">
                          <span>{{ progress.value }} Bets</span>
                        </div>
                      </div>
                    </div>
                    <div class="progress__end-bet">{{ betTarget }} Bets</div>
                    <div class="progress__icon">
                      <svg-icon name="tick" class="w-4 h-4 fill-current text-primary-m-success"></svg-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loggedInUser.role == 'tenant'">
          <div v-if="loggedInUser.role == 'tenant'" id="transaction-filter" class="m-4 bg-primary-btn-tert">
            <lazy-car-user-header size="small" title="Virtual Bonus" icon="transaction-list" />

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
                      <a-date-picker name="startDate" :default-value="startFrom" v-model="query.startDate" />
                    </div>
                  </div>
                  <div>
                    <div class="date">
                      <label class="mb-1 text-sm font-medium" for="transactions-filter-from">Date To</label>
                      <a-date-picker name="endDate" :default-value="startTo" v-model="query.endDate" />
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
              <a-button class="inline w-full my-3 text-white bg-primary-m-danger md:w-40">Reset</a-button>
              <a-button class="inline w-full my-3 text-white md:w-40 bg-primary-m-success" :loading="dataIsLoading">Apply</a-button>
            </div>
          </div>

          <div class="flex items-center justify-between w-full px-3">
            <LazyBetBaseInput placeholder="Search" class="w-2/4 mb-3 md:w-1/4" />
            <lazy-car-export-excel
              :csvData="{
                records: getUsers,
                fileName: 'BONUSES REPORT',
                source: 'BONUSES',
                disabled: getUsers ? false : true,
              }"
            />
          </div>
          <div class="px-4">
            <a-table v-if="!dataIsLoading" :columns="virtualColumns" :data-source="virtualData" :scroll="{ x: 'calc(700px + 50%)' }" bordered>
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
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Sport Bonus">
        <!-- <button @click="fetchBanks">Get banks</button>

        <pre>
          {{ getBanks }}
        </pre> -->

        <div v-if="loggedInUser.role == 'tenant'">
          <div v-if="loggedInUser.role == 'tenant'" id="transaction-filter" class="m-4 bg-primary-btn-tert">
            <lazy-car-user-header size="small" title="Sport Bonus" icon="transaction-list" />

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
                      <a-date-picker name="startDate" :default-value="startFrom" v-model="query.startDate" />
                    </div>
                  </div>
                  <div>
                    <div class="date">
                      <label class="mb-1 text-sm font-medium" for="transactions-filter-from">Date To</label>
                      <a-date-picker name="endDate" :default-value="startTo" v-model="query.endDate" />
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
              <a-button class="inline w-full my-3 text-white bg-primary-m-danger md:w-40">Reset</a-button>
              <a-button class="inline w-full my-3 text-white md:w-40 bg-primary-m-success" :loading="dataIsLoading">Apply</a-button>
            </div>
          </div>

          <div class="flex items-center justify-between w-full px-3">
            <LazyBetBaseInput placeholder="Search" class="w-2/4 mb-3 md:w-1/4" />
            <lazy-car-export-excel
              :csvData="{
                records: getUsers,
                fileName: 'BONUSES REPORT',
                source: 'BONUSES',
                disabled: getUsers ? false : true,
              }"
            />
          </div>
          <div class="px-4">
            <a-table v-if="!dataIsLoading" :columns="sportColumns" :data-source="sportData" :scroll="{ x: 'calc(700px + 50%)' }" bordered>
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
        </div>
      </a-tab-pane>
    </a-tabs>
  </main>
</template>
<script>
import Vue from 'vue';
// import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import dayjs from 'dayjs';
import moment from 'moment';
import baseNotification from '~/components/base-notification.vue';

const query = {
  product: 'SPORT',
  startDate: moment().endOf('isoweek').format('DD-MM-YYYY'),
  endDate: moment().startOf('isoweek').format('DD-MM-YYYY'),
};

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    width: '18%',
  },
  {
    title: 'Virtual Bonus',
    dataIndex: 'vbonus',
    width: '15%',
    key: 'vbonus',
  },
  {
    title: 'Sport Bonus',
    dataIndex: 'sbonus',
    width: '15%',
    key: 'sbonus',
  },
  {
    title: 'Total Bonus',
    dataIndex: 'bonus',
    width: '20%',
    key: 'bonus',
  },
];

const virtualColumns = [
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    width: '20%',
  },
  {
    title: 'Virtual Bonus',
    dataIndex: 'vbonus',
    width: '30%',
    key: 'vbonus',
  },
];

const sportColumns = [
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    width: '20%',
  },
  {
    title: 'Virtual Bonus',
    dataIndex: 'vbonus',
    width: '30%',
    key: 'vbonus',
  },
];

const data = [
  {
    key: 1,
    username: 'MA-LA-0001',
    role: 'Master Agent',
    vbonus: '60,000',
    sbonus: '34,000',
    bonus: '200,000',
    children: [
      {
        key: 12,
        username: 'SA-LA-0001',
        role: 'Super Agent',
        vbonus: '12,000',
        sbonus: '6,500',
        bonus: '80,000',
        children: [
          {
            key: 121,
            username: 'LA-IKD-0001',
            role: 'Agent',
            vbonus: '4,000',
            sbonus: '3,560',
            bonus: '12,000',
          },
        ],
      },
    ],
  },
  {
    key: 2,
    username: 'MA-ABJ-0001',
    role: 'Master Agent',
    vbonus: '0.00',
    sbonus: '0.00',
    bonus: '0.00',
  },
];

export default Vue.extend({
  components: { baseNotification },
  computed: {
    ...mapGetters({
      getSalesReport: 'user/getSalesReport',
      loggedInUser: 'loggedInUser',
      getUsers: 'user/getUsers',
      getBanks: 'user/getBanks',
    }),
    message() {
      return `Power Bonus Turnover for the - ${this.startTo} - ${this.startFrom}`;
    },

    firstDayOfTheWeek() {
      return moment().startOf('isoweek').format('DD/MM/YYYY');
    },

    lastDayOfTheWeek() {
      return moment().endOf('isoweek').format('DD/MM/YYYY');
    },

    currentTargetPercentage() {
      Number(this.dailyBetTargetReached) / Number(this.requiredDailyBetTarget) >= 1
        ? '100%'
        : Math.round(Number(this.dailyBetTargetReached) / Number(this.requiredDailyBetTarget)) * 100;
      return;
    },
    currentTradedDaysPercentage() {
      Number(this.numberOfDaysTraded) / Number(this.requiredTradingDays) >= 1
        ? '100%'
        : Math.round(Number(this.numberOfDaysTraded) / Number(this.requiredTradingDays)) * 100;
      return;
    },
  },
  data() {
    return {
      columns,
      virtualColumns,
      sportColumns,
      data,
      dateFormat: 'DD/MM/YYYY',
      isLoading: false,
      query,
      percent: 0,
      startBet: '0',
      betTarget: '50',
      numberOfDaysTraded: '4',
      dailyBetTargetReached: '7',
      stakedAmount: 1007283,
      requiredDailyBetTarget: '3',
      requiredTradingDays: '3',
      bonusModel: {
        steps: 4,
        requirements: [
          {
            id: 0,
            weeklyStakeTarget: '99999',
            dailyBetTarget: '50',
            tradedDays: '3',
            eligibleAmount: '2000',
            level: 1,
          },
          {
            id: 1,
            weeklyStakeTarget: '299999',
            dailyBetTarget: '50',
            tradedDays: '3',
            eligibleAmount: '8000',
            level: 2,
          },
          {
            id: 2,
            weeklyStakeTarget: '499999',
            dailyBetTarget: '50',
            tradedDays: '3',
            eligibleAmount: '10000',
            level: 3,
          },
          {
            id: 3,
            weeklyStakeTarget: '999999',
            dailyBetTarget: '50',
            tradedDays: '3',
            eligibleAmount: '15000',
            level: 4,
          },
          {
            id: 4,
            weeklyStakeTarget: '1999999',
            dailyBetTarget: '50',
            tradedDays: '3',
            eligibleAmount: '20000',
            level: 5,
          },
        ],
      },
      periods: [
        {
          id: 1,
          name: 'Manual',
          slug: 'MANUAL',
          isActive: false,
        },

        {
          id: 3,
          name: 'Current Week',
          slug: 'CURRENT_WEEK',
          isActive: true,
        },

        {
          id: 6,
          name: 'Last Week',
          slug: 'LAST_WEEK',
          isActive: false,
        },
      ],
      dailyProgress: [
        {
          id: 0,
          day: 'Monday',
          value: '5',
        },

        {
          id: 1,
          day: 'Tuesday',
          value: '224',
        },
        {
          id: 2,
          day: 'Wednesday',
          value: '224',
        },
        {
          id: 3,
          day: 'Thursday',
          value: '455',
        },
        {
          id: 4,
          day: 'Friday',
          value: '312',
        },
        {
          id: 5,
          day: 'Saturday',
          value: '123',
        },
        {
          id: 6,
          day: 'Sunday',
          value: '654',
        },
      ],
      selectedResult: 'All',
      selectedPeriod: 'MANUAL',
      selectedProduct: 'MANUAL',
      dataIsLoading: false,
      isActive: 'CURRENT_WEEK',
      // isChannelActive: 'sport',
      startTo: moment().endOf('isoweek').format('DD-MM-YYYY'),
      startFrom: moment().startOf('isoweek').format('DD-MM-YYYY'),
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
    changeRoute() {
      this.$router.push({ path: '/user/reports/bonuses?tab=transactions' });
    },

    disabledDate(current) {
      return moment(current).day() !== 1;
    },
    onSelect(e) {
      console.log(e.slug);
      switch (e.slug) {
        case 'MANUAL':
          this.query.startDate = this.startFrom;
          this.query.endDate = this.startTo;
          this.isActive = e.slug;
          return;
        case 'LAST_WEEK':
          this.query.startDate = moment().subtract(1, 'week').startOf('week').add(1, 'days').format('YYYY-MM-DD');
          this.query.endDate = moment().subtract(1, 'week').endOf('week').add(1, 'days').format('YYYY-MM-DD');
          this.isActive = e.slug;
          return;
        default:
          this.query.startDate = moment().day('Monday').format('YYYY-MM-DD');
          this.query.endDate = moment().format('YYYY-MM-DD');
          this.isActive = e.slug;
      }
    },

    showBandModal() {
      console.log('showModalJoor');
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

    // selectProduct(product) {
    //   this.isActive = product.slug;
    //   // this.selectedProduct = product;
    // },

    selectStatus(result) {
      this.selectedResult = result.slug;
    },

    ...mapMutations({
      checkBetSlip: 'bet/checkBetSlip',
      setParent: 'user/setParent',
    }),

    ...mapActions({
      getSalesReportApi: 'user/getSalesReportApi',
      fetchBanks: 'user/fetchBanks',
    }),
  },
});
</script>
<style lang="scss" scoped>
.inner-circle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
}

.inner-circle svg {
  transform: rotate(-90deg);
  overflow: visible;
}

.inner-circle_pos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 100%;
  text-align: center;
  overflow: hidden;
}

.inner-circle_pos strong {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
}

.inner-circle_pos span {
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  text-transform: uppercase;
}

.weekly-overview {
  &__date {
    @media only screen and (max-width: 768px) {
      .ant-calendar-picker {
        grid-column: 1 / -1;
        grid-row: 3 / 4;
        width: 90%;
        margin: 0.75rem auto;
      }
    }
  }
  &__progress-bar {
    color: #fff;
    width: 100%;
    padding-bottom: 1.5rem;
    @apply text-primary-default-main;

    &--wrapper {
      width: 80%;
    }

    &--app {
      height: 10px;
      width: 100%;
      border-radius: 6px;
      background-color: #ddd;
      // display: flex;
    }

    .status-modal {
      width: 250px;
      height: 200px;
      background-color: #fff;
      color: #000;
      border-radius: 8px;
      padding: 1.2rem 1.5rem;
      overflow: hidden;
      text-align: left;
      opacity: 0;
      position: relative;
      top: 50px;
      left: -100px;
      box-shadow: 0 1.5rem 3rem rgba(#000000, 0.15);
      transition: opacity 0.5s ease-in;
      z-index: 12;

      h3 {
        text-align: center;
        text-transform: uppercase;
        font-weight: 700;
      }

      span {
        font-size: 13px;
        font-weight: 300;
        display: inline-block;
      }

      b {
        margin-left: 0.15rem;
        font-weight: 700;
      }
    }

    .r-triangle {
      margin: 17px -17px;
      cursor: pointer;

      &:hover ~ .status-modal {
        opacity: 0.97;
      }
    }

    .progress-stage {
      height: 10px;
      border-radius: 6px;
      @apply bg-primary-sidebar;
      transition: width 3s ease-in;
      animation-name: progressDelay;
      animation-timing-function: cubic-bezier(0.29, 1.25, 0.42, 1.08);
      animation-duration: 3s;
    }

    .icon-box {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      @apply border-2 border-primary-sidebar;
    }

    @keyframes progressDelay {
      0% {
        width: 0%;
      }

      50% {
        width: 0%;
      }
    }

    ul {
      width: 100%;
      display: flex;
    }

    li {
      list-style: none;
      display: flex;
      justify-content: flex-end;
      top: -15px;
      left: 0;

      .band {
        height: 40px;
        width: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: -2.1rem;
        margin-right: -0.8rem;
        position: relative;

        &__title {
          font-size: 0.7rem;
        }

        &__circle {
          span {
            margin-top: 0.4rem;
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
            @apply bg-primary-m-warning;
          }
        }

        &__modal {
          position: absolute;
          top: 52px;
          width: 250px;
          max-height: 180px;
          color: #000;
          background-color: #fff;
          border-radius: 8px;
          padding: 1rem 1.5rem;
          overflow: hidden;
          text-align: left;
          opacity: 0;
          visibility: hidden;
          z-index: 10;
          box-shadow: 0 1.5rem 3rem rgba(#000000, 0.15);
          transition: opacity 0.5s ease-in, visibility 0.5s ease-in;

          h3 {
            text-align: center;
            text-transform: uppercase;
            font-weight: 700;
          }

          span {
            font-size: 13px;
            font-weight: 300;
            display: inline-block;
          }

          b {
            margin-left: 0.15rem;
            font-weight: 700;
          }
        }

        &__circle:hover ~ .band__modal {
          opacity: 0.97;
          visibility: visible;
        }
      }
    }
  }
  &__visuals {
    display: flex;
    margin: 1rem 0.5rem;
    display: flex;
    @apply text-primary-default-main;

    &-pie-chart {
      flex: 0 0 40%;
      padding: 0.5rem auto;

      @media only screen and (max-width: 768px) {
        display: none;
      }
    }
    &-progress {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}

.turnover {
  &__title {
    text-align: center;
    @apply text-primary-default-main #{!important};

    h1 {
      display: inline-block;
      font-size: 1.4rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    h2 {
      font-size: 1rem;
      font-weight: 300;
    }
  }

  &__footer {
    font-size: 1.1rem;
    width: 80%;
    margin: 0rem auto;
    display: flex;
    justify-content: center;

    button {
      border: none;
      border-radius: 6px;
      margin: 0rem auto;
      padding: 0.75em 1.5rem;
      display: inline-block;
      @apply bg-primary-sidebar text-white;
    }
  }
}

.progress {
  &__body {
    width: 100%;
    display: grid;
    grid-template-columns: 10% 10% 60% 12% 8%;
    align-items: center;
    border: 1px solid #444;
    font-size: 12px;
    padding: 0.4rem 0.5rem;
    height: 50px;
    font-weight: 300;
    justify-items: center;

    &:not(:last-child) {
    }
  }

  &__day {
  }
  &__start-day {
  }
  &__bar {
    width: 90%;
    margin: 0 auto;
    height: 20px;
    font-weight: 400;

    & > div {
      background-color: #ddd;
      height: 100%;
      border-radius: 6px;

      .progress-stage {
        height: 100%;
        width: 83%;
        display: flex;
        justify-content: center;
        @apply bg-primary-sidebar text-white;

        span {
          margin-left: 1.8rem;
          opacity: 1;
          animation: wait 2s ease-in;
        }

        @keyframes wait {
          0% {
            opacity: 0;
          }
        }
      }
    }

    .progress-stage {
      height: 10px;
      border-radius: 6px;
      @apply bg-primary-sidebar;
      transition: width 3s ease-in;
      animation-name: progressDelay;
      animation-timing-function: cubic-bezier(0.29, 1.25, 0.42, 1.08);
      animation-duration: 3s;
    }
  }
  &__end-day {
  }
  &__icon {
  }
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

.date {
  &__selector {
    padding: 1.5rem 1.5rem 0rem 1.5rem;
    display: inline;
    justify-content: center;
    align-items: center;
    width: 90%;

    & > * {
      display: inline-block;
      margin-right: 1.5rem;
      // flex: 0 0 18%;
      // justify-content: flex-start;
      // display: flex;
      // align-items: center;
    }
    & > *:last-child {
      display: inline-block;
      width: 200px;
    }

    @media only screen and (max-width: 960px) {
      width: 100%;
    }

    @media only screen and (max-width: 768px) {
      & > * {
        display: inline-block;
        margin-right: 0rem;
      }
      @apply grid grid-cols-2 py-4 justify-items-center;
      width: 100%;

      .ant-calendar-picker {
        grid-column: 1 / -1;
        grid-row: 3 / 4;
        width: 90%;
        margin: 0.75rem auto;
      }
    }
  }

  .text-sm {
    & > * {
      flex: 0 0 150px;
    }
  }
}

.divider {
  border-bottom: 1px solid #ddd;
  margin: 0.25rem 0;
}

.bonus {
  display: flex;
  justify-content: space-evenly;
  margin: 3rem 1.5rem;

  @media only screen and (max-width: 768px) {
    display: block;
    margin: 0 auto;
  }

  &__container {
    display: block;
    margin: 0 auto;
  }

  &__box {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    height: 304px;
    width: 240px;
    border-radius: 12px;
    margin: 0 auto;
    position: relative;
    border: 1px solid #fff;
    box-shadow: 0 1rem 3rem rgba(#000000, 0.15);
    @apply text-primary-default-main;
  }

  &__footer {
    padding: 1rem 0.5rem;
    display: flex;
    width: 240px;
    border-radius: 6px;
    margin: 1.5rem auto;
    color: #fff;
    justify-content: space-between;
    text-align: center;
    box-shadow: 0 1rem 3rem rgba(#000000, 0.15);
    @apply bg-primary-sidebar;
  }

  &__circle {
    width: 140px;
    height: 140px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    @apply border-2 border-primary-default-main;
  }

  &__text {
    margin: 1rem 0 0 0;
    padding: 0px 25px 10px;
    text-align: center;
    font-size: 18px;

    &--small {
      display: inline-block;
      font-size: 12px;
      font-weight: 300;
    }

    // text-transform: uppercase;
    // font-size: 18px;
  }
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

.info-notification {
  color: #8a6d3b;
  background: #fcf8e3;
}

.bg-img {
  background-image: url('https://www.betking.com/images/bonusDashboard/logo-double-bonus.jpg');
  position: absolute;
  // background:  cover cover contain;
}
</style>
