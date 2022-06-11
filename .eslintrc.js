module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'prettier-eslint',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {},
};
