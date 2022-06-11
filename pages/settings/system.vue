<template>
  <div>
    <lazy-car-user-header title="System" icon="transaction-list" />
    <div class="m-4 text-primary-default-main">
      <div class="text-lg site-format">
        <h1 class="text-primary-default-main">Site Format</h1>
        <a-radio-group :style="radioGroupStyle" v-model="defaultSiteFormat" @change="onChangeSiteFormat">
          <a-radio v-for="content in siteFormat.contents" :key="content.id" :style="radioStyle" :value="content.value"> {{ content.name }} </a-radio>
        </a-radio-group>
      </div>
      <div class="mt-4 text-lg appearance">
        <h1 class="text-primary-default-main">Appearance</h1>
        <a-radio-group :style="radioGroupStyle" v-model="theme" @change="onChangeToggleTheme">
          <a-radio v-for="content in themeFormat.contents" :key="content.id" :style="radioStyle" :value="content.value"> {{ content.name }} </a-radio>
        </a-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  // layout: 'user',
  middleware: 'user',
  data() {
    return {
      defaultSiteFormat: 'FIXED_WIDTH',
      radioGroupStyle: {
        display: 'block',
        marginLeft: '24px',
      },

      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
      siteFormat: {
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
      themeFormat: {
        id: 1,
        mainTitle: 'Appearance',
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
            name: 'Light',
            value: 'base',
          },
          {
            id: 2,
            name: 'Dark',
            value: 'dark',
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      changeSiteFormat: 'settings/changeSiteFormat',
      toggleTheme: 'settings/toggleTheme',
    }),

    onChangeSiteFormat(e) {
      this.changeSiteFormat(e.target.value);
    },
    onChangeToggleTheme(e) {
      this.toggleTheme(e.target.value);
    },
  },
  watch: {
    theme(newTheme, oldTheme) {
      newTheme === 'base' ? document.querySelector('html').classList.remove('dark') : document.querySelector('html').classList.add('dark');
    },
  },
  computed: {
    ...mapGetters({
      theme: 'settings/getTheme',
    }),
  },
};
</script>

<style lang="scss">
.ant-radio-wrapper {
  @apply text-primary-default-main;
}
</style>
