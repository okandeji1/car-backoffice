<template>
  <div v-if="isAuthenticated">
    <a-drawer placement="right" :closable="false" :visible="userDrawer" @close="onCloseUserDrawer" class="my-draw">
      <span class="flex items-center justify-between">
        <span class="heading-4">{{ $t('components.userDrawer.welcome') }}</span>
        <a @click="onCloseUserDrawer">
          <svg-icon name="close" class="w-4 h-4 fill-current" />
        </a>
      </span>
      <div class="flex flex-row items-center justify-between mt-4">
        <div class="flex flex-row justify-between">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-basic-300">
            <a-icon type="user" class="" />
          </div>
          <div class="flex flex-col ml-2">
            <p class="text-gray-900">{{ loggedInUser.userId }}</p>
            <p class="text-gray-900">{{ loggedInUser.role }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-between mt-4">
        <nuxt-link :to="localePath('/sport')" class="flex flex-row items-center justify-between m-1 btn-filled-primary">
          {{ $t('components.userDrawer.sport') }}
        </nuxt-link>
        <nuxt-link :to="localePath('/pool')" class="flex flex-row items-center justify-between m-1 btn-outline-primary">
          {{ $t('components.userDrawer.pool') }}
        </nuxt-link>
        <nuxt-link :to="localePath('/virtual')" class="flex flex-row items-center justify-between m-1 btn-filled-primary">
          {{ $t('components.userDrawer.virtual') }}
        </nuxt-link>
      </div>
      <div class="flex flex-row justify-between mt-4">
        <div class="flex flex-col">
          <button class="flex w-12"><svg-icon name="transaction" class="h-12" /></button>
          <p>{{ $t('components.userDrawer.transaction') }}</p>
        </div>
        <div class="flex flex-col">
          <button class="flex w-12"><svg-icon name="withdraw" class="h-12" /></button>
          <p>{{ $t('components.userDrawer.withdraw') }}</p>
        </div>
        <div class="flex flex-col">
          <button class="flex w-12"><svg-icon name="deposit" class="h-12" /></button>
          <p>{{ $t('components.userDrawer.deposit') }}</p>
        </div>
      </div>
      <div class="flex flex-col mt-4">
        <div class="flex flex-row justify-between">
          <p>{{ $t('components.userDrawer.balance') }}</p>
          <p>{{ $n(loggedInUser.wallet.balance) }}</p>
        </div>
        <div class="flex flex-row justify-between">
          <p>{{ $t('components.userDrawer.trustBalance') }}</p>
          <p>{{ $n(loggedInUser.wallet.trust) }}</p>
        </div>
        <div class="flex flex-row justify-between">
          <p>
            <nuxt-link :to="localePath('/user/bet-list-sport')" class="text-gray-900"> {{ $t('components.userDrawer.betList') }}</nuxt-link>
          </p>
          <p></p>
        </div>
        <div class="flex flex-row justify-between">
          <p>{{ $t('components.userDrawer.accountSetting') }}</p>
        </div>
        <div class="flex flex-row justify-between">
          <p>{{ $t('components.userDrawer.giftCard') }}</p>
          <p
            class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-primary-m-danger rounded-full"
          >
            {{ $t('components.userDrawer.comingSoon') }}
          </p>
          <!-- <p>{{ $n(loggedInUser.wallet.trust) }}</p> -->
        </div>
        <div class="flex flex-row justify-between">
          <p>{{ $t('components.userDrawer.myMessages') }}</p>
        </div>
        <div class="flex flex-row justify-between">
          <p>{{ $t('components.userDrawer.affilateProgram') }}</p>
        </div>
        <div class="flex flex-row justify-between">
          <p>{{ $t('components.userDrawer.help') }}</p>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <button type="primary" @click="logout" class="px-2 btn-outline-error" ghost>{{ $t('components.userDrawer.logout') }}</button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({ userDrawer: 'pool/userDrawer', isAuthenticated: 'isAuthenticated', loggedInUser: 'loggedInUser' }),
  },

  methods: {
    async logout() {
      let res = await this.$auth.logout();
      this.onCloseUserDrawer();
    },

    ...mapMutations({
      toggleUserDrawer: 'pool/toggleUserDrawer',
      onCloseUserDrawer: 'pool/onCloseUserDrawer',
    }),
  },
};
</script>

<style lang="scss">
// .draw {
//   .ant-drawer-wrapper-body {
//     @apply p-4;
//   }

//   .ant-drawer-body {
//     padding: 0.75rem;
//   }

//   @screen md {
//     .ant-drawer-content-wrapper {
//       width: 24rem !important;
//     }
//   }
// }
</style>
