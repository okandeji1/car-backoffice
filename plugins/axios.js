import { init } from '../utils/event-emitter';

export default function (ctx) {
  // let token = $auth.user.token;
  ctx.$axios.defaults.baseURL = ctx.$config.apiUrl;
  ctx.$axios.defaults.headers.common['x-api-key'] = ctx.$config.apiKey;

  ctx.$axios.interceptors.response.use(
    (response) => {
      // if (response.config.meta?.success?.showNotification) {
      //   openNotification({
      //     type: 'success',
      //     message: 'Success',
      //     description: response.data.message,
      //   });
      // }
      // if (response.config.meta?.refresh) {
      //   axios({
      //     url: `/api/v1/users/me`,
      //     method: 'get',
      //   }).then((res) => {
      //     return store.dispatch(setWallet(res.data.data.wallet));
      //   });
      // }

      // if (response.config.meta?.enableLoading) {
      //   store.dispatch(setLoading(false));
      // }

      // // FIXME: to be removed later, Already replaced with callbacks
      // if (response.config.meta?.callback) {
      //   response.config.meta.callback();
      // }

      // if (response.config.meta?.callbacks?.length > 0) {
      //   for (const callback of response.config.meta.callbacks) {
      //     callback();
      //   }
      // }
      // ctx.$notification.error({
      //   message: 'goode eks',
      //   description: 'better goodle',
      // });

      return response;
    },
    async function (error) {
      // const originalRequest = error.config || error.response?.config;
      // const userStore = store.getState().user.user;

      // let refreshToken = userStore?.refreshToken;

      // if (refreshToken && error.response?.status === 401 && error.response?.data.data.includes('TokenExpiredError') && !originalRequest?._retry) {
      //   originalRequest._retry = true;
      //   const res = await axios({
      //     url: `/api/v1/users/refresh-token?refreshToken=${refreshToken}`,
      //     method: 'get',
      //   });

      //   store.dispatch(setToken(res.data.data.accessToken));

      //   return axios(originalRequest);
      // }

      // if (originalRequest?.meta?.error?.showNotification) {
      //   let message = error.response?.data?.message || 'Network Error';
      //   if (error.response?.status === 404) {
      //     message = error.response?.statusText;
      //   }

      //   openNotification({
      //     type: 'error',
      //     message: 'Error',
      //     description: message,
      //   });
      // }

      // if (originalRequest?.meta?.enableLoading) {
      //   store.dispatch(setLoading(false));
      // }

      return Promise.reject(error);
    },
  );

  // $axios.onError((error) => {
  //   if (error.response && error.response.status === 500) {
  //     redirect('/');
  //   }
  // });

  // $axios.interceptors.response.use((response) => {
  //   if (response.status === 200) {
  //     if (response.request.responseURL && response.request.responseURL.includes('login')) {
  //       store.dispatch('setUser', response);
  //     }
  //   }
  //   return response;
  // });

  // $axios.onError((error) => {
  //   const code = parseInt(error.response && error.response.status);
  //   if (code === 401) {
  //     // TODO: optionally show notification if meta contains show notification
  //     // store.dispatch('logout');
  //     // localStorage.removeItem('last_url');
  //     // localStorage.setItem('last_url', window.location.pathname);
  //     // window.location = '/login';
  //   }
  // });

  init(ctx)

}
