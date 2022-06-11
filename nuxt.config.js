// import hooks from './hooks';
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: true,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Car | The Dealer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' },
    ],
    // script: [{ src: 'ant-design-vue/lib/index.js' }],
  },
  loading: {
    continuous: true,
  },
  loadingIndicator: {
    name: 'folding-cube',
    color: '#3B8070',
    background: 'white',
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/ant/main.less', '~/assets/css/index.scss'],

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/antd-ui',
    { src: '@/plugins/vuex-persist', ssr: false },
    { src: '@plugins/vue-datepicker' },
    { src: '@plugins/vuelidate' },
    '@/plugins/responsive',
    { src: '@/plugins/vue-chartjs', ssr: false },
    { src: '@/plugins/axios' },
    { src: '@/plugins/vue-editor', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [
    {
      path: '~/components/',
      prefix: 'car',
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss', '@nuxtjs/pwa'],

  tailwindcss: {
    jit: true,
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dayjs',
    'nuxt-webfontloader',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            iso: 'en-US',
            name: 'English',
            flag: 'UK-EIRE',
            file: 'en-US.js',
          },

          {
            code: 'fr',
            iso: 'fr-FR',
            name: 'French',
            flag: 'France',
            file: 'fr-FR.js',
          },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'en',
        vueI18n: {
          numberFormats: {
            en: {
              currency: {
                style: 'currency',
                currency: 'NGN',
                currencyDisplay: 'symbol',
                currencySymbol: '₦',
              },
            },
          },
        },
      },
    ],
    '@nuxtjs/svg-sprite',
  ],

  webfontloader: {
    google: {
      // families: ['Lato:400,700'],
      families: ['Montserrat:100,200,300,400,500,600,700,800,900'],
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */

  dayjs: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
    ], // Your Day.js plugin
  },

  axios: {},

  router: {
    base: '/',
    middleware: ['user'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
      });
    },
  },
  // hooks: hooks(this),

  auth: {
    redirect: {
      login: '/',
      logout: '/',
      home: '/user/overview',
    },
    resetOnError: true,
    rewriteRedirects: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/v1/users/login',
            method: 'post',
            propertyName: 'data.accessToken',
          },
          logout: false,
          user: {
            url: '/api/v1/users/me',
            method: 'get',
            propertyName: 'data',
          },
        },
      },
    },
  },

  // router: { middleware: ['auth'] },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    websiteUrl: process.env.WEBSITE_URL,
  },
  build: {
    babel: {
      plugins: [['import', { libraryName: 'ant-design-vue' }]],
    },

    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          math: 'always',
        },
      },
    },

    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    },
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT,
  },
};
