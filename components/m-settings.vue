<template>
  <div class="settings-select">
    <div v-if="!screens.md && !screens.xl && !screens.lg" class="flex items-center justify-between w-full px-4 bg-white text-primary-alternate">
      <div>
        <svg-icon name="menu" @click="showMe" class="inline w-4 h-4 fill-current"></svg-icon>
      </div>

      <div class="flex items-center settings-right">
        <div  class="flex items-center settings-right">
          <div class="py-2 mr-2 text-xs">
            <span>Welcome </span>
            <a>John Dow</a>
            <span>(ID: 123048</span>
          </div>

          <span class="text-sm font-bold capitalize cursor-pointer unit" @click="logout">LOGOUT</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
  data() {
    return {
      panelOpen: false,
      isSettings: false,
      isTheme: false,
      msgCounts: 5,
      sidebarIsVisible: false,
    };
  },

  computed: {
    ...mapGetters({
      settingsMenu: 'settings/settingsMenu',
      theme: 'settings/theme',
      timezone: 'settings/timezone',
      themes: 'settings/themes',
      timezones: 'settings/timezones',
      loggedInUser: 'loggedInUser',
    }),
  },
  methods: {
    async logout() {
      // @ts-ignore
      let res = await this.$auth.logout();
    },

    showMe() {
      this.sidebarIsVisible = !this.sidebarIsVisible;

      this.$emit('visible', this.sidebarIsVisible);
    },

    setLocale(events: any) {
      this.$i18n.setLocale(events.key);
    },

    openTheme() {
      this.isTheme = !this.isTheme;
    },
    openSettings() {
      this.isSettings = !this.isSettings;
    },

    ...mapMutations({
      onCloseSettingsMenu: 'settings/onCloseSettingsMenu',
      changeTimezone: 'settings/changeTimezone',
      changeTheme: 'settings/changeTheme',
    }),
  },

  mounted() {},
});
</script>

<style lang="scss" scoped>
.ant-badge-count {
  width: 16px !important;
  height: 16px !important;
  line-height: 16px;
}

.message-badge {
}

.modal {
  @apply p-4 z-30 shadow;

  position: fixed;
  top: calc(50% - var(--modal-height) / 2);
  left: calc(50% - var(--modal-width) / 2);
  width: var(--modal-width);
  height: var(--modal-height);
}

.cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  @apply;
}

.settings-select {
  .ant-select-selection {
    @apply bg-transparent border-0;
  }
  .ant-select-arrow {
    @apply;
  }
  .ant-select-dropdown-menu-item {
    display: flex;
  }
}

.ant-input:focus {
  @apply border-primary-bg-sec;
}
.ant-input:hover {
  @apply border-primary-bg-sec;
}

.ant-input {
  height: 26px !important;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.settings-content,
.theme-content {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  border: 1px solid #ccc;
  background: var(--primary-yellow);
  min-width: 140px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.settings-content::after,
.theme-content::after {
  content: '';
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-bottom: 11px solid var(--primary-yellow);
  right: 3px;
  top: -10px;
  position: absolute;
}

.settings-content a,
.theme-content a {
  color: #fff;
  padding: 10px 16px;
  text-decoration: none;
  display: block;
}

.dropdown .settings-content,
.dropdown .theme-content {
  display: block;
}

.unit {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  border-color: rgba(0, 0, 0, 0.12);
  padding: 4px 6px;
}

.icon span i {
  font-size: 23px;
}

// .unread {
//   background: black;
//   color: #fff;
//   border-radius: 10px;
//   height: 14px;
//   margin: -8px 0 0 -9px;
// }
</style>
