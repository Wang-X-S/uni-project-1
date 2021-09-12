
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
import store from 'store/store.js'
Vue.config.productionTip = false

uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
//请求拦截器
$http.beforeRequest = function(options){
  uni.showLoading({
    title:'数据加载中...'
  })
}
//请求错误弹窗

uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}
//响应拦截器
$http.afterRequest=function(){
  uni.hideLoading()
}

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif