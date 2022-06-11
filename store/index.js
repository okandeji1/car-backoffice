// import VuexPersistence from '@/plugins/vuex-persist';
export const state = () => ({
  counter: 0,
  leftMenu: {},
});

// export const plugins = [VuexPersistence];

export const getters = {
  getLeftMenu(state) {
    return state.leftMenu;
  },

  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  },
};

export const mutations = {
  setLeftMenu(state, { menus }) {
    return (state.leftMenu = menus);
  },
  setLoggedInUser(state, user) {
    return (state.auth.user = user);
  },
};

export const actions = {
  async getLeftMenu(state) {
    try {
      const data = await this.$axios.$get('/api/v1/sportbooks/feeds/prematch/matches/menu');
      state.commit('setLeftMenu', data);
      return data;
    } catch (error) {}
  },

  async getLoggingUser() {
    try {
      const res = await this.$axios.$get('/api/v1/users/me');
      if (res.status) {
        this.commit('setLoggedInUser', res.data);
        return;
      }
    } catch (error) {}
  },
};
