<template>
  <a-modal
    v-model="showNotLoggedInModal"
    @ok="openLogin"
    :okText="$t('components.rightMenu.notLoggedIn.yes')"
    :cancelText="$t('components.rightMenu.notLoggedIn.no')"
    :title="$t('components.rightMenu.notLoggedIn.title')"
    @cancel="setNotLoggedInModal(false)"
    centered
  >
    <p>{{ $t('components.rightMenu.notLoggedIn.description') }}</p>
  </a-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default Vue.extend({
  computed: {
    ...mapGetters({
      showNotLoggedInModal: 'settings/showNotLoggedInModal',
    }),
  },
  methods: {
    openLogin() {
      this.setNotLoggedInModal(false);
      this.toggleLoginDrawer();
    },
    ...mapMutations({
      setNotLoggedInModal: 'settings/setNotLoggedInModal',
      toggleLoginDrawer: 'pool/toggleLoginDrawer',
    }),
  },
});
</script>
