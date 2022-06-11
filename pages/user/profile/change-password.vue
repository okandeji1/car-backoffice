<template>
  <main>
    <lazy-car-user-header title="Change Password" />

    <form class="max-w-sm mx-4 md:mx-auto" style="max-width: 340px">
      <div class="w-full mt-10 mb-4 text-left">
        <label for="first-name" class="text-xs text-primary-default-main"> Current Password </label>
        <a-input-password
          v-model.trim="userPassword.password"
          @blur="$v.userPassword.password.$touch()"
          placeholder="Current Password"
          size="large"
        />

        <!-- <LazyBetBaseInputPassword
          label="Old Password"
          class="mt-6"
          v-model.trim="userPassword.password"
          @blur="$v.userPassword.password.$touch()"
          :error="isOldPasswordError"
          size="small"
        /> -->

        <small class="text-xs text-red-600" v-if="!$v.userPassword.password.minLength"
          >Password must have at least {{ $v.userPassword.password.$params.minLength.min }} letters.
        </small>
        <template v-if="$v.userPassword.password.$error">
          <small class="text-xs text-red-600" v-if="!$v.userPassword.password.required">Password is required</small>
        </template>
      </div>

      <div class="w-full mt-2 mb-4 text-left">
        <label for="first-name" class="mt-3 text-xs text-primary-default-main"> Repeat Password </label>
        <a-input-password v-model.trim="userPassword.repeatPassword" placeholder="Repeat Password" size="large" />
        <!-- <LazyBetBaseInputPassword
          label="Repeat Password"
          class="mt-6"
          v-model.trim="userPassword.repeatPassword"
          :error="isRepeatPasswordError"
          size="small"
        /> -->
        <small class="text-xs text-red-600" v-if="!$v.userPassword.repeatPassword.sameAsPassword">Password do not match </small>
      </div>

      <div class="w-full mt-2 mb-4 text -left">
        <label for="first-name" class="mt-3 text-xs text-primary-default-main"> New Password </label>
        <a-input-password
          v-model.trim="userPassword.newPassword"
          @blur="$v.userPassword.newPassword.$touch()"
          placeholder="New password"
          size="large"
        />

        <!-- <LazyBetBaseInputPassword
          label="New Password"
          class="mt-6"
          v-model.trim="userPassword.newPassword"
          @blur="$v.userPassword.newPassword.$touch()"
          :error="isNewPasswordError"
          size="small"
        /> -->

        <small class="text-xs text-red-600" v-if="!$v.userPassword.newPassword.minLength"
          >Password must have at least {{ $v.userPassword.newPassword.$params.minLength.min }} letters.
        </small>
        <template v-if="$v.userPassword.newPassword.$error">
          <small class="text-xs text-red-600" v-if="!$v.userPassword.newPassword.required">New password is required</small>
        </template>
      </div>

      <a-button
        @click="changePassword"
        size="large"
        class="w-full mx-auto mt-3 mb-6 text-white bg-primary-m-success"
        style="min-width: 200px"
        :disabled="$v.anyError"
      >
        Confirm
      </a-button>
    </form>
  </main>
</template>
<script>
import { minLength, required, sameAs } from 'vuelidate/lib/validators';
import { notify } from '../../../utils/utils';
export default {
  // layout: 'user',
  middleware: 'auth',
  data() {
    return {
      userPassword: this.createFreshPasswordObject(),
    };
  },
  validations: {
    userPassword: {
      password: {
        required,
        minLength: minLength(6),
      },
      newPassword: {
        required,
        minLength: minLength(6),
      },
      repeatPassword: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    createFreshPasswordObject() {
      return {
        password: '',
        newPassword: '',
        repeatPassword: '',
      };
    },
    async changePassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        for (var key in this.userPassword) {
          if (key === 'repeatPassword') {
            delete this.userPassword[key];
          }
        }

        try {
          const res = await this.$axios.$put('/api/v1/users/change-password', this.userPassword);
          if (res.status) {
            notify({
              type: 'success',
              message: res.message,
            });
            this.userPassword = this.createFreshPasswordObject();
            this.$v.$reset();
          }
        } catch (error) {
          notify({
            type: 'error',
            message: error.response.data.message,
          });
        }
      }
    },
  },
  computed: {
    isOldPasswordError() {
      return this.$v.userPassword.password.$error;
    },
    isNewPasswordError() {
      return this.$v.userPassword.newPassword.$error;
    },
    isRepeatPasswordError() {
      return this.$v.userPassword.repeatPassword.$error;
    },
    isPasswordError() {
      return this.$v.userPassword.password.$error;
    },
  },
};
</script>
<style lang="scss" scoped>
.ant-input {
  // box-sizing: border-box;
  // margin: 0;
  // padding: 0;
  // font-variant: tabular-nums;
  // list-style: none;
  // font-feature-settings: 'tnum', 'tnum';
  // position: relative;
  // display: inline-block;
  // width: 100%;
  height: 38px !important;
  // padding: 4px 11px;
  // color: rgba(0, 0, 0, 0.65);
  // font-size: 14px;
  // line-height: 1.5;
  // background-color: #fff;
  // background-image: none;
  // border-radius: 0.5rem;
  // transition: all 0.3s;
}

.ant-input:focus {
  @apply border-primary-bg-sec;
}
.ant-input:hover {
  @apply border-primary-bg-sec;
}
.ant-input {
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
  transition: all 0.3s;
}
.ant-form-item-label,
.ant-form-item-control-wrapper {
  display: block;
  width: 15rem;
}
.ant-calendar-picker {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum', 'tnum';
  position: relative;
  display: inline-block;
  outline: none;
  cursor: text;
  transition: opacity 0.3s;
  width: 100%;
}
.ant-select-selection {
  display: block;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-top-width: 1.02px;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ant-input-affix-wrapper .ant-input-prefix,
.ant-input-affix-wrapper .ant-input-suffix {
  top: 60% !important;
}
</style>
