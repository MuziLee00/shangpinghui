import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)//使用vuex插件
import home from "./home";
import serch from "./serch";
import detail from "./detail";
import shopcart from "./shopcart";
import user from './user'
import trade from "./trade";
export default new Vuex.Store({
        modules:{
                home,
                serch,
                detail,
                shopcart,
                user,
                trade
        }
})