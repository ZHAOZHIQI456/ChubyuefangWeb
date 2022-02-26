import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import axios from 'axios'
import router from'./router'
import qs from 'qs'
import Utils from '../src/utils/utils'
Vue.prototype.$IUtils = Utils

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
//Vue全局对象可用
Vue.prototype.$qs = qs
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.config.productionTip = false
//配置基础地址
axios.defaults.baseURL="http:121.40.255.222//:8001"


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
