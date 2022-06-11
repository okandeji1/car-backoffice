// import VuexPersistence from 'vuex-persist';

// export default ({ store }) => {
//   window.onNuxtReady(() => {
//     new VuexPersistence({
//       storage: window.localStorage,
//     }).plugin(store);
//   });
// };

import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
  createPersistedState({
    // paths: ['bet.coupon', 'settings.locale', 'settings.theme', 'pool.coupon'],
    fetchBeforeUse: true,
  })(store);
};
