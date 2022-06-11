import Vue from 'vue';
import Antd from 'ant-design-vue/lib';

Vue.prototype.$message = Antd.message;
Vue.prototype.$notification = Antd.notification;
Vue.use(Antd);
