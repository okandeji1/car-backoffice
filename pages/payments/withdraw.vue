<template>
  <main>
    <lazy-car-user-header title="Withdrawal " icon="menu" />
    <div class="deposit-container">
      <div class="flex items-center px-2 py-4 bg-primary-event text-primary-default-main">
        <!-- <img src="https://res.cloudinary.com/dvuogdjyq/image/upload/v1628432957/logo-secure_ehwlcj.svg" style="height: 88px" /> -->
        <div class="px-2">
          <p>Send & Manage Your Withdrawal Requests</p>
          <p>Select one of the payment methods below to request your withdrawal</p>
        </div>
      </div>
    </div>

    <a-tabs default-active-key="1" class="withdraw">
      <a-tab-pane key="1" tab="Withdraw" class="text-primary-default-main">
        <div class="justify-between px-4 pb-4 md:flex">
          <div class="flex-1 order-2 px-2 md:border md:border-gray-300">
            <div class="px-2 py-3 border-b border-gray-300 md:flex">
              <span class="pr-4 md:text-right md:w-1/3">Total Balance: </span>
              <div>{{ loggedInUser.wallet.balance }}</div>
            </div>
            <div class="px-2 py-3 border-b border-gray-300 md:flex">
              <span class="pr-4 text-right md:w-1/3">Withdrawable Balance:</span>
              <div>{{ loggedInUser.wallet.ledgerBalance }}</div>
            </div>
            <div class="px-2 py-3 border-b border-gray-300 md:flex md:items-center">
              <span class="pr-4 md:w-1/3 md:text-right">Amount:</span>

              <div class="md:w-2/3">
                <a-input type="number" v-model="wRequest.amount" class="w-full"> </a-input>
                <small class="text-xs text-red-600" v-if="!$v.wRequest.amount.minValue"
                  >Withdrawal amount cannot be less than {{ $v.wRequest.amount.$params.minValue.min }}.
                </small>
                <template v-if="$v.wRequest.amount.$error">
                  <small v-if="!$v.wRequest.amount.required" class="error-message"> Amount is required </small>
                </template>
              </div>
            </div>

            <div class="grid gap-2 px-2 py-3 border-b border-gray-300 amount-grid" :class="gridNumber">
              <div v-for="amount in amounts">
                <div
                  class="flex items-center justify-around h-10 text-xs text-center bg-gray-400 rounded cursor-pointer text-primary-darker"
                  :class="amount.color"
                  @click="fillAmount(amount.value)"
                >
                  {{ amount.text }}
                </div>
              </div>
            </div>

            <div class="px-2 py-3 border-b border-gray-300">
              <div class="md:flex md:items-center">
                <span class="pr-4 md:w-1/3 md:text-right">Saved Account(s):</span>
                <div class="md:w-2/3">
                  <a-select class="w-full" @change="onChange">
                    <a-select-option v-for="(bank, index) in banks" :key="index" :value="index">
                      <span>{{ bank.bankName }}</span>

                      <span> - </span>

                      <span>{{ bank.accountNumber }}</span>
                    </a-select-option>
                    <div slot="dropdownRender" slot-scope="menu">
                      <v-nodes :vnodes="menu" />

                      <div v-if="banks.length < 2 && !showAddButton">
                        <a-divider style="margin: 4px 0" />
                        <div
                          class="flex items-center"
                          style="padding: 4px 8px; cursor: pointer"
                          @mousedown="(e) => e.preventDefault()"
                          @click="showAddButton = true"
                          :open="!showAddButton"
                        >
                          <a-icon type="plus" /> Add Bank Account
                        </div>
                      </div>
                    </div>
                  </a-select>

                  <div class="px-2 py-1" v-if="selectedBank !== null && !selectedBank.isDefault">
                    <a-checkbox @change="makeAsDefault"> Set as default </a-checkbox>
                  </div>
                  <!-- <a-checkbox @change="makeAsDefault"> Set as default </a-checkbox> -->
                </div>
              </div>
            </div>

            <div class="px-2 py-3 border-b border-gray-300" v-if="showAddButton && banks.length < 3">
              <div class="md:flex md:items-center">
                <span class="pr-4 md:w-1/3 md:text-right">Bank:</span>
                <div class="md:w-2/3">
                  <a-select
                    class="w-full"
                    v-model="profileData.bankDetails.personal[0].bankName"
                    showSearch
                    @change="handleBankCode"
                    @blur="$v.bankName.$touch()"
                    :filter-option="filterOption"
                  >
                    <a-select-option v-for="bank in getBanks" :key="bank.name" :value="bank.code">
                      <img :src="bank.logo" :alt="bank.slug" style="width: 16px; height: 16px; display: inline; margin-right: 12px" />
                      {{ bank.name }}
                    </a-select-option>
                  </a-select>
                  <!-- <template v-if="$v.bankName.$error">
                  </template> -->

                  <template v-if="$v.bankName.$error">
                    <small v-if="!$v.bankName.required" class="error-message"> Bank Name is required </small>
                  </template>
                </div>
              </div>
            </div>

            <lazy-car-base-notification icon="info" class="mt-2" v-if="showBank">
              <template #text>
                <span>For faster approval, please ensure your bank information matches with the name and surname in your Starbet account.</span>
              </template>
            </lazy-car-base-notification>

            <div class="px-2 py-3 border-b border-gray-300 md:flex md:items-center" v-if="showAddButton">
              <span class="pr-4 md:w-1/3 md:text-right">Account Number:</span>

              <div class="md:w-2/3">
                <a-input v-model="accountNumber" @blur="$v.accountNumber.$touch()" type="number" class="w-full"> </a-input>

                <!-- <template v-if="$v.accountNumber.$error">
                  <small v-if="!$v.accountNumber.mustBe" class="error-message">
                    Must be exactly {{ $v.accountNumber.$params.mustBe.value }} digits.
                  </small>
                </template> -->
                <template v-if="$v.accountNumber.$error">
                  <small v-if="!$v.accountNumber.required" class="error-message"> Account Number is required </small>
                </template>
              </div>
            </div>

            <div v-if="showAddButton && banks.length < 3" class="px-2 py-3 border-b border-gray-300 md:flex">
              <span class="pr-4 md:w-1/3 md:text-right">Add Bank:</span>
              <a-button type="primary" @click="submitBank"> Add bank </a-button>
            </div>
            <div class="px-2 py-3 border-b border-gray-300 md:flex">
              <span class="pr-4 md:w-1/3 md:text-right">Costs:</span>
              <span>Free</span>
            </div>
            <div class="px-2 py-3 border-b border-gray-300 md:flex">
              <span class="w-1/3 pr-4 text-right">Minimum Withdrawal:</span>
              <span> 1,000 </span>
            </div>

            <div class="px-2 py-3 border-b border-gray-300 md:flex">
              <span class="w-1/3 pr-4 text-right">Maximum Withdrawal: </span>
              <span>10,000,000</span>
            </div>

            <div class="px-2 py-3 border-b border-gray-300 md:flex">
              <a-button @click="handleWithdraw" size="large" class="w-full text-white bg-primary-m-success"> Make Withdrawal </a-button>
            </div>
          </div>

          <div class="flex-1 order-1 px-4 md:order-last md:border md:border-gray-300">
            <p>
              Note: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium non magni sed blanditiis ducimus amet quibusdam hic qui
              earum iusto suscipit nesciunt enim cupiditate totam ex, nemo voluptate maxime explicabo!
            </p>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Withdrawal Histroy" force-render> </a-tab-pane>
    </a-tabs>
  </main>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { notify } from '~/utils/utils';
import { minValue, required, helpers } from 'vuelidate/lib/validators';

const wRequest = {
  amount: '',
  reason: 'Withdrawal ',
  gateway: 'PAYSTACK',
};

const profileData = {
  bankDetails: {
    personal: [
      {
        accountName: '',
        accountNumber: '',
        bankName: '',
        bankCode: '',
        isDefault: true,
      },
    ],
  },
};

// const exactly = (params) =>
//   helpers.withParams(
//     {
//       type: 'exact',
//       value: params,
//     },

//     (value) => console.log(value),

//     // value.toString().length == params,
//   );

export default {
  middleware: 'auth',

  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },

  computed: {
    ...mapGetters({ loggedInUser: 'loggedInUser', getBanks: 'user/getBanks', personalBanks: 'getPersonalBanks' }),
    usersRole() {
      if (this.loggedInUser.role == 'cashier' || this.loggedInUser.role == 'tenant') {
        return true;
      }
    },
    gridNumber() {
      return `grid-cols-${this.amounts.length}`;
    },
    getPersonalBanks() {
      return this.loggedInUser.bankDetails.personal;
    },
  },

  data() {
    return {
      profileData,
      bankCode: undefined,
      bankName: undefined,
      accountNumber: undefined,
      typeOfAction: 'ADD-BANK',
      banks: [],
      showBank: false,
      wRequest,
      tabStyle:
        'width: 100%;border-bottom-width:1px;border-color: transparent ;button, input, optgroup, select, textarea,  padding: 0;line-height: inherit;cursor: pointer;',
      amounts: [
        {
          id: 1,
          value: 'clear',
          text: 'Clear',
          color: 'text-primary-yellow',
        },
        {
          id: 2,
          value: '1000',
          text: '1000',
        },
        {
          id: 3,
          value: '5000',
          text: '5000',
        },
        {
          id: 4,
          value: '10000',
          text: '10000',
        },
        {
          id: 5,
          value: 'double',
          text: 'X2',
        },
      ],
      paymentMethods: [
        {
          id: 1,
          user: 'monify-bank',
          name: 'Instant Bank Transfer',
          image: 'assets/images/payment/monnify.ebe901e2(1).svg',
          firstPara: ``,
        },
      ],
      gateway: [
        {
          name: 'Paystack',
          slug: 'PAYSTACK',
        },
        {
          name: 'Flutterwave',
          slug: 'FLUTTERWAVE',
        },
        {
          name: 'Monnify',
          slug: 'MONNIFY',
        },
      ],
      showAddButton: false,
      selectedBank: null,
    };
  },
  validations: {
    wRequest: {
      amount: {
        required,
        minValue: minValue(1000),
      },
    },
    accountNumber: { required },
    // FIXME: exactly Logic is breaking the file
    // accountNumber: { required, mustBe: exactly(10) },
    bankName: { required },
  },

  methods: {
    ...mapActions({
      fetchBanks: 'user/fetchBanks',
      updateProfileApi: 'user/updateProfileApi',
      addPersonalBankApi: 'user/addPersonalBankApi',
      makeWithdrawalRequestApi: 'user/makeWithdrawalRequestApi',
      getLoggingUser: 'getLoggingUser',
    }),

    async submitBank() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const payload = {
          username: this.loggedInUser.username,
          action: this.typeOfAction,
          bankDetails: {
            bankCode: this.bankCode,
            bankName: this.bankName,
            accountNumber: this.accountNumber,
            accountName: `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`,
          },
        };
        const res = await this.handleAddBankAccount(payload);
        this.showAddButton = false;

        if (res.status) {
          this.$store.dispatch('getLoggingUser');
        }
      }
    },

    async addBank() {
      if (this.banks.length < 3) this.showBank = true;
    },
    async handleWithdraw() {
      this.$v.$touch();
      // FIXME: Come back and implement the make default bank login on click of the withdrawal button, i.e when the client clicks on the Withdraw button we check if the account added is default,  if he wants it to be default we run the function to make it default before hitting the withdraw end point. if not, We just go ahead and make the the withdrawal. Ensure you fix it befoee tomorrow 05/31/2022
      if (!this.$v.$invalid) {
        try {
          if (!this.accountNumber) {
            const payload = {
              username: this.loggedInUser.username,
              action: this.typeOfAction,
              bankDetails: {
                bankCode: this.bankCode,
                bankName: this.bankName,
                accountNumber: this.accountNumber,
                accountName: `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`,
              },
            };
            this.handleAddBankAccount(payload);
            console.log('inside');
          }

          console.log('main function');
          console.log(wRequest);
          // const res = await this.makeWithdrawalRequestApi(wRequest);
          // if (res.status) {
          //   this.getLoggingUser();
          //   this.wRequest = {
          //     amount: '',
          //     reason: '',
          //     gateway: '',
          //   };
          //   notify({
          //     type: 'success',
          //     message: res.message,
          //   });
          // }
        } catch (error) {}
      }
    },

    fillAmount(amount) {
      // Adding + in front of a string of number is type casting it to a Number, it is equivalent to doing Number(string)
      if (amount !== 'clear' && amount !== 'double') this.wRequest.amount = +this.wRequest.amount + +amount;

      if (amount === 'double') this.wRequest.amount *= 2;
      if (amount === 'clear') this.wRequest.amount = 0;
    },

    filterOption(input, option) {
      return option.componentOptions.children[1].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },

    async handleAddBankAccount(data) {
      try {
        const res = await this.addPersonalBankApi(data);
        if (res.status) {
          notify({
            type: 'success',
            message: res.message,
          });

          this.profileData = {
            bankDetails: {
              personal: [
                {
                  accountName: '',
                  accountNumber: '',
                  bankName: '',
                  bankCode: '',
                },
              ],
            },
          };

          this.bankCode = '';

          return res;
        }
      } catch (error) {
        console.log(error);
      }
    },

    handleBankCode(value) {
      const selectedBank = this.getBanks.filter((bank) => bank.code === value);
      this.bankCode = value;
      this.bankName = selectedBank[0].name;
    },
    onChange(value) {
      this.selectedBank = this.banks[value];
    },

    async makeAsDefault(e) {
      if (e.target.checked) {
        if (this.selectedBank) {
          const { _id, isDefault, ...rest } = this.selectedBank;
          const payload = {
            username: this.loggedInUser.username,
            action: 'DEFAULT-BANK',
            bankDetails: {
              ...rest,
            },
          };

          const res = await this.handleAddBankAccount(payload);

          if (res.status) {
            this.$store.dispatch('getLoggingUser');
            this.banks = this.getPersonalBanks;
          }
        }
      }
    },
  },

  created() {
    this.fetchBanks();
    // TODO: Also add the image of the banks to the payload
    this.banks = this.getPersonalBanks;
    if (this.banks.length < 3) this.showBank = true;
  },
};
</script>
<style lang="scss">
.ant-tabs-nav .ant-tabs-tab {
  @apply text-primary-default-main;
}

.ant-tabs-nav .ant-tabs-tab-active {
  color: #69428e;
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

.info-notification {
  color: #8a6d3b;
  background: #fcf8e3;
}
</style>
