<template>
  <a-config-provider :locale="locale">
    <main class="h-screen overflow-x-hidden layout bg-primary-bg text-primary-default-main">
      <div class="bg-white">
        <header :class="getSiteFormat == siteFormat ? 'mw-container' : ''">
          <car-settings />
        </header>
      </div>
      <header class="primary__gradient">
        <div :class="getSiteFormat == siteFormat ? 'mw-container' : ''">
          <nav class="flex items-center justify-between h-16 px-4">
            <div class="left-nav">
              <nuxt-link to="/user/overview">
                <img src="" width="140" alt="Logo" class="text-white" />
              </nuxt-link>
            </div>
          </nav>
        </div>
      </header>
      <header>
        <car-m-settings @visible="checkSentData" />
      </header>

      <div :class="getSiteFormat == siteFormat ? 'mw-container' : ''">
        <main id="user-area" class="grid mx-1 my-1" :class="[gridType, collapseSidebar ? 'collapse-sidebar' : '']">
          <!-- style="grid-template-columns: 220px 1fr" -->
          <aside id="asideleft" class="overflow-y-scroll sideleft">
            <div class="aside-bar">
              <div class="aside-header">
                <lazy-car-user-header v-if="!collapseSidebar" icon="menu" title="USER AREA MENU">
                  <template v-slot:close>
                    <svg-icon
                      name="arrow"
                      style="transform: rotate(90deg)"
                      @click="collapse"
                      class="inline w-4 h-4 cursor-pointer fill-current text-primary-icon"
                    ></svg-icon>
                  </template>
                </lazy-car-user-header>

                <div v-else class="relative h-8 icon-main bg-primary-bg-ter text-primary-default-main">
                  <div class="flex items-center icon-style" @click="collapse">
                    <svg-icon name="arrow" style="transform: rotate(270deg)" class="inline-block w-4 h-4 mx-1 my-1 fill-current text-primary-icon">
                    </svg-icon>
                  </div>
                </div>
              </div>
              <div class="aside-content" style="height: 100vh; overflow-y: scroll">
                <div class="flex flex-col" v-for="link in userAreaLinks" :key="link.id">
                  <a-tooltip>
                    <template slot="title"> {{ link.title }} </template>
                    <div
                      class="flex flex-no-wrap items-center justify-start h-8 overflow-hidden text-sm font-medium text-white border-b cursor-pointer bg-primary-bg-sec border-primary-border bg-primary-sidebar"
                      @click.prevent="link.isOpen = !link.isOpen"
                    >
                      <div class="mx-3" v-if="!collapseSidebar">
                        <svg-icon
                          :name="link.icon"
                          class="inline-block fill-current"
                          :class="link.isOpen ? 'rotate' : 'rotate-right'"
                          style="height: 10px; width: 10px"
                        ></svg-icon>
                        <span class="ml-2"> {{ link.title }} </span>
                      </div>
                      <div v-else class="mx-2" :class="link.isOpen ? 'rotate' : 'rotate-right'">
                        <svg-icon :name="link.collapseIcon" class="inline-block w-4 h-4 text-white fill-current"></svg-icon>
                      </div>
                    </div>
                  </a-tooltip>

                  <div @click="collapseOnScreenSize" v-for="sublink in link.subLinks" style="height: auto" v-if="link.isOpen">
                    <nuxt-link
                      :to="{ path: sublink.link }"
                      class="flex flex-wrap items-center h-8 overflow-hidden text-sm font-medium whitespace-no-wrap translate-x-4 border-b border-gray-500 text-primary-default-main"
                      :class="[collapseSidebar ? 'pl-2' : '']"
                    >
                      <svg-icon
                        :name="sublink.icon"
                        class="inline-block w-4 h-4 fill-current text-primary-icon"
                        :class="[!collapseSidebar ? 'ml-8 mr-3' : '']"
                      ></svg-icon>

                      <span v-if="!collapseSidebar">{{ sublink.title }}</span>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div class="flex flex-col ml-1 main-content min-h-page">
            <div class="">
              <div v-if="$nuxt.isOffline">
                <lazy-car-offline> </lazy-car-offline>
              </div>
              <Nuxt v-else />
            </div>

            <a-row :gutter="[4, 4]" class="mt-auto">
              <a-col :xs="24" :md="12" :xl="6">
                <div class="flex flex-col items-center justify-center h-24 border bg-primary-input">
                  <button class="flex items-center justify-around w-56 p-2 rounded-full btn-filled-primary text-primary-default-main">
                    <svg-icon name="mobile" class="w-8 h-8 fill-current -100" />
                    <span>{{ $t('default.footer.downloadApp') }}</span>
                  </button>
                  <ul class="flex flex-row flex-wrap items-center justify-around w-full mt-2 mb-0">
                    <li>
                      <nuxt-link :to="localePath('/')" class="link-primary">{{ $t('default.footer.aboutUs') }}</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link :to="localePath('/')" class="link-primary">{{ $t('default.footer.tc') }}</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link :to="localePath('/')" class="link-primary">{{ $t('default.footer.help') }}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </a-col>
              <a-col :xs="24" :md="12" :xl="8">
                <div class="flex items-center justify-around h-24 border bg-primary-input">
                  <a class="w-10 h-10 p-2 rounded-full btn-outline-primary bg-primary-input" href="#"
                    ><svg-icon name="facebook" class="w-full h-full fill-current"
                  /></a>
                  <a class="w-10 h-10 p-2 rounded-full btn-outline-primary" href="#"
                    ><svg-icon name="twitter" class="w-full h-full fill-current"
                  /></a>
                  <a class="w-10 h-10 p-2 rounded-full btn-outline-primary" href="#"
                    ><svg-icon name="instagram" class="w-full h-full fill-current"
                  /></a>
                </div>
              </a-col>
              <a-col :xs="24" :md="12" :xl="8">
                <div class="h-24 border bg-basic-400 payment-methods bg-primary-input" />
              </a-col>
              <a-col :xs="24" :md="12" :xl="8">
                <div class="flex items-center justify-around h-24 text-center border bg-primary-input">
                  <span class="paragraph-3">{{ $t('default.footer.copyright1') }}</span>
                  <span class="paragraph-3">{{ $t('default.footer.copyright2') }}</span>
                </div>
              </a-col>
            </a-row>
          </div>
        </main>
      </div>
    </main>
  </a-config-provider>
</template>
<script lang="ts">
import { mapGetters, mapMutations, mapActions } from 'vuex';
import settings from '~/components/settings.vue';

const tenantUserLinks = [
  {
    id: 1,
    title: 'Main',
    icon: 'arrow',
    collapseIcon: 'briefcase',
    isOpen: true,
    subLinks: [
      {
        id: 1,
        title: 'Overview',
        icon: 'balance',
        link: '/user/overview',
      },
      {
        id: 2,
        title: 'Dealers',
        icon: 'transaction-list',
        link: '/user/payments/transaction-list',
      },
      {
        id: 3,
        title: 'Products',
        icon: 'transaction-list',
        link: '/user/payments/transaction-list',
      },
      {
        id: 4,
        title: 'Transactions',
        icon: 'transaction-list',
        link: '/user/payments/transaction-list',
      },
    ],
  },
  {
    id: 4,
    title: 'My Network',
    collapseIcon: 'hierarchical-structure',

    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Staff',
        icon: 'balance',
        link: '/user/network/staff',
      },
    ],
  },
  {
    id: 8,
    title: 'Merchant',
    collapseIcon: 'income',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Gateway 1',
        icon: 'balance',
        link: '/user/merchant/gateway-1',
      },
      {
        id: 2,
        title: 'Gateway 2',
        icon: 'balance',
        link: '/user/merchant/gateway-2',
      },
      {
        id: 3,
        title: 'Gateway 3',
        icon: 'balance',
        link: '/user/merchant/gateway-3',
      },
    ],
  },
  {
    id: 3,
    title: 'Account Details',
    icon: 'arrow',
    collapseIcon: 'menu',

    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Change Personal Data',
        icon: 'profile',
        link: '/user/profile/edit-profile',
      },
      {
        id: 2,
        title: 'Change Password',
        icon: 'password',
        link: '/user/profile/change-password',
      },
    ],
  },
  {
    id: 5,
    title: 'Reports',
    collapseIcon: 'profit-report',
    icon: 'arrow',

    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Sales',
        icon: 'chart',
        link: '/user/reports/sales',
      },
      {
        id: 2,
        title: 'Activity Log',
        icon: 'chart',
        link: '/user/reports/activity-log',
      },
    ],
  },
  {
    id: 9,
    title: 'Settings',
    collapseIcon: 'black-settings-button',
    icon: 'arrow',

    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Configurations',
        icon: 'settings',
        link: '/user/settings/configurations',
      },
      {
        id: 3,
        title: 'System',
        icon: 'settings',
        link: '/user/settings/system',
      },
    ],
  },
];

const unAuthhUserLinks = [
  {
    id: 1,
    title: 'My Account',
    icon: 'arrow',
    isOpen: true,
    collapseIcon: 'briefcase',
    subLinks: [
      {
        id: 1,
        title: 'Overview',
        icon: 'balance',
        link: '/user/overview',
      },
      // {
      //   id: 3,
      //   title: 'Cash Desk',
      //   icon: 'cashier-desk',
      //   link: '/user/main/cashier-desk',
      // },
    ],
  },
  {
    id: 2,
    title: 'Print Odds',
    collapseIcon: 'printer-2',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Standard Print',
        icon: 'balance',
        to: '/user/print/standard-print',
      },
      {
        id: 2,
        title: 'Fast Print',
        icon: 'f-print',
        to: '/user/print/fast-print',
      },
    ],
  },
  {
    id: 9,
    title: 'Settings',
    collapseIcon: 'black-settings-button',
    icon: 'arrow',

    isOpen: true,

    subLinks: [
      {
        id: 3,
        title: 'System',
        icon: 'settings',
        link: '/user/settings/system',
      },
    ],
  },
];

export default {
  components: { settings },
  head() {
    return this.$nuxtI18nSeo();
  },

  computed: {
    ...mapGetters({
      locale: 'settings/locale',
      theme: 'settings/getTheme',
      getSiteFormat: 'settings/getSiteFormat',
    }),

    beforeCreate() {
      // @ts-ignore
      this.form = this.$form.createForm(this);
    },

    gridType() {
      // @ts-ignore
      return this.cashierMenu ? 'gridCashier' : 'gridNorm';
    },

    resizeContent() {
      let classes;
      // if (this.screens.lg && !this.leftMenu) {
      //   this.toggleUsereLeftMenu();
      // }
      if (this.screens.lg) {
        classes = {
          ...classes,
          'ml-64': true,
        };
      } else if (this.screens.md && !this.screens.lg) {
        classes = {
          ...classes,
          'ml-10': true,
        };
      }

      if (this.cashierMenu && this.screens.lg) {
        classes = {
          ...classes,
          'mr-desk': true,
        };
      }
      return classes;
    },

    userAreaLinks() {
      return this.tenantUserLinks;
      // return this.unAuthhUserLinks;
    },
  },

  watch: {
    windowWidth(newData, oldData) {
      if (newData <= 768) {
        this.collapseSidebar = true;
      } else {
        this.collapseSidebar = false;
      }
    },
  },

  data() {
    return {
      siteFormat: 'FIXED_WIDTH',
      collapseSidebar: false,
      tenantUserLinks,
      unAuthhUserLinks,
      windowHeight: 0,
      windowWidth: 0,
    };
  },

  methods: {
    checkSentData(e: any) {
      this.collapseSidebar = !this.collapseSidebar;
    },

    collapseOnScreenSize() {
      if (this.windowWidth <= 768 && this.windowWidth >= 600) {
        this.collapseSidebar = true;
      } else if (this.windowWidth < 600) {
        this.collapseSidebar = !this.collapseSidebar;
      }
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    },

    collapse() {
      this.collapseSidebar = !this.collapseSidebar;
    },

    ...mapMutations({
      changeTheme: 'settings/changeTheme',
    }),

    ...mapActions({
      getLoggingUser: 'getLoggingUser',
    }),
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>
<style>
body {
  overflow: hidden;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.gridNorm {
  /* grid-template-columns: 220px 1fr; */
  grid-template-columns: 220px calc(100% - 220px);
}

.rotate-right {
  transform: rotate(-90deg);
}

.mx-3.rotate {
  transform: rotate(0deg);
}

.collapse-sidebar {
  /* grid-template-columns: 44px 1fr; */
  grid-template-columns: 44px calc(100% - 44px);
  transition: all 0.35s ease-in-out;
}

@media only screen and (min-width: 425px) {
  .gridNorm {
    /* grid-template-columns: 220px 1fr; */
    grid-template-columns: 220px 100%;
  }
}

@media only screen and (min-width: 600px) {
  .collapse-sidebar {
    /* grid-template-columns: 0px 1fr; */
    grid-template-columns: 0px 100%;
    transition: all 0.35s ease-in-out;
  }

  .gridNorm {
    /* grid-template-columns: 220px 1fr; */
    grid-template-columns: 220px 100%;
  }
}

.gridCashier {
  /* grid-template-columns: 220px 1fr 240px; */
  grid-template-columns: 220px 100% 240px;
}

.min-h-page {
  min-height: 32rem;
}

header.head {
  @apply z-10 flex justify-center overflow-hidden p-2 h-16;

  transition: all 4s;
}

.head-menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, 3rem);
  flex-grow: 1;
  max-width: 80%;
  grid-gap: 0.5rem;
}

.payment-methods {
  background-image: url('~assets/images/payment-methods.svg');
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}

.content {
  transition: all 0.3s;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.m-nav {
  margin-left: -16rem;
}

.mr-desk {
  margin-right: 17rem;
}
.mr-menu {
  margin-right: 0.2rem;
}

@screen lg {
  header.head {
    position: absolute;
    top: 1rem;
    left: calc(50% - var(--header-width) / 2);
    width: var(--header-width);
  }
}

.button {
  background: var(--primary-green);
  color: #fff;
}

.sideleft {
  height: fit-content;
  transition: all 0.45s ease-in-out;
}
.icon-style {
  display: flex;
  flex-direction: row;
  justify-content: normal;
  align-items: center;
  float: left;
  min-height: 19px;
  min-width: 35px;
  margin-right: 6px;
  padding-right: 12px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.icon-style::after {
  content: '';
  height: 20pt;
  width: 10px;
  position: absolute;
  top: 0;
  right: -4px;
  transform: skew(-10deg);
  z-index: 1;
  @apply bg-primary-bg-ter;
}

.icon-main {
  /* padding: 4px 0; */
  color: #fff;
  background-color: #ffd200;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14.67px;
  display: flex;
  align-items: center;
}
</style>
