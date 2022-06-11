<template>
  <div>
    <lazy-car-user-header title="User Profile" icon="profile" />

    <div class="px-4">
      <a-card class="mt-4 mb-4">
        <div class="grid md:grid-cols-2">
          <div v-if="user">
            <p><span class="font-bold"> ID: </span> {{ user.userId }}</p>
            <p><span class="font-bold"> Username: </span> {{ user.username }}</p>
            <p><span class="font-bold"> Role: </span> {{ user.role }}</p>
            <p><span class="font-bold"> Parent: </span> {{ user.parent }}</p>
          </div>

          <div>
            <p><span class="font-bold"> Parent: </span> {{ dayjs(user.createdAt).format('DD-MM-YYYY') }}</p>
            <p><span class="font-bold"> Status: </span> {{ user.status }}</p>
            <p><span class="font-bold"> KYC: </span> Passed</p>
            <p><span class="font-bold"> Status: </span> {{ user.status }}</p>
          </div>
        </div>
      </a-card>

      <a-card>
        <a-tabs type="card" :default-active-key="key" @change="callback">
          <a-tab-pane key="profile" tab="Full Profile">
            <lazy-car-user-profile-data :user="user"></lazy-car-user-profile-data>
          </a-tab-pane>
          <a-tab-pane key="deposits" tab="Deposits">
            <lazy-car-user-deposits :user="user"></lazy-car-user-deposits>
          </a-tab-pane>
          <a-tab-pane key="transactions" tab="Transactions">
            <lazy-car-user-transactions :user="user"></lazy-car-user-transactions>
          </a-tab-pane>
          <a-tab-pane key="withdrawals" tab="Withdrawals">
            <lazy-car-user-withdrawals :user="user"></lazy-car-user-withdrawals>
          </a-tab-pane>
          <a-tab-pane key="documents" tab="Documents">
            <lazy-car-user-documents :user="user"></lazy-car-user-documents>
          </a-tab-pane>
          <a-tab-pane key="logs" tab="Logs">
            <lazy-car-user-logs :user="user"></lazy-car-user-logs>
          </a-tab-pane>
          <a-tab-pane key="settings" tab="Limit & Parameters">
            <lazy-car-user-settings :user="user"> </lazy-car-user-settings>
          </a-tab-pane>
          <a-tab-pane key="roles" tab="Roles">
            <lazy-car-user-roles :user="user"> </lazy-car-user-roles>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';

export default {
  // layout: 'default-2',

  data() {
    return {
      key: 'profile',
      tab: '',
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    }),
  },

  methods: {
    dayjs,
    callback(tab) {
      this.tab = tab;

      this.$router.replace({ query: { ...this.$route.query, tab } });
    },

  },
  created() {
    let name = this.$route.query.tab;
    this.key = name;
  },
};
</script>

<style lang="scss">
.ant-card {
  @apply bg-primary-input text-primary-default-main;
}
</style>
