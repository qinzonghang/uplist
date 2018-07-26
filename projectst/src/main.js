// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import App from './components/Index.vue'
import router from './router/index.js'
//import './css/reset.css'
//import '../src/css/loading.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
//import VueLazyLoad from 'vue-lazyload'

new Vue({
  el: '#app',
  router
  // components: { App },
  // template: '<App/>'
})
//图片懒加载
// Vue.use(VueLazyLoad, {
//   error:'../src/assets/image/loading-3.gif',
//   loading:'../src/assets/image/loading-3.gif'
// })
