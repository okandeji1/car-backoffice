import { getQuery, notify, states } from '../utils/utils';
import { context } from '../utils/event-emitter';

export const state = () => ({
  transactions: [],
  banks: [],
  userParent: {},
  bets: [],
  users: [],
  pendingUsers: [],
  user: {},
  payoutRequests: [],
  fundModal: false,
  passwordResetModal: false,
  addMessageModal: false,
  messageEditorModal: false,
  commDrawer: false, // Commission drawer
  roleDrawer: { visible: false, isEditMode: false, data: { permissions: [], role: '' } }, // Role drawer
  profileDrawer: false,
  withdrawalSettingsDrawer: false, // edit withdrawer setting drawer
  withdrawalDrawer: false, // add withdrawer setting drawer
  tagDrawer: false, // add tag setting drawer
  salesReport: [],
  messages: [],
  withdrawalSettings: [],
  msgCounts: [],
  commissions: [],
  permissions: [],
  roles: [],
  personalBanks: [],
  activityLogs: [],
  editComm: false, // Commission drawer
  themes: 'light',
  tags: [],
});
export const getters = {
  getTransactions(state) {
    return state.transactions;
  },

  userAreaMenus(state) {
    return state.userAreaMenus;
  },

  getParent(state) {
    return state.userParent;
  },

  getBets(state) {
    return state.bets;
  },
  getUsers(state) {
    return state.users;
  },
  getPendingUsers(state) {
    return state.pendingUsers;
  },
  getUser(state) {
    return state.user;
  },
  getPayoutRequests(state) {
    return state.payoutRequests;
  },

  getFundModal(state) {
    return state.fundModal;
  },

  getResetPasswordModal(state) {
    return state.passwordResetModal;
  },

  getAddMessageModal(state) {
    return state.addMessageModal;
  },
  getMessageEditorModal(state) {
    return state.messageEditorModal;
  },

  getCommDrawer(state) {
    return state.commDrawer;
  },

  getWithdrawalDrawer(state) {
    return state.withdrawalDrawer;
  },

  getTagDrawer(state) {
    return state.tagDrawer;
  },

  getRoleDrawer(state) {
    return state.roleDrawer;
  },

  getEditComm(state) {
    return state.editComm;
  },

  profileDrawer(state) {
    return state.profileDrawer;
  },

  getWithdrawalSettingsDrawer(state) {
    return state.withdrawalSettingsDrawer;
  },

  getSalesReport(state) {
    return state.salesReport;
  },

  getMessages(state) {
    return state.messages;
  },

  getMessageCounts(state) {
    return state.msgCounts;
  },

  getCommissions(state) {
    return state.commissions;
  },

  getWithdarawalSettings(state) {
    return state.withdrawalSettings;
  },

  getPermissions(state) {
    return state.permissions;
  },

  getRoles(state) {
    return state.roles;
  },

  getActivityLogs(state) {
    return state.activityLogs;
  },

  getBanks(state) {
    return state.banks;
  },

  getPersonalBanks(state) {
    return state.personalBanks;
  },

  getTags(state) {
    return state.tags;
  },
};

export const mutations = {
  setParent(state, value) {
    return (state.userParent = value);
  },

  setTransactions(state, value) {
    return (state.transactions = value);
  },

  setBets(state, value) {
    return (state.bets = value);
  },

  setPayoutRequests(state, value) {
    return (state.payoutRequests = value);
  },

  setUsers(state, value) {
    return (state.users = value);
  },

  setPendingUsers(state, value) {
    return (state.pendingUsers = value);
  },

  setUser(state, value) {
    state.user = value;
  },

  setFundModal(state, value) {
    return (state.fundModal = value);
  },

  setResetPasswordModal(state, value) {
    return (state.passwordResetModal = value);
  },

  setAddMessageModal(state, value) {
    return (state.addMessageModal = value);
  },

  setMessageEditorModal(state, value) {
    return (state.messageEditorModal = value);
  },

  setShowCommDrawer(state, value) {
    return (state.commDrawer = value);
  },

  setShowWithdrawalDrawer(state, value) {
    return (state.withdrawalDrawer = value);
  },

  setShowTagDrawer(state, value) {
    return (state.tagDrawer = value);
  },

  setShowRoleDrawer(state, value) {
    return (state.roleDrawer = value);
  },

  setShowEditComm(state, value) {
    return (state.editComm = value);
  },

  toggleProfileDrawer(state) {
    return (state.profileDrawer = !state.profileDrawer);
  },

  onCloseProfileDrawer(state) {
    return (state.profileDrawer = false);
  },

  setSalesReport(state, value) {
    return (state.salesReport = value);
  },

  setMessages(state, value) {
    return (state.messages = value);
  },

  setMessageCounts(state, value) {
    return (state.msgCounts = value);
  },

  setCommissions(state, value) {
    return (state.commissions = value);
  },

  setWithdarawalSettings(state, value) {
    return (state.withdrawalSettings = value);
  },

  toggleWithdrawalSettingsDrawer(state) {
    return (state.withdrawalSettingsDrawer = !state.withdrawalSettingsDrawer);
  },

  setWithdrawalSettingsDrawer(state) {
    return (state.withdrawalSettingsDrawer = false);
  },

  setPermissions(state, value) {
    return (state.permissions = value);
  },

  setRoles(state, value) {
    return (state.roles = value);
  },

  setActivityLogs(state, value) {
    return (state.activityLogs = value);
  },

  setBanks(state, value) {
    return (state.banks = value);
  },

  setTags(state, value) {
    return (state.tags = value);
  },

  // setPersonalBanks(state, bank) {
  //   state.personalBanks.push(bank)
  // }
};

export const actions = {
  // Register
  async register({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/users/register', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {}
  },

  async becomeAnAgent({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/users/become-an-agent', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {}
  },

  async regWithPhone({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/users/register-via-phone', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {}
  },

  // Login or register
  async socialLogin({ commit }, payload) {
    let url;
    const callbackUrl = `${this.$config.websiteUrl}/pool/social-callback`;
    if (payload === 'google') {
      url = `/api/v1/users/login/google?callbackUrl=${callbackUrl}`;
    } else if (payload === 'facebook') {
      url = `/api/v1/users/login/facebook?callbackUrl=${callbackUrl}`;
    } else if (payload === 'twitter') {
      // url = `/api/v1/users/login/twitter?callbackUrl=${callbackUrl}`;
      // FIXME: delete this line if twitter is implemented
      notify({
        type: 'success',
        message: 'Success! Request successful.',
      });
      return;
    } else {
      notify({
        type: 'error',
        message: 'Error! Request Failed. Please contact support',
      });
      return;
    }
    try {
      const res = await this.$axios.$get(url);
      if (res.status) {
        return (window.location = res.data);
      } else {
        return notify({
          type: 'error',
          message: 'Error! Request Failed. Please contact support',
        });
      }
    } catch (error) {
      return notify({
        type: 'error',
        message: 'Error! Request Failed. Please contact support',
      });
    }
  },

  async socialCallback({ commit, state }) {
    let url;
    const windowUrl = getQuery(window.location.href);
    // @ts-ignore
    const obj = JSON.parse(windowUrl.state);
    const callbackUrl = `${this.$config.websiteUrl}/pool/social-callback`;
    if (obj.provider === 'google') {
      url = `/api/v1/users/callback?callbackUrl=${callbackUrl}`;
      for (const [key, value] of Object.entries(windowUrl)) {
        url += `&${key}=${value}`;
      }
    } else if (obj.provider === 'facebook') {
      url = `/api/v1/users/facebook-callback?callbackUrl=${callbackUrl}`;
      for (const [key, value] of Object.entries(windowUrl)) {
        url += `&${key}=${value}`;
      }
    } else if (obj.provider === 'twitter') {
      // url = `/api/v1/users/twitter-callback?callbackUrl=${callbackUrl}`;
      // for (const [key, value] of Object.entries(windowUrl)) {
      //   url += `&${key}=${value}`;
      // }
    } else {
      notify({
        type: 'error',
        message: 'Error! Request Failed. Please contact support',
      });
      return this.$router.replace('/pool/register');
    }
    try {
      const res = await this.$axios.$get(url);

      if (res.status) {
        this.$auth.setUser(res.data);
        this.$auth.setRefreshToken('local', res.data.refreshToken);
        // this.$auth.setUserToken(res.data.accessToken, res.data.refreshToken).then(() => this.$toast.success('User set!'));
        this.$axios.setHeader('Authorization', 'Bearer ' + res.data.accessToken);
        this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + res.data.accessToken);
        this.dispatch('getLoggingUser');
        this.commit('pool/onCloseprofileDrawer'); // Close login drawer
        notify({
          type: 'success',
          message: 'Success! Request successful',
        });
        return this.$router.push('/');
      }
      notify({
        type: 'error',
        message: 'Error! Cannot authenticate user',
      });
      return this.$router.replace('/pool/register');
    } catch (error) {
      return notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async getTransactionsApi({ commit }, payload) {
    try {
      // let url = payload.url;
      let url =
        this.$auth.user.role === 'tenant' || this.$auth.user.role === 'staff'
          ? '/api/v1/transactions?'
          : `/api/v1/transactions?username=${this.$auth.user.username}`;
      if (payload.query) {
        for (const [key, value] of Object.entries(payload.query)) {
          url += `&${key}=${value}`;
        }
      }
      // @ts-ignore
      const responseData = await this.$axios.$get(url);
      return this.commit('user/setTransactions', responseData);
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async getBetApi({ commit }, payload) {
    try {
      let url = '/api/v1/bets?';
      for (const [key, value] of Object.entries(payload.query)) {
        url += `&${key}=${value}`;
      }
      const res = await this.$axios.$get(url);
      if (res.status) {
        return res.data;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async getBetIdApi({ commit }, payload) {
    try {
      let url = '/api/v1/bets/get-bet?';
      for (const [key, value] of Object.entries(payload.query)) {
        url += `&${key}=${value}`;
      }
      const res = await this.$axios.$get(url);
      if (res.status) {
        return res.data;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async getPayoutRequestsApi({ commit }, payload) {
    try {
      let url = '/api/v1/finances/wallet/getPayoutRequest?';
      for (const [key, value] of Object.entries(payload.query)) {
        url += `&${key}=${value}`;
      }
      const res = await this.$axios.$get(url);

      if (res.status) {
        return this.commit('user/setPayoutRequests', res);
      }
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async processPayment() {
    const windowUrl = getQuery(window.location.href);
    let url;
    if (windowUrl.hasOwnProperty('reference')) {
      // from paystack
      const reference = windowUrl['reference'];
      url = `/api/v1/finances/wallet/verify-with-paystack?reference=${reference}`;
    } else if (windowUrl.hasOwnProperty('paymentReference')) {
      // from monnify
      const reference = windowUrl['paymentReference'];
      url = `/api/v1/finances/wallet/verify-with-monnify?reference=${reference}`;
    } else if (windowUrl.hasOwnProperty('transaction_id')) {
      // from flutterwave
      const reference = windowUrl['transaction_id'];
      url = `/api/v1/finances/wallet/verify-with-flutterwave?reference=${reference}`;
    } else {
      notify({
        type: 'error',
        message: 'Error! Payment Failed. Please contact the admin',
      });
      return this.$router.replace('/user/payments/deposit');
    }

    try {
      const res = await this.$axios.$get(url);

      if (res.status) {
        notify({
          type: 'success',
          message: 'Success! Payment successful',
        });
        this.dispatch('getLoggingUser');
        return this.$router.replace('/user/payments/deposit'); // Prevent user from navigating to payment verify url
      }
      notify({
        type: 'error',
        message: 'Error! Payment Failed. Please contact the admin',
      });
      return this.$router.replace('/user/payments/deposit');
    } catch (error) {
      this.$router.replace('/user/payments/deposit');
      return notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async getUsersApi({ commit }, payload) {
    try {
      let url = '/api/v1/users?';
      for (const [key, value] of Object.entries(payload.query)) {
        url += `&${key}=${value}`;
      }
      const res = await this.$axios.$get(url);
      if (res.status)
        return this.commit(
          'user/setUsers',
          res.data.filter((item) => item.status !== 'PENDING' && item.status !== 'PENDING_PAYMENT'),
        );
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async getPendingUsersApi({ commit }, status) {
    try {
      const res = await this.$axios.$get(`/api/v1/users?role=agent&status=${status}`);
      if (res.status) return this.commit('user/setPendingUsers', res.data);
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async getUserApi({ commit }, payload) {
    let url = `/api/v1/users/search?username=${payload}`;
    try {
      const res = await this.$axios.$get(url);
      commit('setUser', res.data[0]);
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async getUserNetworkApi({ commit }, payload) {
    try {
      let url = '/api/v1/users/network?';
      for (const [key, value] of Object.entries(payload)) {
        url += `${key}=${value}&`;
      }
      const res = await this.$axios.$get(url);
      if (res.status) this.commit('user/setUsers', res);
      // return this.$router.push('/user/downlines');
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async searchUserApi({ commit }, payload) {
    try {
      let url = '/api/v1/users/search?';
      for (const [key, value] of Object.entries(payload.query)) {
        url += `&${key}=${value}`;
      }
      const res = await this.$axios.$get(url);
      if (res.status) return this.commit('user/setUsers', res.data);
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async getParentApi({ commit }, payload) {
    try {
      let url = '/api/v1/users?limit=500';
      for (const [key, value] of Object.entries(payload.query)) {
        url += `&${key}=${value}`;
      }
      const res = await this.$axios.$get(url);
      if (res.status) return this.commit('user/setParent', res.data);
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async fundTransactionApi({ commit }, payload) {
    const res = await this.$axios.$post(payload.url, payload.data);

    try {
      if (res.status) {
        return res;
      }
    } catch (error) {}
  },

  async updateDataApi({ commit }, payload) {
    try {
      const res = await this.$axios.$put('/api/v1/users/update', payload.data);
      if (res.status) {
        return res;
      }
    } catch (error) {}
  },

  async getSalesReportApi({ commit }, payload) {
    try {
      let url = '/api/v1/sportbook/pool/bas/bets/reports?';
      for (const [key, value] of Object.entries(payload.query)) {
        url += `&${key}=${value}`;
      }
      const res = await this.$axios.$get(url);
      if (res.status) return this.commit('user/setSalesReport', res);
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async decideUserApi({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/users/approve-user', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {}
  },

  async sendMessageApi({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/messages/add-message', payload.data);
      if (res.status) {
        return res;
      }
    } catch (error) {}
  },

  async getMessagesApi({ commit }, payload) {
    try {
      let url = '/api/v1/messages?';
      for (const [key, value] of Object.entries(payload.query)) {
        url += `&${key}=${value}`;
      }
      const res = await this.$axios.$get(url);
      if (res.status) this.commit('user/setMessageCounts', res.data.filter((item) => item.status === 'UNREAD').length);
      return this.commit('user/setMessages', res);
    } catch (error) {
      notify({
        type: 'error',
        message: 'Error! Internal server error',
      });
    }
  },

  async deleteMessageApi({ commit }, payload) {
    try {
      let url = '/api/v1/messages/delete-message?';
      for (const [key, value] of Object.entries(payload.query)) {
        url += `&${key}=${value}`;
      }
      const res = await this.$axios.$delete(url);
      if (res.status) {
        return res;
      }
    } catch (error) {}
  },

  async readMessageApi({ commit }, payload) {
    try {
      const res = await this.$axios.$put('/api/v1/messages/read-message', payload.data);
      if (res.status) {
        return res;
      }
    } catch (error) {}
  },

  async getCommissionsApi({ commit }) {
    try {
      let url = '/api/v1/commissions';
      const res = await this.$axios.$get(url);
      if (res.status) return this.commit('user/setCommissions', res);
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async addCommissionApi({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/commissions', payload.data);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async assignCommissionsApi({ commit }, payload) {
    try {
      const res = await this.$axios.$put('/api/v1/commissions/assign', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async deleteCommissionApi({ commit }, payload) {
    try {
      const res = await this.$axios.$delete('/api/v1/commissions', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async editCommissionApi({ commit }, payload) {
    try {
      const res = await this.$axios.$put('/api/v1/commissions', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  // Assign dettings to user
  async withdrawalSettingApi({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/finances/assign-withdrawal-setting', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async updateProfileApi({ commit }, payload) {
    try {
      const res = await this.$axios.$put('/api/v1/users/update', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async makeWithdrawalRequestApi({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/finances/make-withdrawal-request', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async setAutoWithdrawalApi({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/finances/auto-withdrawal', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async decidePayoutRequestApi({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/finances/wallet/decidePayoutRequest', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async getWithdarawalSettingsApi({ commit }, payload) {
    try {
      let url = '/api/v1/finances/get-withdrawal-setting?';
      for (const [key, value] of Object.entries(payload.query)) {
        url += `&${key}=${value}`;
      }
      const res = await this.$axios.$get(url);
      if (res.status) return this.commit('user/setWithdarawalSettings', res.data);
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async addWithdrawalSettingsApi({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/finances/add-withdrawal-setting', payload.data);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async updateWithdrawalSettingsApi({ commit }, payload) {
    try {
      const res = await this.$axios.$put('/api/v1/finances/update-withdrawal-setting', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async getActivityLogApi({ commit }, payload) {
    try {
      let url = '/api/v1/activities?';
      for (const [key, value] of Object.entries(payload.query)) {
        url += `&${key}=${value}`;
      }
      const res = await this.$axios.$get(url);
      if (res.status) return this.commit('user/setActivityLogs', res);
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async fetchBanks({ commit }) {
    try {
      const res = await this.$axios.$get('https://nigerianbanks.xyz');

      commit('setBanks', res);
    } catch (error) {}
  },

  async addPersonalBankApi({ commit }, payload) {
    try {
      const res = await this.$axios.$put('/api/v1/users/add-bank', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async getTagsApi({ commit }) {
    try {
      let url = '/api/v1/tags';
      const res = await this.$axios.$get(url);
      if (res.status) return this.commit('user/setTags', res);
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async addTagApi({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/tags/add-tag', payload.data);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async assignTagsApi({ commit }, payload) {
    try {
      const res = await this.$axios.$put('/api/v1/users/assign-tag', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },

  async addCommentApi({ commit }, payload) {
    try {
      const res = await this.$axios.$post('/api/v1/comments/add-comment', payload);
      if (res.status) {
        return res;
      }
    } catch (error) {
      notify({
        type: 'error',
        message: error.response.data.message,
      });
    }
  },
  async iFrameAuth({ commit }, payload) {
    const { username, accessToken, fallbackUrl } = payload;
    const response = {
      username,
      authorisationToken: accessToken,
      internal: true,
    };
    try {
      const res = await this.$axios.$post('/api/v1/users/authorize', response);
      this.$auth.setUser(res.data);
    } catch (error) {
      context.redirect(fallbackUrl);
    }
  },
};
