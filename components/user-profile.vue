<template>
  <main>
    <a-drawer
      placement="right"
      :visible="profileDrawer"
      :destroyOnClose="true"
      @close="onCloseProfileDrawer"
      class="my-drawer"
      :headerStyle="{
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 10,
        height: '60px',
        width: '100%',
      }"
      :bodyStyle="{}"
    >
      <a-tabs type="card" class="text-primary-default-main" default-active-key="1" size="large" @change="showTabKey">
        <a-tab-pane key="1" tab="Profile Details">
          <div>
            <div class="modal-body">
              <div class="modal_body-title">
                <p class="mb-8 text-2xl font-bold">Basic Data</p>
              </div>
              <form v-if="profileData">
                <div class="w-full mb-4 text-left">
                  <label for="" class="text-sm text-primary-default-main"> First Name </label>
                  <a-input
                    :value="profileData.firstName"
                    class="b"
                    :disabled="loggedInUser.role !== 'tenant'"
                    @change="handleInput($event, 'firstName')"
                  />
                </div>
                <div class="w-full mb-4 text-left">
                  <label for="" class="text-sm text-primary-default-main"> Last Name </label>
                  <a-input :value="profileData.lastName" :disabled="loggedInUser.role !== 'tenant'" @change="handleInput($event, 'lastName')" />
                </div>
                <div class="w-full mb-4 text-left">
                  <label for="" class="text-sm text-primary-default-main"> Email Address </label>
                  <a-input :value="profileData.email" :disabled="loggedInUser.role !== 'tenant'" @change="handleInput($event, 'email')" />
                </div>
                <div class="w-full mb-4 text-left" v-if="profileData.phone">
                  <label for="" class="text-sm text-primary-default-main"> Phone Number </label>
                  <a-input-group compact>
                    <a-select :default-value="profileData.phone.code" :disabled="loggedInUser.role !== 'tenant'" style="width: 22%">
                      <a-select-option :value="profileData.phone.code"> {{ profileData.phone.code }} </a-select-option>
                    </a-select>
                    <a-input style="width: 78%" :value="profileData.phone.number" />
                  </a-input-group>
                </div>
                <div class="w-full mb-4 text-left">
                  <label for="" class="text-sm text-primary-default-main">
                    {{ profileData.role == 'staff' || profileData.role == 'area-manager' ? 'Home' : 'Shop' }} Address
                  </label>
                  <a-input :value="profileData.address" :disabled="loggedInUser.role !== 'tenant'" @change="handleInput($event, 'address')" />
                </div>

                <div class="flex justify-between w-full mt-6 mb-4 text-left">
                  <div class="flex-1">
                    <label for="" class="block text-sm text-primary-default-main"> State </label>
                    <a-select :default-value="profileData.state" disabled style="width: 88%">
                      <a-select-option :value="profileData.state"> {{ profileData.state }} </a-select-option>
                    </a-select>
                  </div>
                  <div class="flex-1">
                    <label for="" class="block text-sm text-primary-default-main"> LGA </label>
                    <a-select style="width: 88%"> </a-select>
                  </div>
                </div>

                <div class="w-full mb-4 text-left" v-if="profileData.role !== 'staff'">
                  <label for="" class="text-sm text-primary-default-main"> Commission Plan </label>

                  <a-select>
                    <a-select-option v-for="(commission, index) in profileData.commissions" :key="index" :value="commission.plan">
                      {{ commission.plan }}
                    </a-select-option>
                  </a-select>
                </div>

                <div class="w-full mb-4 text-left">
                  <label for="" class="text-sm text-primary-default-main"> Parent </label>
                  <a-input :value="profileData.parent" disabled style="padding-top: 8px" />
                </div>

                <div class="w-full mb-4 text-left">
                  <label for="" class="text-sm text-primary-default-main"> Date of Birth </label>
                  <a-input
                    :value="moment(profileData.dob).format('YYYY/MM/DD')"
                    :disabled="loggedInUser.role !== 'tenant'"
                    @change="handleInput($event, 'dob')"
                  />
                </div>
                <div v-if="profileData.bankDetails">
                  <p class="block">Ensure name (First and last name) matches with bank details</p>
                  <div class="w-full mb-4 text-left">
                    <label for="bankName" class="text-sm text-primary-default-main"> Bank Name</label>
                    <a-select v-model="bankDetails.personal[0].bankName" showSearch @change="handleBankCode" placeholder="Select Bank" class="block mt-1">
                      <a-select-option v-for="(item, index) in getBanks" :key="index" :value="item.slug">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </div>
                  <div class="w-full mb-4 text-left">
                    <label for="indoor" class="text-sm text-primary-default-main"> Bank Code</label>
                    <a-input disabled :value="bankCode" style="padding-top: 8px"> </a-input>
                  </div>
                  <div class="w-full mb-4 text-left">
                    <label for="indoor"> Account Number</label>
                    <a-input v-model="bankDetails.personal[0].accountNumber" :disabled="loggedInUser.role !== 'tenant'" style="padding-top: 8px"> </a-input>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2" v-if="profileData.status == 'PENDING'">
                  <div v-if="fileList" v-for="item in uploadedPictures" :key="item.id">
                    <div class="flex flex-col items-center justify-center">
                      <p>{{ item.name.replace(/([a-z])([A-Z])/g, '$1 $2') }}</p>

                      <div class="relative cursor-pointer image-container">
                        <img
                          style="width: 104px; height: 104px"
                          :src="item.url"
                          class="inline m-1 cursor-pointer main-image"
                          @click="handlePreview(item)"
                          data-action="collection of words and punctuation"
                          tab-index="0"
                        />
                        <div class="absolute flex items-center justify-center image-action">
                          <svg-icon @click="handlePreview(item)" name="eye" class="w-6 h-6 text-gray-100 fill-current"></svg-icon>
                          <svg-icon @click="handleDownload(item)" name="download" class="w-6 h-6 ml-2 text-gray-100 fill-current"></svg-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>

                <div class="w-full mb-10">
                  <label for="status" class="text-sm text-primary-default-main"> Status </label>
                  <a-select :default-value="profileData.status" disabled @change="handleStatus">
                    <a-select-option v-for="status in statuses" :key="status.id" :value="status.slug">
                      {{ status.title }}
                    </a-select-option>
                  </a-select>
                </div>
              </form>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Actions" v-if="loggedInUser.role === 'tenant' || loggedInUser.role === 'staff'">
          <div class="flex flex-col mx-5 mt-2 mb-4 text-left">
            <!-- If Status is Pending -->
            <div v-if="profileData.status === 'PENDING'">
              <lazy-car-button-block variant="success" class="my-4" @click="decideUser('APPROVE')"> Approve </lazy-car-button-block>
              <lazy-car-button-block variant="danger" @click="decideUser('DECLINE')"> Decline </lazy-car-button-block>
            </div>

            <div v-else>
              <div
                class="grid grid-cols-2 gap-x-4 gap-y-2"
                v-if="
                  profileData.role == 'super-agent' ||
                  profileData.role == 'agent' ||
                  profileData.role == 'area-manager' ||
                  profileData.role == 'tenant' ||
                  profileData.role == 'staff'
                "
              >
                <lazy-car-button-block display="in" variant="success" class="mt-4 mb-2" @click="showFundModal('ADD_TRUST', profileData)">
                  Add Threshold
                </lazy-car-button-block>
                <lazy-car-button-block variant="warning" display="in" class="mt-4 mb-2" @click="showFundModal('REMOVE_TRUST', profileData)">
                  Remove Threshold
                </lazy-car-button-block>
              </div>
              <div class="grid grid-cols-2 gap-x-4">
                <lazy-car-button-block
                  :class="loggedInUser.role === 'cashier' ? 'disabled' : ''"
                  :disabled="loggedInUser.role === 'cashier'"
                  display="in"
                  variant="info"
                  class="my-2"
                  @click="showFundModal('LOAD', profileData)"
                >
                  Load
                </lazy-car-button-block>
                <lazy-car-button-block
                  :class="loggedInUser.role === 'cashier' ? 'disabled' : ''"
                  :disabled="loggedInUser.role === 'cashier'"
                  variant="danger"
                  display="in"
                  class="my-2"
                  @click="showFundModal('UNLOAD', profileData)"
                >
                  Unload
                </lazy-car-button-block>
              </div>
              <div class="grid grid-cols-2 gap-x-4 gap-b-2">
                <lazy-car-button-block display="in" variant="tertiary" class="my-2" @click="showResetPasswordModal(profileData)">
                  Reset Pw
                </lazy-car-button-block>
                <lazy-car-button-block
                  variant="warning"
                  display="in"
                  class="my-2"
                  :disable="profileData.role == 'cashier'"
                  :disabled="profileData.role === 'cashier'"
                  @click="checkNetwork"
                >
                  View Network
                </lazy-car-button-block>
              </div>

              <lazy-car-button-block display="block" variant="secondary" class="my-2" @click="changeRoute(profileData)">
                Settings
              </lazy-car-button-block>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
      <div
        class="block text-center modal-footer"
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #718096',
          padding: '20px 48px',
          textAlign: 'right',
          zIndex: 1,
        }"
        v-if="loggedInUser.role === 'tenant' || loggedInUser.role == 'staff'"
      >
        <div v-if="activeTab == '1'">
          <a-button size="large" class="w-full mt-4 text-white bg-primary-m-success" @click="handleUpdateProfile"> Update Profile </a-button>
        </div>

        <!-- <div v-if="activeTab == '2'">
        <small>
          You can only change your Phone Number with this form. To change your account information please send an email to contact@starbet.com.
        </small>
        <a-button size="large" class="w-full mt-4 text-primary-bg-ter bg-primary-bg-sec" disabled> Update Profile </a-button>
      </div> -->

        <!-- <a-button size="large" >Continue</a-button> -->
      </div>
    </a-drawer>

    <lazy-car-fund-transaction-modal v-if="isFundModalOpened" @close-fund="closeFundModal" :item="item" />
    <lazy-car-reset-password-modal v-if="isResetModalOpened" @close-fund="closeResetModal" :updateUser="profileData" />
  </main>
</template>
<script lang="ts">
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { notify } from '~/utils/utils';
import moment from 'moment';
import { saveAs } from 'file-saver';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const profile = {};
const bankDetails = {
  personal: [{}]
};

export default {
  props: {
    profileData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      profileDrawer: 'user/profileDrawer',
      loggedInUser: 'loggedInUser',
      getCommissions: 'user/getCommissions',
      getBanks: 'user/getBanks',
    }),
    uploadedPictures() {
      let myFileList = [];
      const obj = this.profileData.miscellaneous;
      let id = 0;
      for (const prop in obj) {
        console.log(` prop: ${prop} , obj: ${obj[prop]}`);
        // @ts-ignore
        myFileList.push({ id: id++, name: prop, url: obj[prop][0] });
      }

      return myFileList;
    },
  },

  data() {
    return {
      fileList: [],
      profile,
      bankDetails,
      bankCode: undefined,
      isFundModalOpened: false,
      isResetModalOpened: false,
      dateFormat: 'DD/MM/YYYY',
      loading: false,
      item: {},
      activeTab: '1',
      previewVisible: false,
      previewImage: '',
      assignedCom: '',
      disableTab: true,

      statuses: [
        {
          id: 1,
          title: 'Active',
          slug: 'ACTIVE',
        },
        {
          id: 2,
          title: 'Inactive',
          slug: 'INACTIVE',
        },
        {
          id: 3,
          title: 'Block',
          slug: 'BLOCK',
        },
      ],
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this);
  },

  created() {
    this.listImage();
  },

  methods: {
    moment,
    listImage() {
      const obj = this.profileData.miscellaneous;
      let id = 0;
      for (const prop in obj) {
        console.log(` prop: ${prop} , obj: ${obj[prop]}`);
        // @ts-ignore
        this.fileList.push({ id: id++, name: prop, url: obj[prop][0] });
      }
    },

    getFileName(path: string) {
      return path.substring(path.lastIndexOf('/') + 1);
    },

    handleDownload(item: any) {
      let imgPath = item.url;
      // @ts-ignore
      let filename = this.getFileName(imgPath);
      saveAs(imgPath, filename);
    },

    handleCancel() {
      // @ts-ignore

      this.previewVisible = false;
    },
    async handlePreview(file: any) {
      // @ts-ignore

      this.previewImage = file.url;
      // @ts-ignore

      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      // @ts-ignore
      this.fileList = fileList;
    },

    async decideUser(action: any) {
      try {
        const data = {
          action: action,
          username: this.profileData.username,
        };
        const res = await this.decideUserApi(data);
        if (res.status) {
          this.getPendingUsersApi('PENDING');
          this.onCloseProfileDrawer();
          notify({
            type: 'success',
            message: res.message,
          });
        }
      } catch (error) {
        notify({
          type: 'error',
          message: 'Error! Internal server error',
        });
      }
    },

    async handleUpdateProfile() {
      try {
        // @ts-ignore
        if (Object.keys(this.bankDetails.personal[0]).length > 0) {
          // @ts-ignore
          this.profile.bankDetails = this.bankDetails;
          // @ts-ignore
          this.profile.bankDetails.personal[0].bankCode = this.bankCode;
          // @ts-ignore
          if (this.profile.firstName && this.profile.lastName) {
            // @ts-ignore
            this.profile.bankDetails.accountName = `${this.profile.firstName} ${this.profile.lastName}`;
          }
        }
        // @ts-ignore
        this.profile.username = this.profileData.username;
        const res = await this.updateProfileApi(this.profile);
        if (res.status) {
          this.getUsersApi({
            query: { role: this.profileData.role },
          });
          this.profile = {};
          this.getUserApi();
          this.onCloseProfileDrawer();
          notify({
            type: 'success',
            message: res.message,
          });
        }
      } catch (error) {}
    },

    handleInput(e: any, prop: any) {
      this.profile = {
        ...this.profile,
        [prop]: e.target.value,
      };
    },

    handleBankCode(value: any) {
      // @ts-ignore
      const selectedBank = this.getBanks.filter((bank) => bank.slug === value);
      // @ts-ignore
      this.bankCode = selectedBank[0].code;
    },

    showTabKey(activeKey: any) {
      this.activeTab = activeKey;
    },

    changeRoute() {
      this.$router.push({ path: '/user/network/user-profile?tab=transactions' });
      this.getUserApi(this.profileData.username);
      this.onCloseProfileDrawer();
    },

    checkNetwork() {
      let query = {
        username: `${this.profileData.username}`,
      };
      this.getUserNetworkApi(query);
      this.onCloseProfileDrawer();
      this.$router.push({ path: '/user/downlines' });
    },

    closeFundModal() {
      this.isFundModalOpened = false;
    },

    closeResetModal() {
      this.isResetModalOpened = false;
    },

    handleStatus(value: any) {
      // @ts-ignore
      this.profile.status = value;
    },

    showFundModal(action: any, user: any) {
      this.item.action = action;
      this.item.user = user;
      this.isFundModalOpened = true;
      // this.$store.commit('user/setFundModal', true);
    },

    showResetPasswordModal(user: any) {
      this.updateUser = user;
      this.isResetModalOpened = true;
      // this.$store.commit('user/setResetPasswordModal', true);
    },

    async showTransactions(user: any) {
      // @ts-ignore
      const res = await this.$axios.get(`/api/v1/transactions?username=${user.username}`);
    },

    ...mapMutations({
      onCloseProfileDrawer: 'user/onCloseProfileDrawer',
      setParent: 'user/setParent',
    }),

    ...mapActions({
      getUsersApi: 'user/getUsersApi',
      getUserApi: 'user/getUserApi',
      getUserNetworkApi: 'user/getUserNetworkApi',
      decideUserApi: 'user/decideUserApi',
      updateProfileApi: 'user/updateProfileApi',
      getPendingUsersApi: 'user/getPendingUsersApi',
      fetchBanks: 'user/fetchBanks',
    }),
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchBanks();
    });
  },
};
</script>

<style lang="scss">
.image-container:hover .image-action {
  opacity: 1;
}

.image-action {
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Black see-through */
  width: 100%;
  height: 100%;
  transition: 0.5s ease;
  opacity: 0;
  // font-size: 20px;
  // padding: 20px;
  text-align: center;
}

.image-container:hover .overlay {
  opacity: 1;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

// .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
//   @apply bg-primary-bg-ter text-primary-default-main;
// }

// .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
//   @apply bg-primary-input;
// }

.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
  @apply bg-primary-bg-ter text-white;
}

.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
  @apply bg-primary-m-warning;
}

.ant-tabs-bar {
  margin: 20px 0;
}

.ant-select-arrow {
  @apply text-primary-default-main;
}

.ant-select-selection,
.ant-input[disabled] {
  @apply text-primary-default-main bg-primary-input;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.login {
  .ant-drawer-content-wrapper {
    width: 100% !important;
  }
  .ant-drawer-wrapper-body {
    @apply p-8;
  }

  a {
    color: var(--colors-basic-text);
    font-size: 14px;
  }

  .ant-drawer-body {
    padding: 0.75rem;
  }

  .ant-tabs-ink-bar {
    @apply;
  }

  .ant-tabs-nav .ant-tabs-tab {
    @apply;
  }

  .ant-tabs-nav .ant-tabs-tab-active {
    @apply;

    &:hover {
      @apply;
    }
  }

  .ant-tabs-tab-prev.ant-tabs-tab-arrow-show,
  .ant-tabs-tab-next.ant-tabs-tab-arrow-show {
    @apply;
  }
  .ant-tabs-nav-scroll {
    background-color: var(--colors-basic-background-100, #ffffff);
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
  }
  .ant-tabs-nav .ant-tabs-tab {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    height: 100%;
    margin: 0 32px 0 0;
    /* padding: 12px 16px; */
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .ant-drawer-content-wrapper {
    width: 100% !important;
  }

  @screen md {
    .ant-drawer-content-wrapper {
      width: 24rem !important;
    }
  }
  .ant-form-item-label,
  .ant-form-item-control-wrapper {
    width: 100%;
  }

  .ant-tabs-nav-animated > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }
  div > .ant-tabs-tab {
    flex: 1 !important;
  }
}
</style>
