<template>
  <div class="text-primary-default-main bg-primary-bg">
    <div class="layout-container">
      <div class="layout-body__1">
        <div class="body-container">
          <div class="body-logo">
            <span class="text-xl icon-size"> Car </span>
          </div>
          <div class="body-main">
            <h1 class="text-2xl font-medium leading-10 text-primary-default-main">Sign In</h1>

            <form class="mt-6 form-container" @submit.prevent="loginForm">
              <div>
                <LazyCarBaseInput label="Username" placeholder="Username" :error="isUsernameError" size="small" v-model="$v.login.username.$model" />
                <small class="text-xs text-red-600" v-if="!$v.login.username.minLength"
                  >Username must have at least {{ $v.login.username.$params.minLength.min }} letters.
                </small>
                <template v-if="$v.login.username.$error">
                  <small class="text-xs text-red-600" v-if="!$v.login.username.required">Username is required</small>
                </template>
              </div>
              <div>
                <LazyCarBaseInputPassword
                  label="Password"
                  placeholder="Password"
                  class="mt-6"
                  v-model="$v.login.password.$model"
                  :error="isPasswordError"
                  size="small"
                />
                <small class="text-xs text-red-600" v-if="!$v.login.password.minLength"
                  >Password must have at least {{ $v.login.password.$params.minLength.min }} letters.
                </small>
                <template v-if="$v.login.password.$error">
                  <small class="text-xs text-red-600" v-if="!$v.login.password.required">Password is required</small>
                </template>
              </div>

              <div class="mt-4">
                <button class="login-btn" :disabled="isLoading" :class="[isLoading ? 'cursor-not-allowed' : '']">
                  <span>
                    <svg-icon v-if="isLoading" :class="{ 'loading-icon': isLoading }" name="loading" class="inline w-4 h-4"></svg-icon>
                    Sign In
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div class="text-center body-footer">
            <span class="create-account">
              <p>
                Don't have an account?
                <nuxt-link class="footer-link text-primary-default-main" :to="{ path: '/' }"> Create Account </nuxt-link>
              </p>
            </span>
            <span class="forget-pass">
              <nuxt-link class="footer-link text-primary-default-main" :to="{ path: '/forgot-password' }">
                <p>Forgot Password</p>
              </nuxt-link>
            </span>
          </div>
        </div>
      </div>
      <div class="layout-body__2"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { notify } from '~/utils/utils';
import { minLength, required } from 'vuelidate/lib/validators';

// const socket = ref();
export default {
  layout: 'default-2',
  middleware: 'guest',
  beforeCreate() {
    // @ts-ignore
    this.form = this.$form.createForm(this);
  },

  data() {
    return {
      reveal: false,
      login: this.createFreshLoginObject(),
      disabled: false,
      isLoading: false,
    };
  },
  validations: {
    login: {
      username: {
        required,
        minLength: minLength(4),
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },

  computed: {
    ...mapGetters({
      theme: 'settings/theme',
      isAuthenticated: 'isAuthenticated',
      loggedInUser: 'loggedInUser',
    }),
    isUsernameError() {
      return this.$v.login.username.$error;
    },
    isPasswordError() {
      return this.$v.login.password.$error;
    },
    isBtnDisabled() {
      // return this.$v.$invalid || this.username == '' || this.password == '' ? true : false;
      return this.$v.login.$invalid;
    },
  },
  methods: {
    createFreshLoginObject() {
      return {
        username: '',
        password: '',
      };
    },
    async loginForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isLoading = true;
        const validateNumber = /[0-9]{11}/;

        try {
          if (this.login.username.includes('-')) {
            this.login.username = this.login.username.toUpperCase();
          } else if (this.login.username.match(validateNumber)) {
            this.login.username = this.login.username.replace('0', '+234');
          } else {
            this.login.username = this.login.username;
          }

          await this.$auth.loginWith('local', {
            data: this.login,
          });
          notify({
            type: 'success',
            message: this.$t('components.login.notification.success.message'),
          });
        } catch (error) {
          notify({
            type: 'error',
            message: this.$t('components.login.notification.error.message'),
          });
        } finally {
          this.isLoading = false;
        }
      }
    },
  },

  mounted() {
    this.$nextTick(() => {});
  },
};
</script>

<style lang="scss" scoped>
.ant-badge-count {
  width: 16px !important;
  height: 16px !important;
  line-height: 16px;
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

@media only screen and (min-width: 800px) {
  .layout-container {
    display: grid;
    grid-template-columns: 24rem 1fr;
  }
}

.layout-container {
  min-height: 100vh;
}

@media only screen and (min-width: 800px) {
  .layout-body__2 {
    background-image: url('~assets/images/signin.jpg');
    height: 100%;
    background-attachment: fixed;
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    display: block;
  }
}

.layout-body__1 {
  height: 100%;
}

.body-container {
  display: grid;
  gap: 2rem;
  grid-template-areas:
    'logo logo'
    'main main'
    'footer footer';
  grid-template-rows: repeat(3, minmax(2rem, min-content)) auto;
  grid-template-columns: 2.625rem auto;
  min-height: 100vh;
  padding: 2rem;
  align-items: center;
}

.body-icon {
  grid-area: icon / icon / icon / icon;
}

.svg-bac {
  position: relative;
  width: 100%;
  border: 1px solid transparent;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6.25rem;
  font-size: 1.25rem;
  line-height: 0;
  cursor: pointer;
  text-decoration: none;
  background-color: rgb(235, 235, 235);
}
.body-logo {
  grid-area: logo / logo / logo / logo;
}
.body-main {
  grid-area: main / main / main / main;
  width: 100%;
}

.icon-size {
  width: 100%;
  max-width: 8rem;
  display: block;
}

.form-container {
  display: grid;
  row-gap: 1.5rem;
}

.login-btn {
  display: inline-block;
  width: 100%;
  min-height: 1.5rem;
  font-family: inherit;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 6.25rem;
  transition: background-color 0.2s ease 0s;
  white-space: nowrap;
  position: relative;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  line-height: 1.5rem;
  height: 3rem;
  padding: 0px 1.5rem;
  background: #dd4f46;
  // @apply bg-primary-bg;
}

.body-footer {
  grid-area: footer / footer / footer / footer;
}

.footer-link {
  display: inline-block;
  padding: 0px;
  font: inherit;
  background-color: transparent;
  border: 0px;
  cursor: pointer;
  text-decoration: none;
  @apply text-primary-bg-sec;
}
.loading-icon {
  animation: spin-animation 0.7s infinite;
  display: inline-block;
}

@keyframes spin-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>
