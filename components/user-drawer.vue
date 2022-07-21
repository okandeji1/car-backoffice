<template>
  <div>
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
            <p class="text-gray-900">123</p>
            <p class="text-gray-900">admin</p>
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
      <div class="flex flex-col items-center">
        <button type="primary" @click="logout" class="px-2 btn-outline-error" ghost>{{ $t('components.userDrawer.logout') }}</button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({ userDrawer: 'pool/userDrawer',}),
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
</style>
