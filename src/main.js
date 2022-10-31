import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
import store from './store'
//按需引入element ui
import { Button,MessageBox } from 'element-ui';
Vue.component(Button.name,Button);
//引入全局组件，导航部分的三级联动
//两个参数：第一个：组件的名字（name）第二个参数：哪个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//引入mock
import './mock/mockServe'
//引入swiper的css文件
import 'swiper/css/swiper.css'
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from '@/api';
//引入懒加载图片
import ye from '@/assets/1.gif'
//引入vue-lazyload插件
import VueLazyload from 'vue-lazyload'
//使用插件
Vue.use(VueLazyload,{
  loading:ye
})
//引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this  //安装全局事件总线，$bus就是当前应用的Vm
    Vue.prototype.$API=API  //将API放入原型
  },
  //注册路由信息
  router,
  //注册store
  store
}).$mount('#app')
