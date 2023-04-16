import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

import { isAuth } from '@/utils'
import PubSub from 'pubsub-js'
import httpRequest from '@/utils/httpRequest'

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
import API from '@/api'

Vue.prototype.$API = API
Vue.prototype.isAuth = isAuth // 权限方法
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.PubSub = PubSub   //组件发布订阅消息

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
