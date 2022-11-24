import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

import store from '@/store'
Vue.config.productionTip = false

//注册全局组件TypeNav
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)

//引入mock
import '@/mock/mockServer.js'

//引入swiper css
import 'swiper/css/swiper.min.css'

//注册Carousel组件
import AppCarousel from '@/components/AppCarousel'
Vue.component(AppCarousel.name,AppCarousel)
//注册AppPagination组件
import AppPagination from '@/components/AppPagination'
Vue.component(AppPagination.name,AppPagination)

//部分引入element-ui
import { Button,MessageBox } from 'element-ui';
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库
  store,
  beforeCreate(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')
