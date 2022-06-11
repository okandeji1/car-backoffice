//@ts-ignore
import enUs from 'ant-design-vue/lib/locale-provider/en_US';

export const state = () => ({
  locale: enUs,
  leftMenu: false,
  loginDrawer: false,
  userDrawer: false,
  oddsFormat: 'decimal',
  oddsFormats: ['decimal', 'american', 'fraction'],
  timezone: 'WAT - Lagos',
  timezones: [
    {
      name: 'WAT - Lagos',
    },
  ],
  themes: 'base',
  rightMenu: {
    visible: false,
    mode: 'open-mini',
  },
  poolLeftMenu: false,
  poolBetMenu: {
    visible: false,
    mode: 'open-mini',
  },
  settingsMenu: false,
  shopperLeftMenu: false,
  userLeftMenu: false,
  notLoggedInModal: false,
  siteFormat: 'FIXED_WIDTH',
  isIframe: false,
});

export const getters = {
  getTheme(state) {
    return state.themes;
  },
  locale(state) {
    return state.locale;
  },
  leftMenu(state) {
    return state.leftMenu;
  },

  poolLeftMenu(state) {
    return state.poolLeftMenu;
  },

  rightMenu(state) {
    return state.rightMenu;
  },

  poolBetMenu(state) {
    return state.poolBetMenu;
  },

  loginDrawer(state) {
    return state.loginDrawer;
  },
  settingsMenu(state) {
    return state.settingsMenu;
  },

  oddsFormat(state) {
    return state.oddsFormat;
  },
  timezone(state) {
    return state.timezone;
  },
  // theme(state) {
  //   return state.theme;
  // },

  oddsFormats(state) {
    return state.oddsFormats;
  },
  timezones(state) {
    return state.timezones;
  },
  shopperLeftMenu(state) {
    return state.shopperLeftMenu;
  },
  userDrawer(state) {
    return state.userDrawer;
  },
  // User
  userLeftMenu(state) {
    return state.userLeftMenu;
  },
  showNotLoggedInModal(state) {
    return state.notLoggedInModal;
  },
  getSiteFormat(state) {
    return state.siteFormat;
  },
  getIsIframe(state) {
    return state.isIframe;
  },
};

export const mutations = {
  toggleLeftMenu(state) {
    return (state.leftMenu = !state.leftMenu);
  },

  togglePoolLeftMenu(state) {
    return (state.poolLeftMenu = !state.poolLeftMenu);
  },

  onCloseLeftMenu(state) {
    return (state.leftMenu = false);
  },

  onClosePoolLeftMenu(state) {
    return (state.poolLeftMenu = false);
  },

  toggleRightMenu(state, menu) {
    const coupon = this.getters['bet/getCoupon'];
    if (coupon.Odds.length < 1 && menu.mode === 'micro-menu') {
      menu = {
        ...menu,
        mode: 'mini-menu',
      };
    }
    return (state.rightMenu = menu);
  },

  togglePoolBetMenu(state, menu) {
    this.commit('pool/setBetMenuActiveTab', 'betslip');
    return (state.poolBetMenu = menu);
  },

  onCloseRightMenu(state) {
    return (state.rightMenu.visible = false);
  },

  onClosePoolBetMenu(state) {
    return (state.poolBetMenu.visible = false);
  },

  toggleLoginDrawer(state) {
    return (state.loginDrawer = !state.loginDrawer);
  },
  onCloseLoginDrawer(state) {
    return (state.loginDrawer = false);
  },

  toggleSettingsMenu(state) {
    if (!state.settingsMenu) {
      state.leftMenu = false;
    }
    return (state.settingsMenu = !state.settingsMenu);
  },
  onCloseSettingsMenu(state) {
    return (state.settingsMenu = false);
  },

  changeOddsFormat(state, value) {
    return (state.oddsFormat = value);
  },
  changeTimezone(state, value) {
    return (state.timezone = value);
  },

  // changeTheme(state, value = {}) {
  //   if (!value.key) {
  //     value = {
  //       key: state.theme,
  //     };
  //   }

  //   const cl = document.documentElement.classList;
  //   cl.remove(state.theme);

  //   cl.add(value.key);

  //   return (state.theme = value.key);
  // },

  toggleShopperLeftMenu(state) {
    return (state.shopperLeftMenu = !state.shopperLeftMenu);
  },

  onCloseShopperLeftMenu(state) {
    return (state.shopperLeftMenu = false);
  },
  toggleUserDrawer(state) {
    return (state.userDrawer = !state.userDrawer);
  },
  onCloseUserDrawer(state) {
    return (state.userDrawer = false);
  },
  // user
  toggleUserLeftMenu(state) {
    return (state.userLeftMenu = !state.userLeftMenu);
  },
  onCloseUserLeftMenu(state) {
    return (state.userLeftMenu = false);
  },
  setNotLoggedInModal(state, value) {
    return (state.notLoggedInModal = value);
  },

  setTheme(state, theme) {
    state.themes = theme;
  },

  toggleSiteFormat(state, value) {
    state.siteFormat = value;
  },

  SET_IFRAME_LAYOUT(state, payload) {
    state.isIframe = payload;
  },
};

export const actions = {
  initTheme({ commit }) {
    const lsSettings = JSON.parse(localStorage.getItem('vuex')).settings;
    const cachedTheme = lsSettings.themes ? lsSettings.themes : false;

    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (cachedTheme) commit('setTheme', cachedTheme);
    else if (userPrefersDark) commit('setTheme', 'dark');
    else commit('setTheme', 'base');
  },

  toggleTheme({ commit }, selectedTheme) {
    const lsSettings = JSON.parse(localStorage.getItem('vuex')).settings;

    switch (lsSettings.themes) {
      case 'base':
        commit('setTheme', selectedTheme);
        break;

      default:
        commit('setTheme', selectedTheme);
        break;
    }
  },

  changeSiteFormat({ commit }, payload) {
    commit('toggleSiteFormat', payload);
  },

  changeToIframe({ commit }, payload) {
    commit('SET_IFRAME_LAYOUT', payload);
  },
};
