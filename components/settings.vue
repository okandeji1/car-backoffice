<template>
  <div class="settings-select">
    <div v-if="settingsMenu && !screens.md">
      <div class="cover" @click="onCloseSettingsMenu"></div>
      <div class="modal">
        <div class="flex justify-between border-b border-b-basic-200">
          <h4 class="heading-4">{{ $t('components.settings.title') }}</h4>
          <a @click="onCloseSettingsMenu">
            <svg-icon name="close" class="w-4 h-4 fill-current" />
          </a>
        </div>
        <div class="flex flex-col my-4">
          <label class="mb-2 subtitle-4 -hint-text" for="oddsFormat">{{ $t('components.settings.oddsFormat') }}</label>
          <a-dropdown>
            <span class="flex items-center h-8 control-basic bg-basic-tranparent-200">
              <span class="flex-1">{{ oddsFormat }}</span>
              <a-icon type="down" class="ml-4" />
            </span>
            <a-menu selectable slot="overlay" @click="changeOddsFormat" class="">
              <a-menu-item v-for="item in oddsFormats" :key="item" class="flex items-center">
                {{ item }}
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>

        <div class="flex flex-col my-4">
          <label class="mb-2 subtitle-4 -hint-text" for="timezone">{{ $t('components.settings.timezone') }}</label>
          <a-dropdown>
            <span class="flex items-center h-8 control-basic bg-basic-tranparent-200">
              <span class="flex-1">{{ timezone }}</span>
              <a-icon type="down" class="ml-4" />
            </span>
            <a-menu selectable slot="overlay" @click="changeTimezone" class="">
              <a-menu-item v-for="timezone in timezones" :key="timezone.name" class="flex items-center">
                {{ timezone.name }}
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="flex flex-col my-4">
          <label class="mb-2 subtitle-4 -hint-text" for="language">{{ $t('components.settings.language') }}</label>
          <a-dropdown>
            <span class="flex items-center h-8 control-basic bg-basic-tranparent-200">
              <svg-icon :name="$i18n.locales.find((item) => item.code === $i18n.locale).flag" class="w-4 h-4 mr-2" />
              <span class="flex-1">{{ $i18n.locales.find((item) => item.code === $i18n.locale).name }}</span>
              <a-icon type="down" class="ml-4" />
            </span>
            <a-menu selectable slot="overlay" @click="setLocale" class="">
              <a-menu-item v-for="locale in $i18n.locales" :key="locale.code" class="flex items-center">
                <svg-icon :name="locale.flag" class="w-4 h-4 mr-2" />
                {{ locale.name }}
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </div>
    <div v-if="screens.md" class="flex items-center justify-between w-full px-4 bg-white text-alternate">
      <div class="settings-left"></div>

      <div class="flex items-center settings-right">
        <div class="flex items-center settings-right">
          <div id="theme-switcher" class="theme-switcher">
            <div class="button__light" @click="toggleTheme('base')"></div>
            <div class="button__dark" @click="toggleTheme('dark')"></div>
            <div class="button__switcher"></div>
          </div>

          <div class="py-2 mr-2 text-xs text-primary-alternate">
            <span>Welcome </span>
            <span>john20</span>
            <span>(ID: 100246)</span>
          </div>
          <!-- TODO: Find another way without repetition -->
          <!-- Tenant and staff -->
          <div class="flex items-center unit user-area">
            <a-dropdown :trigger="['click']" class="bg-primary-table">
              <svg-icon
                @click="(e) => e.preventDefault()"
                name="settings"
                class="inline-block w-4 h-4 mr-1 cursor-pointer fill-current text-primary-alternate"
              ></svg-icon>

              <a-menu slot="overlay" v-for="setting in settings" :key="setting.id">
                <a-menu-item key="4"> {{ setting.mainTitle }}: </a-menu-item>
                <a-menu-divider />
                <a-radio-group v-for="content in setting.contents" :key="content.id" v-model="value" @change="onChange">
                  <a-radio :style="setting.radioStyle" :value="content.value"> {{ content.name }} </a-radio>
                </a-radio-group>
              </a-menu>
            </a-dropdown>
          </div>
          <div class="flex items-center unit user-area" >
            <nuxt-link to="/user/main/messages" class="flex">
              <svg-icon name="email" class="inline-block w-4 h-4 mr-1 cursor-pointer fill-current text-primary-alternate"></svg-icon>
            </nuxt-link>
          </div>
          <div class="font-bold cursor-pointer unit user-area">
            <div class="flex items-center px-1 text-sm capitalize">
              <svg-icon
                @click="(e) => e.preventDefault()"
                name="user-solid"
                class="inline-block w-4 h-4 mr-1 cursor-pointer fill-current text-primary-alternate"
              ></svg-icon>

              <nuxt-link to="/user/overview" class="flex items-center text-primary-alternate">
                <span>ADMIN</span>
              </nuxt-link>
            </div>
          </div>
          <button class="ml-2 text-white rounded-md bg-primary-m-danger unit">
            <span class="text-sm font-bold capitalize cursor-pointer">LOGOUT</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { io } from 'socket.io-client';
import { notify } from '~/utils/utils';

// const socket = ref();
export default Vue.extend({
  data() {
    return {
      panelOpen: false,
      isSettings: false,
      isTheme: false,
      value: 'FIXED_WIDTH',
      settings: [
        {
          id: 1,
          mainTitle: 'Site Format',
          radioStyle: {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            paddingLeft: '16px',
            paddingRight: '16px',
          },
          contents: [
            {
              id: 1,
              name: 'Full Width',
              value: 'FULL_WIDTH',
            },
            {
              id: 2,
              name: 'Fixed Width',
              value: 'FIXED_WIDTH',
            },
          ],
        },
      ],
    };
  },

  beforeCreate() {
    // @ts-ignore
    this.form = this.$form.createForm(this);
  },

  computed: {
    ...mapGetters({
      settingsMenu: 'settings/settingsMenu',
      oddsFormat: 'settings/oddsFormat',
      timezone: 'settings/timezone',
      oddsFormats: 'settings/oddsFormats',
      timezones: 'settings/timezones',
      theme: 'settings/getTheme',
    }),
  },
  methods: {
    ...mapActions({
      initTheme: 'settings/initTheme',
      toggleTheme: 'settings/toggleTheme',
      changeSiteFormat: 'settings/changeSiteFormat',
    }),

    themeSwitcher() {
      // @ts-ignore
      const htmlClasses = document.querySelector('html').classList;
      const isDark = htmlClasses.contains('dark');

      isDark ? htmlClasses.remove('dark') : htmlClasses.add('dark');
    },

    setLocale(events: any) {
      this.$i18n.setLocale(events.key);
    },

    loadLSTheme() {
      this.theme === 'base' ? document.querySelector('html').classList.remove('dark') : document.querySelector('html').classList.add('dark');
    },

    openTheme() {
      this.isTheme = !this.isTheme;
    },
    openSettings() {
      this.isSettings = !this.isSettings;
    },

    onChange(e: any) {
      this.changeSiteFormat(e.target.value);
    },

    ...mapMutations({
      onCloseSettingsMenu: 'settings/onCloseSettingsMenu',
      changeOddsFormat: 'settings/changeOddsFormat',
      changeTimezone: 'settings/changeTimezone',
      changeTheme: 'settings/changeTheme',
    }),
  },

  watch: {
    theme(newTheme, oldTheme) {
      newTheme === 'base' ? document.querySelector('html').classList.remove('dark') : document.querySelector('html').classList.add('dark');
    },
  },

  mounted() {},

  beforeMount() {
    this.initTheme();
    this.loadLSTheme();
  },
});
</script>

<style lang="scss" scoped>
.ant-dropdown-menu {
  @apply bg-primary-table;
}
.ant-radio-group {
  display: block;
}

.ant-radio-inner::after {
  @apply bg-primary-m-warning  #{!important};
}

.ant-radio-checked .ant-radio-inner,
.ant-radio-inner,
.ant-radio-inner::after {
  @apply border border-primary-m-warning bg-primary-m-warning;
}

.theme-switcher {
  @apply bg-primary-switcher mr-2;
  width: 56px;
  height: 24px;
  cursor: pointer;
  border-radius: 12px;
  display: flex;
  position: relative;
  user-select: none;
}

.button__dark {
  height: 24px;
  width: 24px;
  background-image: url(https://res.cloudinary.com/dvuogdjyq/image/upload/v1641845947/theme_whuzqd.svg);
  background-position: 10px 5px;
  transition: filter 0.25s ease;
  z-index: 1;
}

.button__light {
  height: 24px;
  width: 24px;
  background-image: url(https://res.cloudinary.com/dvuogdjyq/image/upload/v1641845947/theme_whuzqd.svg);
  background-position: -54px 4px;
  transition: filter 0.25s ease;
  z-index: 1;
}

.button__switcher {
  width: 22px;
  height: 22px;
  border-radius: 100%;
  background-color: #fff;
  position: absolute;
  top: 1px;
  left: 2px;
  right: 4px;
  transition: left 0.25s, background-color 0.25s;
}

.dark .theme-switcher .button__switcher {
  left: calc(100% - 26px);
}
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
  padding: 4px 6px;
  @apply border-l border-primary-border;
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
