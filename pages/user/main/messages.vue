<template>
  <main>
    <lazy-car-user-header title="Message" icon="balance" />

    <div id="transaction-filter" class="m-4 bg-primary-btn-tert">
      <div class="border-b border-primary-divider" v-if="loggedInUser.role === 'tenant' || loggedInUser.role === 'staff'">
        <div class="px-4 py-2">
          <div class="flex items-center justify-end w-full my-2" v-if="loggedInUser.role === 'tenant' || loggedInUser.role === 'staff'">
            <a-button class="ml-2 text-white bg-primary-m-warning" @click="showMessageEditorModal"> Add New Message </a-button>
          </div>
        </div>
      </div>
      <div></div>
    </div>

    <div class="m-4 transaction-table">
      <div class="flex items-center justify-between w-full px-3 py-2 yell top"></div>

      <a-table
        :columns="columns"
        v-if="!dataIsLoading"
        :data-source="getMessages.data"
        :scroll="{ x: 'calc(700px + 20%)' }"
        :pagination="{
          defaultPageSize: 10,
          size: 'small',
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          //total: 0 || this.getBets.meta.total,
          //showTotal: (total, range) => {
          //return total > 1 ? `Showing ${range[0]} to ${range[1]} of ${total} entries` : `Showing ${range[0]} to ${range[1]} of ${total} entry`;
          //},
        }"
        bordered
      >
        <template slot="sn" slot-scope="text, record, index"> {{ index + 1 }} </template>

        <template slot="priority" slot-scope="index, record">
          <div v-if="loggedInUser.role === 'tenant' || loggedInUser.role === 'staff'">
            <div v-if="record.priority == 'LOW'" class="flex items-center justify-center">
              <svg-icon name="exclamation" class="w-3 h-3 text-black"></svg-icon>
            </div>
          </div>

          <div v-else>
            <div v-if="record.messageId[0].priority == 'LOW'" class="flex items-center justify-center">
              <svg-icon name="exclamation" class="w-3 h-3 text-black"></svg-icon>
            </div>
          </div>
        </template>

        <template slot="createdAt" slot-scope="index, record">
          <span>
            {{ moment(record.createdAt).format('Do MMM, YYYY HH:mm') }}
          </span>
        </template>

        <template slot="status" slot-scope="index, record">
          <div class="flex items-center justify-center">
            <span v-if="record.status === 'READ'">
              <svg-icon name="circle" class="inline-block w-2 h-2 text-white border rounded fill-current border-primary-darker"></svg-icon>
            </span>

            <span v-else>
              <svg-icon name="circle" class="inline-block w-2 h-2 fill-current text-primary-m-success"></svg-icon>
            </span>
          </div>
        </template>

        <template slot="messageId" slot-scope="index, record">
          <span
            class="text-blue-500 cursor-pointer"
            @click="readMessage(record)"
            v-if="loggedInUser.role === 'tenant' || loggedInUser.role === 'staff'"
          >
            {{ record.title }}
          </span>
          <span class="text-blue-500 cursor-pointer" @click="readMessage(record)" v-else> {{ record.messageId[0].title }} </span>
        </template>
        <template slot="typeOfRecipients" slot-scope="index, record">
          <span v-if="loggedInUser.role === 'tenant' || loggedInUser.role === 'staff'">
            {{ record.typeOfRecipients.replaceAll('_', ' ') }}
          </span>

          <span v-else>
            {{ record.recipient }}
          </span>
        </template>

        <template slot="actions" slot-scope="index, record">
          <span class="flex items-center justify-center">
            <a-popconfirm
              title="Are you sure you want to delete this message?"
              placement="topRight"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirmDelete(record)"
            >
              <svg-icon name="trash" class="w-5 h-5 cursor-pointer fill-current text-primary-m-danger"></svg-icon>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
    </div>

    <!-- <div class="mx-4 trans-note">
      *Please note, when filtering specific transaction types, the balance shown is equivalent to the balance as at the time of the transaction
      displayed.
    </div> -->

    <lazy-car-add-message-drawer />
    <lazy-car-message-editor v-if="getMessageEditorModal" />

    <!-- Message modal -->
    <a-modal width="754px" :bodyStyle="modalBodyStyle" :visible="msg.visible" @ok="cancel" @cancel="cancel">
      <h1 class="mt-4 text-2xl text-gray-700">{{ msg.title }}</h1>
      <p v-html="msg.text"></p>
    </a-modal>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import { notify } from '~/utils/utils';

export default Vue.extend({
  middleware: 'auth',
  computed: {
    ...mapGetters({
      getMessages: 'user/getMessages',
      loggedInUser: 'loggedInUser',
      getMessageCounts: 'user/getMessageCounts',
      getMessageEditorModal: 'user/getMessageEditorModal',
    }),
  },

  data() {
    return {
      content: '',
      showEditor: false,
      modalBodyStyle: {
        'max-height': '70vh',
        'overflow-y': 'scroll',
      },
      msg: {},
      dataIsLoading: false,
      columns: [
        {
          title: 'S/N',
          dataIndex: 's/n',
          key: 's/n',
          align: 'center',
          scopedSlots: { customRender: 'sn' },
          width: 60,
        },
        { id: 8, name: 'priority', dataIndex: 'priority', key: 'priority', title: 'Priority', width: 80, scopedSlots: { customRender: 'priority' } },

        { id: 4, name: 'status', dataIndex: 'status', key: 'status', title: 'Status', width: 80, scopedSlots: { customRender: 'status' } },

        {
          id: 7,
          name: 'date',
          dataIndex: 'date',
          key: 'date',
          title: 'Date',
          width: 200,
          scopedSlots: { customRender: 'createdAt' },
        },

        { id: 2, name: 'title', dataIndex: 'title', key: 'title', title: 'Subject', ellipsis: true, scopedSlots: { customRender: 'messageId' } },
        // {
        //   id: 3,
        //   name: 'text',
        //   dataIndex: 'message',
        //   key: 'text',
        //   title: 'Message',
        //   width: 380,
        //   scopedSlots: { customRender: 'text' },
        //   ellipsis: true,
        // },

        {
          id: 5,
          name: 'typeOfRecipients',
          dataIndex: 'typeOfRecipients',
          key: 'typeOfRecipients',
          title: 'Recipient',
          width: 150,
          scopedSlots: { customRender: 'typeOfRecipients' },
        },

        { id: 7, name: 'actions', dataIndex: 'actions', key: 'actions', title: 'Actions', width: 80, scopedSlots: { customRender: 'actions' } },
      ],

      tableHeader: [
        {
          id: 1,
          class: 't-head',
          title: 'ID',
        },
        {
          id: 2,
          class: 't-head text-center',
          title: 'Title',
        },
        {
          id: 3,
          class: 't-head text-left ',
          title: 'Message',
        },
        {
          id: 4,
          class: 't-head text-left ',
          title: 'Status',
        },
        {
          id: 5,
          class: 't-head text-left ',
          title: 'Recipient(s)',
        },
        {
          id: 6,
          class: 't-head text-left ',
          title: 'Date',
        },
        {
          id: 10,
          class: 't-head text-right',
          title: 'Action',
        },
      ],
    };
  },
  methods: {
    moment,
    async confirmDelete(msg: any) {
      try {
        const messageId = this.loggedInUser.role === 'tenant' || this.loggedInUser.role === 'tenant' ? msg.uniqueId : msg._id;
        const res = await this.deleteMessageApi({
          query: { username: this.loggedInUser.username, messageId },
        });
        if (res.status) {
          this.getMessagesApi({
            query: { username: this.loggedInUser.username },
          });
          notify({
            type: 'success',
            message: 'Message deleted successfully',
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
          message: 'Error! Internal server error',
        });
      }
    },
    showAddMessageModal() {
      this.$store.commit('user/setAddMessageModal', true);
    },
    showMessageEditorModal() {
      this.showEditor = true;
      this.$store.commit('user/setMessageEditorModal', true);
    },

    async readMessage(msg: any) {
      if (this.loggedInUser.role === 'tenant' || this.loggedInUser.role === 'staff') {
        this.msg = {
          visible: true,
          title: msg.title,
          text: msg.text,
        };
      } else {
        this.msg = {
          visible: true,
          title: msg.messageId[0].title,
          text: msg.messageId[0].text,
        };
        try {
          const data = {
            username: this.loggedInUser.username,
            uniqueId: msg.uniqueId,
          };
          const res = await this.readMessageApi({ data });
          if (res.status) {
            this.getMessagesApi({
              query: { username: this.loggedInUser.username },
            });
          }
        } catch (error) {}
      }
    },
    cancel() {
      this.msg = {
        visible: false,
      };
    },

    ...mapActions({
      getMessagesApi: 'user/getMessagesApi',
      deleteMessageApi: 'user/deleteMessageApi',
      readMessageApi: 'user/readMessageApi',
    }),
  },

  mounted() {
    this.$nextTick(() => {
      try {
        this.dataIsLoading = true;
        this.getMessagesApi({
          query: { username: this.loggedInUser.username },
        });
      } catch (error) {
      } finally {
        this.dataIsLoading = false;
      }
    });
  },
});
</script>
<style lang="scss" scoped>
.ant-input {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum', 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  height: 40px;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
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

.form-row {
  border-bottom: 1px solid #dbdada;
  min-height: 22px;
}

.form-row .control-label {
  max-width: 35%;
  text-align: right;
  font-size: 14px;
}

.form-row label,
.form-row .periods-container {
  flex: 1;
}

.ant-select-arrow {
  @apply fill-current text-primary-default-main;
}

.checkbox-container {
  max-width: 530px;
}

.radio-button > div {
  flex-basis: 33.3%;
}

.submitPlace {
  background: #1a2633;
}

.no-results-container .no-results-header {
  background: #eeb941;
  color: #000;
  padding: 5px 10px;
  border-bottom: 1px solid #f4f4f4;
  font-size: 12px;
}
.no-results-container .no-results-body {
  background: #1a2633;
  color: #fff;
  padding: 14px 10px;
  font-size: 12px;
}

.h-88 {
  height: 88%;
}

.date-transaction {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  padding: 0 15px;
  align-items: center;
  height: 80px;
  color: #374562;
  font-weight: 600;
  // background-color: #3f5072;

  @apply bg-primary-btn-tert text-primary-default-main;
}

.date {
  display: flex;
  flex-direction: column;
  justify-content: unset;
  align-items: unset;
  height: 100%;
  width: 100%;
}

.types .ant-select-selection {
  // border: 1px solid #d9d9d9;
  border-top-width: 1.02px;
  border-radius: 0.5rem;
  @apply bg-primary-input;
}

.t-head {
  background-color: #303a4d;
  border-right: 1px solid #374562;
  color: #fff;
  padding: 0 8px;
  text-align: left;
  font-size: 13px;
  height: 30px;
}

.t-row {
  color: #374562;
  font-size: 13px;
  font-weight: 600;
  height: 38px;
  background: #eef2fa;
  border-right: 1px solid #bec7da;
  border-bottom: 1px solid #bec7da;
}

.t-row > td {
  border-right: 1pt solid #d5dbe5;
  border-bottom: 1pt solid #d5dbe5;
  color: #374562;
  padding: 6px 8px;
}

.t-row:nth-child(odd) {
  background: #eef2fa;
}

.browny {
  @apply border bg-primary-m-warning border-primary-m-warning  text-white;
}

.no-trans {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 70px;
  font-size: 15px;
}

.td-skele {
  background-color: #fff;
  border-right: 1pt solid #d5dbe5;
  border-bottom: 1pt solid #d5dbe5;
  color: #374562;
  font-weight: 500;
  padding: 6px 8px;
}

.tran-skele {
  display: flex;
  flex-direction: row;
  // justify-content: flex-start;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  min-height: 46px;
}

.skele-bar {
  width: 130px;
  background-color: #f2f2f2;
  height: 10px;
  border-radius: 2px;
  overflow: hidden;
}

.skele-bar::before {
  display: block;
  content: '';
  width: 130px;
  height: 10px;
  background: linear-gradient(90deg, #dedcdc, #b2b2b2, #dedcdc);
  transform: translateX(-100%);
  animation-name: heart;
  animation-delay: 0.25s;
  animation-duration: 1.3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
}

@keyframes heart {
  40%,
  to {
    transform: translateX(100%);
  }
}
</style>
