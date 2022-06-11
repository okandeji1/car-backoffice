<template>
  <main>
    <a-drawer
      placement="right"
      :visible="getTagDrawer"
      :destroyOnClose="true"
      @close="destroyTagDrawer"
      class="my-drawer"
      :headerStyle="{
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        height: '60px',
        width: '100%',
        background: '#fff',
      }"
    >
      <div class="px-6">
        <div class="modal-body">
          <div class="modal_body-title">
            <p class="mt-8 mb-2 text-2xl font-bold text-primary-bg-sec">Create Tag</p>
            <p class="mt-2 mb-8 text-xs">Create your personalize tag</p>
          </div>
          <form class="w-full grid-card" :preserve="false">
            <div class="flex flex-col justify-between mr-4">
              <div class="w-full mt-6 mb-4 text-left">
                <label for="" class="text-sm text-primary-default-main"> Tag</label>
                <a-input type="text" v-model="tagData.tag" style="padding-top: 8px" />
              </div>

              <div class="w-full mt-2 mb-4 text-left">
                <label for="" class="text-sm text-primary-default-main"> Minimum Withdrawable Amount </label>
                <a-textarea v-model="tagData.description"
                :auto-size="{ minRows: 3, maxRows: 5 }"
                style="padding-top: 8px" />
              </div>
            </div>
          </form>
        </div>
        <div
          class="block text-center modal-footer"
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #718096',

            padding: '20px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
        >
          <a-button size="large" class="w-2/5 bg-primary-m-danger text-primary-bg-ter" @click="destroyTagDrawer">Cancel</a-button>
          <a-button size="large" class="w-2/5 bg-green-400 bg-primary-m-success text-primary-bg-ter" @click="addTag">Create</a-button>
        </div>
      </div>
    </a-drawer>
  </main>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { notify } from '~/utils/utils';
import { required } from 'vuelidate/lib/validators';

export default Vue.extend({
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      getTagDrawer: 'user/getTagDrawer',
    }),
  },

  data() {
    return {
      tagData: this.createFreshDataObject(),
    };
  },

  validation: {
    data: {
      tag: required,
      description: required,
    },
  },

  methods: {
    async addTag() {
      if (
        !this.tagData.tag
      ) {
        // @ts-ignore
        return notify({
          type: 'error',
          message: 'Tag is required',
        });
      }

      try {
        const res = await this.addTagApi({ data: this.tagData });

        if (res.status) {
          this.createFreshDataObject();
          this.destroyTagDrawer();
          this.getTags({ query: { limit: 50 } });
          // @ts-ignore
          notify({
            type: 'success',
            message: res.message,
          });
        } else {
          // @ts-ignore
          notify({
            type: 'error',
            message: `Error! ${res.message}`,
          });
        }
      } catch (error) {}
    },

    createFreshDataObject() {
      return {
        tag: '',
        description: '',
      };
    },

    destroyTagDrawer() {
      this.$store.commit('user/setShowTagDrawer', false);
    },

    ...mapActions({
      addTagApi: 'user/addTagApi',
      getTagsApi: 'user/getTagsApi',
    }),
  },
});
</script>
