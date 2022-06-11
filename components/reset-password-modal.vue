<template>
  <lazy-car-base-modal title="Reset Password" icon="key" @cancel="destroyResetPasswordModal">
    <template v-slot:body v-if="updateUser">
      <div class="px-6 py-4">
        <div class="mt-4 mr-auto">Reset Password for {{ updateUser.username }}</div>
      </div>
      <form>
        <div class="flex flex-col items-center px-4 mt-2">
          <div class="flex items-center">
            <span class="mr-2">
              <svg-icon name="key" class="inline w-4 h-4 fill-current"></svg-icon>
            </span>
            <a-input-password v-model="password"></a-input-password>
          </div>
        </div>

        <div class="px-1 py-4 mt-4 bg-primary-btn-tert">
          <div class="flex items-center justify-between">
            <a-button @click="destroyResetPasswordModal" class="w-40 m-3 text-white bg-primary-m-danger">Cancel</a-button
            ><a-button @click="resetPassword" class="w-40 m-3 text-white bg-primary-m-success">Proceed</a-button>
          </div>
        </div>
      </form>
    </template>
  </lazy-car-base-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { notify } from '~/utils/utils';
export default Vue.extend({
  props: {
    updateUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      password: '',
    };
  },

  beforeCreate() {
    // @ts-ignore
    this.form = this.$form.createForm(this);
  },

  computed: {
    ...mapGetters({
      getResetPasswordModal: 'user/getResetPasswordModal',
    }),
  },
  methods: {
    async resetPassword() {
      try {
        const data = {
          username: this.updateUser.username,
          password: this.password,
        };
        const res = await this.updateDataApi({
          data,
        });
        if (res.status) {
          // @ts-ignore
          this.password = '';
          this.destroyResetPasswordModal();
          // @ts-ignore
          notify({
            type: 'success',
            message: 'Password reset successfully',
          });
        } else {
          notify({
            type: 'error',
            message: `Error! ${res.message}`,
          });
        }
      } catch (error) {
        notify({
          type: 'error',
          message: 'Internal server error',
        });
      }
    },

    destroyResetPasswordModal() {
      this.$emit('close-fund', false);
    },

    ...mapMutations({
      setResetPasswordModal: 'user/setResetPasswordModal',
    }),

    ...mapActions({
      updateDataApi: 'user/updateDataApi',
    }),
  },
});
</script>

<style lang="scss">
.modal-style {
  & .ant-modal-header {
    @apply font-semibold bg-primary-button text-white text-center;
  }
}

.ant-input-password-icon {
  @apply text-primary-default-main;
}
</style>
