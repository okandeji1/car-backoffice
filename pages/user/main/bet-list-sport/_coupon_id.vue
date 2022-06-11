<template>
  <main>
    <lazy-car-user-header :title="pageTitle" icon="paper">
      <template v-slot:close>
        <svg-icon name="back-arrow" @click="back" class="inline w-4 h-4 cursor-pointer fill-current"></svg-icon>
        <span class="ml-2 text-sm cursor-pointer"> Back </span>
      </template>
    </lazy-car-user-header>

    <div class="m-4">
      <div class="general">
        <lazy-car-user-header size="small" title="General Details" icon="half-menu"> </lazy-car-user-header>
        <div class="ticket__general">
          <div class="ticket__general-item">
            <div>Ticket Number:</div>
            <div class="flex justify-between">
              <span>{{ couponId }}</span>

              <div class="ticket__general-actions">
                <button @click="showCouponModal" class="text-xs">
                  <svg-icon name="reprint" class="hidden w-3 h-3 mr-1 fill-current md:inline"></svg-icon> Rebet
                </button>
                <button class="text-xs"><svg-icon name="s-print" class="hidden w-3 h-3 mr-1 fill-current md:inline"></svg-icon> Print</button>
              </div>
            </div>
          </div>
          <div class="ticket__general-item">
            <div>Date:</div>
            <div>{{ dayjs().format('DD MMM YYYY, hh:mma') }}</div>
          </div>
          <div class="ticket__general-item">
            <div>Bet Type:</div>
            <div>{{ couponId }}</div>
          </div>
        </div>
      </div>
      <div class="information">
        <lazy-car-user-header size="small" title="Coupon Information" icon="dollar-coin"> </lazy-car-user-header>
        <div class="ticket__information">
          <div class="ticket__information-item">
            <div>Status:</div>
            <div>Running</div>
          </div>
          <div class="ticket__information-item">
            <div>Game Type:</div>
            <div>Multiple</div>
          </div>
          <div class="ticket__information-item">
            <div>Selections:</div>
            <div>4</div>
          </div>
          <div class="ticket__information-item">
            <div>Odds:</div>
            <div>40.74</div>
          </div>
          <div class="ticket__information-item">
            <div>Settled Date:</div>
            <div>{{ dayjs().format('DD MMM YYYY, hh:mma') }}</div>
          </div>
          <div class="ticket__information-item">
            <div>Odds:</div>
            <div>40.74</div>
          </div>
          <div class="ticket__information-item">
            <div>Stake:</div>
            <div>100.00</div>
          </div>
          <div class="ticket__information-item">
            <div>Potential Winning (No Bonus):</div>
            <div>4,073.96</div>
          </div>
          <div class="ticket__information-item">
            <div>Max Bonus:</div>
            <div>203.70</div>
          </div>
          <div class="ticket__information-item">
            <div>Potential Winning:</div>
            <div>4,277.66</div>
          </div>
          <div class="ticket__information-item">
            <div>Confirmed Winning:</div>
            <div>-</div>
          </div>
        </div>
      </div>
      <div class="event-list">
        <lazy-car-user-header size="small" title="Event List" icon="event"> </lazy-car-user-header>

        <a-table bordered :columns="eventColumns" :scroll="{ x: 'calc(700px + 50%)', y: 420 }" :pagination="false"> </a-table>
      </div>
    </div>

    <lazy-car-coupon-modal v-if="isCouponModalOpened" @close-modal="closeCouponModal" />
  </main>
</template>

<script>
import dayjs from 'dayjs';
const eventColumns = [
  { title: 'Event ID', dataIndex: 'reference', key: 'reference' },
  { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Event', dataIndex: 'narration', key: 'narration' },
  { title: 'Market', dataIndex: 'amount', key: 'amount' },
  { title: 'Type', dataIndex: 'status', key: 'status' },
  { title: 'Odds', dataIndex: 'odds', key: 'odds' },
  { title: 'Result', dataIndex: 'result', key: 'result' },
  { title: 'Banker', dataIndex: 'banker', key: 'banker' },
  { title: 'Outcome', dataIndex: 'outcome', key: 'outcome' },
];

export default {
  data() {
    return {
      eventColumns,
      couponId: this.$route.params.coupon_id,
      isCouponModalOpened: false,
    };
  },

  computed: {
    pageTitle() {
      return `Coupon ${this.couponId}`;
    },
  },

  methods: {
    dayjs,
    back() {
      console.log('click');
      this.$router.back();
    },
    showCouponModal() {
      this.isCouponModalOpened = true;
    },
    closeCouponModal() {
      this.isCouponModalOpened = false;
    },
  },

  created() {
    console.log(this.$route.params.coupon_id);
  },
};
</script>

<style lang="scss" scoped>
.general,
.information {
  margin-bottom: 16px;
}

.ticket {
  &__general {
    margin-bottom: 16px;

    &-item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 4px 16px;

      // &:nth-child(odd) {
      //   background: #eef2fa;
      // }

      &:not(:last-child) {
        @apply border-b border-gray-500;
      }

      :nth-child(1) {
        text-align: right;
      }

      :nth-child(2):not(button) {
        margin-left: 16px;
      }
      @media only screen and (min-width: 560px) {
        grid-template-columns: 1fr 4fr;
      }
    }

    &-actions {
      button {
        padding: 2px 8px;
        border-radius: 6px;
        @apply border border-primary-m-warning text-primary-m-warning cursor-pointer;
      }
    }
  }
  &__information {
    margin-bottom: 16px;

    &-item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 4px 16px;

      &:not(:last-child) {
        @apply border-b border-gray-500;
      }

      :nth-child(1) {
        text-align: right;
      }
      :nth-child(2) {
        margin-left: 16px;
      }

      &:last-child {
        @apply bg-primary-m-success text-white;
      }

      @media only screen and (min-width: 560px) {
        grid-template-columns: 1fr 4fr;
      }
    }
  }
}
</style>
