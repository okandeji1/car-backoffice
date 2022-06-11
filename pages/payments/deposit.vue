<template>
  <div>
    <lazy-car-user-header title="Deposit" icon="menu" />
    <div class="flex items-center bg-primary-event text-primary-default-main">
      <img src="https://res.cloudinary.com/dvuogdjyq/image/upload/v1628432957/logo-secure_ehwlcj.svg" style="height: 88px" />
      <div class="px-2 text-xs text-blackaccountDepositSecurityText">
        <p>
          <span
            ><span
              >These are the default minimum deposit limits. Please be aware that the maximum deposit limit may be below your personal deposit
              transaction limits until verification is successfully completed.</span
            ></span
          >
        </p>
        <p>
          <span
            ><span
              >Internet gambling may be illegal in the jurisdiction in which you are located; if so you are not authorized to use your payment card to
              complete this transaction.</span
            ></span
          >
        </p>
      </div>
    </div>
    <div style="max-width: 780px" class="mx-auto">
      <div class="bg-transparent md:p-6 border-border-secondary accordion">
        <a-collapse expandIconPosition="right" class="deposit-tab">
          <a-collapse-panel
            accordion
            v-for="paymentMethod in paymentMethods"
            :key="paymentMethod.id"
            :header="paymentMethod.name"
            :style="tabStyle"
            class="md:pr-8 md:pl-8 bg-primary-bg-ter text-primary-default-main"
            :disabled="disable"
          >
            <div v-show="paymentMethod.name.endsWith('Transfer')">
              <div class="px-2 my-2 text-xs md:px-8 w-100">
                <div class="whitespace-pre-line">{{ paymentMethod.firstPara }}</div>
              </div>
              <p></p>
              <div>
                <div class="grid grid-cols-1 gap-6 px-2 mb-6 md:px-8">
                  <div class="grid grid-cols-1 gap-4 rounded">
                    <div class="flex flex-col justify-between text-xs font-semibold" v-if="loggedInUser.bankDetails">
                      <span class="mb-1 capitalize text-text-secondary">{{ $t('user.transaction.bankName') }}:</span>
                      <b class="flex flex-row uppercase" v-if="loggedInUser.bankDetails.monnify">{{ loggedInUser.bankDetails.monnify.bankName }}</b>
                      <b class="flex flex-row uppercase" v-else>Wema Bank </b>
                    </div>
                    <div class="flex flex-col justify-between text-xs font-semibold" v-if="loggedInUser">
                      <span class="mb-1 capitalize text-text-secondary">{{ $t('user.transaction.accName') }}:</span
                      ><b class="flex flex-row uppercase"
                        >{{ loggedInUser.username }} ({{ loggedInUser.genealogy.tenant }} {{ $t('user.transaction.account') }})
                      </b>
                    </div>
                    <div class="flex flex-col justify-between text-xs font-semibold">
                      <span class="mb-1 capitalize text-text-secondary">{{ $t('user.transaction.accNumber') }}:</span>
                      <b class="flex flex-row uppercase" v-if="loggedInUser.bankDetails"
                        >{{ loggedInUser.bankDetails.monnify }}
                        <button
                          @click="copyToClipboard(loggedInUser.bankDetails.monnify.accountNumber)"
                          class="flex flex-row items-center justify-center ml-6 font-normal capitalize focus:outline-none"
                        >
                          <svg-icon name="copy" class="w-4 h-3 fill-current" />
                          {{ $t('user.transaction.copy') }}
                        </button></b
                      >
                      <b class="flex flex-row uppercase" v-else>No account number yet (Please contact support)</b>
                    </div>
                  </div>
                  <!-- <button block class="btn-filled-primary">{{ $t('user.transaction.done') }}</button> -->
                </div>
              </div>
            </div>

            <div v-show="paymentMethod.name.endsWith('Paystack')">
              <div class="px-2 my-2 text-xs md:px-8 w-100">
                <div class="whitespace-pre-line">
                  {{ paymentMethod.firstPara }}
                </div>
                <div>
                  <div class="w-full mb-6">
                    <form class="grid grid-cols-1 gap-4" @submit="handleDeposit($event)">
                      <div class="grid grid-cols-1 gap-5">
                        <div class="flex flex-col w-full">
                          <div class="mt-4 input-field">
                            <label class="mb-1 text-xs font-semibold text-text-default"> {{ $t('user.transaction.amount') }} </label>
                            <a-input name="paystack" placeholder="0.00" class="input-style" type="number" />
                          </div>
                        </div>
                      </div>

                      <input type="submit" :value="$t('user.transaction.deposit')" class="btn btn-success" />
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <!-- Flutterwave -->
            <div v-show="paymentMethod.name.endsWith('Flutterwave')">
              <div class="px-2 my-2 text-xs md:px-8 w-100">
                <div class="whitespace-pre-line">
                  {{ paymentMethod.firstPara }}
                </div>
                <div>
                  <div class="w-full mb-6">
                    <form class="grid grid-cols-1 gap-4" @submit="handleDeposit($event)">
                      <div class="grid grid-cols-1 gap-5">
                        <div class="flex flex-col w-full">
                          <div class="mt-4 input-field">
                            <label class="mb-1 text-xs font-semibold text-text-default"> {{ $t('user.transaction.amount') }} </label>
                            <a-input name="flutterwave" placeholder="0.00" class="input-style" type="number" />
                          </div>
                        </div>
                      </div>

                      <input type="submit" :value="$t('user.transaction.deposit')" class="btn btn-success" />
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <!-- Monnify -->
            <div v-show="paymentMethod.name.endsWith('Monnify')">
              <div class="px-2 my-2 text-xs md:px-8 w-100">
                <div class="whitespace-pre-line">
                  {{ paymentMethod.firstPara }}
                </div>
                <div>
                  <div class="w-full mb-6">
                    <form class="grid grid-cols-1 gap-4" @submit="handleDeposit($event)">
                      <div class="grid grid-cols-1 gap-5">
                        <div class="flex flex-col w-full">
                          <div class="mt-4 input-field">
                            <label class="mb-1 text-xs font-semibold text-text-default"> {{ $t('user.transaction.amount') }} </label>
                            <a-input name="monnify" placeholder="0.00" class="input-style" type="number" />
                          </div>
                        </div>
                      </div>

                      <input type="submit" :value="$t('user.transaction.deposit')" class="btn btn-success" />
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div v-show="paymentMethod.name.endsWith('PayDirect')">
              <div class="px-2 my-2 text-xs md:px-8 w-100">
                <div class="whitespace-pre-line">
                  {{ paymentMethod.firstPara }}
                </div>
              </div>
              <p></p>
              <div>
                <div class="grid grid-cols-1 gap-6 px-2 mb-6 md:px-8">
                  <div class="grid grid-cols-1 gap-4 rounded">
                    <div class="text-xs">
                      <span class="mb-1 font-bold text-text-secondary">Step 1 </span>
                      <span class="inline">- Visit your bank branch</span>
                    </div>
                    <div class="text-xs">
                      <span class="mb-1 font-bold text-text-secondary">Step 2 </span>
                      <span class="inline">- Ask the bank teller in the branch to make PayDirect transfer to Starbet Bet.</span>
                    </div>
                    <div class="text-xs">
                      <span class="mb-1 font-bold text-text-secondary">Step 3 </span>
                      <span class="inline">
                        - Fill out the pay slip with your Starbet Bet Mobile number: 8187268307. Keep the receipt, just in case.
                      </span>
                    </div>
                    <div class="text-xs">
                      <span class="mb-1 font-bold text-text-secondary">Step 4 </span>
                      <span class="inline">
                        - Once the funds clear at the bank they will be credited to your Starbet Bet account, login and start betting.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-show="paymentMethod.name.endsWith('voucher')">
              <div class="px-2 my-2 text-xs md:px-8 w-100">
                <div class="whitespace-pre-line">
                  {{ paymentMethod.firstPara }}
                </div>
                <div>
                  <div class="w-full mb-6">
                    <form class="grid grid-cols-1 gap-4">
                      <div class="grid grid-cols-1 gap-5">
                        <div class="flex flex-col w-full">
                          <div class="mt-4 input-field">
                            <label class="mb-1 text-xs font-semibold text-text-default"> {{ $t('user.transaction.voucherCode') }} </label>
                            <a-input />
                          </div>
                        </div>
                      </div>
                      <a-button class="text-white bg-primary-m-success" size="large"> {{ $t('user.transaction.deposit') }}</a-button>

                      <!-- <lazy-car-pool-base-button> Deposit </lazy-car-pool-base-button> -->
                    </form>
                  </div>
                </div>
              </div>

              <!-- Start -->
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { notify, copyToClipboard } from '~/utils/utils';
import moment from 'moment';

export default Vue.extend({
  // // layout: 'user',
  middleware: 'auth',
  computed: {
    ...mapGetters({ loggedInUser: 'loggedInUser' }),
  },
  data() {
    return {
      paymentMethods: [
        {
          id: 1,
          user: 'monify-bank',
          name: 'Deposit with Instant Bank Transfer',
          image: 'assets/images/payment/monnify.ebe901e2(1).svg',
          firstPara: `Fund your Starbet account by doing a Bank Transfer to your unique bank account details and your account will be topped up instantly. See your unique bank account number displayed below`,
          // firstPara: this.$t('user.transaction.transferPara'),
        },
        {
          id: 2,
          user: 'bank',
          name: 'Deposit with PayDirect',
          image: 'assets/images/payment/monnify.ebe901e2(1).svg',
          firstPara: `Fund your Starbet account by visiting a Bank and making a deposit into the company's`,
        },
        {
          id: 3,
          user: 'paystack',
          name: 'Deposit with Paystack',
          image: 'assets/images/payment/paystack.862976bf.svg',
          firstPara: `Fund your Starbet account with your ATM card using paystack payment gateway and your account will be topped up instantly.`,
        },
        {
          id: 4,
          user: 'flutterwave',
          name: 'Deposit with Flutterwave',
          image: 'assets/images/payment/flutterwave.862976bf.svg',
          firstPara: `Fund your Starbet account with your ATM card using flutterwave payment gateway and your account will be topped up instantly.`,
        },
        {
          id: 5,
          user: 'monnify',
          name: 'Deposit with Monnify',
          image: 'assets/images/payment/monnify.862976bf.svg',
          firstPara: `Fund your Starbet account with your ATM card using monnify payment gateway and your account will be topped up instantly.`,
        },
        {
          id: 6,
          user: 'Voucher',
          name: `Deposit with Starbet voucher`,
          image: 'assets/images/payment/monnify.ebe901e2(1).svg',
          firstPara: `Fund your account with your Starbet voucher code and your account will be topped up instantly.`,
        },
      ],
      tabStyle:
        'width: 100%;border-bottom-width:1px;border-color: #989898;button, input, optgroup, select, textarea,  padding: 0;line-height: inherit; cursor: pointer; font-size: 700',
    };
  },
  computed: {
    ...mapGetters({ loggedInUser: 'loggedInUser' }),
    disable() {
      switch (this.loggedInUser.role) {
        case 'agent':
          return false;
        case 'online-customer':
          return false;
        default:
          return true;
      }
    },
    fullName() {
      return `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`;
    },
    brandName() {
      return `${this.loggedInUser.genealogy.tenant}`;
    },
  },

  methods: {
    copyToClipboard,
    async handleDeposit(e) {
      e.preventDefault();
      let url;
      let amount;
      let email;

      if (e.target.elements.paystack) {
        // Validation
        if (e.target.elements.paystack.value === '' || typeof e.target.elements.paystack.value === 'undefined') {
          return notify({
            type: 'error',
            message: 'Error! Please enter amount',
          });
        }
        url = `/api/v1/finances/wallet/deposit-with-paystack`;
        amount = Number(e.target.elements.paystack.value);
      } else if (e.target.elements.flutterwave) {
        // Validation
        if (e.target.elements.flutterwave.value === '' || typeof e.target.elements.flutterwave.value === 'undefined') {
          return notify({
            type: 'error',
            message: 'Error! Please enter amount',
          });
        }
        url = `/api/v1/finances/wallet/deposit-with-flutterwave`;
        amount = Number(e.target.elements.flutterwave.value);
      } else {
        // Validation
        if (e.target.elements.monnify.value === '' || typeof e.target.elements.monnify.value === 'undefined') {
          return notify({
            type: 'error',
            message: 'Error! Please enter amount',
          });
        }
        url = `/api/v1/finances/wallet/deposit-with-monnify`;
        amount = Number(e.target.elements.monnify.value);
      }

      /**
       * making sure user has email
       */
      if (this.loggedInUser.role === 'agent') {
        // Agent
        email = this.loggedInUser.email;
      } else if (this.loggedInUser.role === 'online-customer') {
        // Online user
        if (this.loggedInUser.firstName && this.loggedInUser.lastName) {
          // Online user with social login and email as their username
          email = this.loggedInUser.username;
        } else {
          // Online user with phone number logins
          email = this.loggedInUser.userId + '@Starbet.com';
        }
      } else {
        notify({
          type: 'error',
          message: 'Error! You are not allowed to make this request',
        });
      }
      const body = {
        email: email,
        username: this.loggedInUser.username,
        amount: amount,
        currency: 'NGN',
        callbackUrl: `${this.$config.websiteUrl}/user/callback`,
      };

      try {
        const res = await this.$axios.$post(url, body);
        if (res.status) {
          if (e.target.elements.paystack) {
            window.location = res.data.authorization_url;
          } else if (e.target.elements.monnify) {
            window.location = res.data.checkoutUrl;
          } else {
            window.location = res.data.link;
          }
        }
      } catch (error) {
        notify({
          type: 'error',
          message: 'Error! Internal server error',
        });
      }
    },
  },
});
</script>

<style lang="scss">
.btn {
  height: 32px;
  padding: 0 15px;
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;

  &-success {
    @apply bg-primary-m-success text-white;
  }
}

.ant-collapse {
  border: none;
}

// .ant-collapse > .ant-collapse-item {
//   @apply bg-primary-bg-ter text-primary-default-main;
// }

// .ant-collapse > .ant-collapse-item > .ant-collapse-header {
//   transition: all 0.3s;
//   height: 45px !important;
//   display: flex;
//   align-items: center;
//   @apply text-primary-default-main;
// }

// .ant-collapse-content {
//   @apply bg-primary-event text-primary-default-main;
// }
.ant-collapse > .ant-collapse-item {
  @apply bg-primary-bg-ter text-white;
}

.ant-collapse > .ant-collapse-item > .ant-collapse-header {
  transition: all 0.3s;
  height: 45px !important;
  display: flex;
  align-items: center;
  @apply text-white;
}

.ant-collapse-content {
  @apply bg-primary-event text-primary-default-main;
}
</style>
