<template>
  <main>
    <lazy-car-user-header title="Edit Profile" />

    <a-tabs default-active-key="1" class="edit">
      <a-tab-pane key="1" tab="Personal Information" class="text-primary-default-main">
        <div class="max-w-sm px-2 mx-auto mb-10" style="max-width: 340px">
          <div class="w-full mt-6 mb-4 text-left">
            <label for="" class="text-xs text-primary-default-main"> Username </label>
            <a-input disabled class="text-primary-default-main" placeholder="Username" />
          </div>

          <div class="w-full mt-2 mb-4 text-left">
            <label for="first-name" class="text-xs text-primary-default-main"> Firstname </label>
            <a-input disabled class="text-primary-default-main" placeholder="First Name" />
          </div>

          <div class="w-full mt-2 mb-4 text-left">
            <label for="first-name" class="text-xs text-primary-default-main"> Last Name </label>
            <a-input disabled class="text-primary-default-main" placeholder="Last Name" />
          </div>

          <div class="w-full mt-2 mb-4 text-left">
            <label for="gender" class="text-xs"> Gender </label>
            <a-input placeholder="Gender" class="text-primary-default-main" />
          </div>

          <div class="w-full mt-2 mb-4 text-left">
            <label for="state" class="text-xs text-primary-default-main"> State </label>
            <a-input placeholder="State" disabled class="text-primary-default-main" />
          </div>

          <div class="w-full mt-2 mb-4 text-left">
            <label for="lga" class="text-xs text-primary-default-main"> LGA </label>
            <a-input placeholder="LGA" disabled class="text-primary-default-main" />
          </div>

          <div class="w-full mt-2 mb-4 text-left">
            <label for="email" class="text-xs text-primary-default-main"> Email Address </label>
            <a-input disabled class="text-primary-default-main" placeholder="Email Address" />
          </div>

          <div class="w-full mt-2 mb-4 text-left">
            <label for="phone" class="text-xs text-primary-default-main"> Phone Number </label>
            <a-input placeholder="Phone Number" class="text-primary-default-main" />
          </div>

          <a-button size="large" class="w-full mt-4 text-white bg-primary-m-success"> Update Profile </a-button>
        </div>
      </a-tab-pane>
    </a-tabs>
  </main>
</template>
<script lang="ts">
import { mapGetters, mapActions } from 'vuex';

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters({}),
  },

  data() {
    return {
      bankCode: undefined,
      showAddBankButton: false,
      banks: [],
    };
  },

  methods: {
    handleBankCode(value: any) {
      // @ts-ignore
      const selectedBank = this.getBanks.filter((bank) => bank.slug === value);
      // @ts-ignore
      this.bankCode = selectedBank[0].code;
    },

    showAddBank() {
      this.showAddBankButton = !this.showAddBankButton;
    },

    ...mapActions({}),
  },

  mounted() {},
};
</script>
<style lang="scss" scoped>
.ant-tabs-nav .ant-tabs-tab-active {
  @apply text-primary-default-main;
}
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

.float-body {
  position: relative;
  display: flex;
  border: 1px solid #2b3e5c;
  border-radius: 7px;
}

.float-body input {
  height: 40px;
  border-radius: 7px !important;
}

.float-body .label-text {
  position: absolute;
  background-color: #fff;
  padding: 0 5px;
  margin-left: 28px;
  font-size: 14px;
  font-weight: 500;
  color: #2b3e5c;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s ease-in;
  z-index: 1;
}

.float-body .label-text._1fQvSmCukgwkF1lE {
  color: #777a7e !important;
  cursor: default !important;
}

.float-body .label-text.label-style {
  background-color: transparent !important;
}

.float-body .label-text.labela {
  margin-left: 10px;
}

.float-body ._2giGEHjXqhN-Xf2B {
  width: 35px;
  height: auto;
  box-sizing: border-box;
  opacity: 0.5;
}

.float-body._18_edgxJMLM49mYJ,
.float-body:focus-within {
  border-color: #2b3e5c;
}

.float-body._18_edgxJMLM49mYJ .label-text,
.float-body:focus-within .label-text {
  outline: none;
  font-size: 10px;
  height: auto;
  transform: translateY(-8px);
  background-color: #fff !important;
  color: #2b3e5c;
}

.float-body._18_edgxJMLM49mYJ ._2giGEHjXqhN-Xf2B,
.float-body:focus-within ._2giGEHjXqhN-Xf2B {
  opacity: 1;
}

.float-body.ghPg5EVA_HILY6IJ {
  border-color: #ff423e;
}

.float-body.ghPg5EVA_HILY6IJ .label-text {
  outline: none;
  font-size: 10px;
  height: auto;
  transform: translateY(-8px);
  color: #ff423e;
}

.float-body.ghPg5EVA_HILY6IJ:after {
  /* content:""; */
  width: 19px;
  height: 19px;
  position: absolute;
  right: 12px;
  top: calc(50% - 10px);
  background-image: url(/_next/static/chunks/images/error-icon-030a1ddf6074903c3f66841abbf43aba.svg);
  background-size: contain;
  background-repeat: no-repeat;
}

.float-body._1fQvSmCukgwkF1lE {
  background-color: transparent;
  border-color: #777a7e !important;
}

.MOSRwCkpf9GMcT_O {
  width: 100%;
  position: absolute;
  top: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #576b8c;
}

.MOSRwCkpf9GMcT_O ._1eYLx5UF7a5WXO3O {
  color: #ff423e;
  margin: 5px auto 0 10px;
}

.MOSRwCkpf9GMcT_O ._3QkyvQcSpNhzRh2Z {
  margin: 5px 10px 0 auto;
}

.OFLJIb-meXBiutzX {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.3rem;
  padding: 0.1rem 1rem;
  min-height: 2.5rem;
  margin: 16px 13px 0;
}

.float-body.ghPg5EVA_HILY6IJ:after {
  content: '';
  width: 19px;
  height: 19px;
  position: absolute;
  right: 12px;
  top: calc(50% - 10px);
  background-image: url(/_next/static/chunks/images/error-icon-030a1ddf6074903c3f66841abbf43aba.svg);
  background-size: contain;
  background-repeat: no-repeat;
}

.float-body._1fQvSmCukgwkF1lE {
  background-color: transparent;
  border-color: #777a7e !important;
}

.MOSRwCkpf9GMcT_O {
  width: 100%;
  position: absolute;
  top: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #576b8c;
}

.MOSRwCkpf9GMcT_O ._1eYLx5UF7a5WXO3O {
  color: #ff423e;
  margin: 5px auto 0 10px;
}

.MOSRwCkpf9GMcT_O ._3QkyvQcSpNhzRh2Z {
  margin: 5px 10px 0 auto;
}

.OFLJIb-meXBiutzX {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.3rem;
  padding: 0.1rem 1rem;
  min-height: 2.5rem;
  margin: 16px 13px 0;
}

.OFLJIb-meXBiutzX._2644eqS_-oXnhDye {
  background-color: #ffe7e6;
  color: #ff100b;
  border: 1px solid #ff100b;
}

.OFLJIb-meXBiutzX._2644eqS_-oXnhDye ._1URsNhRuYKVSqWf_ {
  width: 35px;
  height: 25px;
  margin-right: 10px;
  background-image: url(/_next/static/chunks/images/alert-f26303269031282eaca2293055290b7f.svg);
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
}

.OFLJIb-meXBiutzX._1QuLn-OlaKedzJfu {
  background-color: #94e1ab;
  color: #22773b;
  border: 1px solid #22773b;
}

.OFLJIb-meXBiutzX._1QuLn-OlaKedzJfu ._1URsNhRuYKVSqWf_ {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background-image: url(/_next/static/chunks/images/success-b3559512a5afbf5655e75b8a3a26d8dd.svg);
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
}

.OFLJIb-meXBiutzX li {
  margin-left: 35px;
}

.OFLJIb-meXBiutzX .OG92AYxX5nyU3w-f {
  font-size: 12px;
  font-weight: 500;
}

.oqF_9ZPB-Y5nxT10 {
  padding: 0 13px;
  margin-bottom: 15px;
}

._20R8F0RcJOKwX-Hu {
  width: 100%;
  height: 41px;
  border-radius: 3px;
  overflow: hidden;
}

._20R8F0RcJOKwX-Hu a {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: inherit;
  text-decoration: none;
  height: 100%;
  width: 100%;
}

._29DwS56L8fT70XnS {
  background-color: #2d9f4f;
}

._29DwS56L8fT70XnS:hover {
  background-color: #33b359;
}

._29DwS56L8fT70XnS span {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  display: block;
  transition-timing-function: ease-in-out;
  transition-duration: 0.4s;
  top: 0;
  transition-property: top;
}

.table {
  &-container {
    display: grid;
    grid-template-columns: 40px 2fr 2fr 1fr;
  }
  &-title {
    padding: 0rem 0.25rem;
    font-size: 14px;
    font-weight: 600;
    @media only screen and (min-width: 640px) {
      // font-size: 16px;
      padding: 0rem 1rem;
    }
  }
  &-data {
    padding: 0.75rem 0.25rem;
    font-size: 14px;
    &:hover {
      background: #ba85ca33;
    }

    @media only screen and (min-width: 640px) {
      font-size: 16px;
      padding: 0.75rem 1rem;
    }
  }
}
</style>
