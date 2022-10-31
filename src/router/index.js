import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//获取store仓库的数据token
import store from "@/store";
//import  Home from '../pages/Home'
//import Serch from '../pages/Serch'
import Login from '../pages/Login'
import  Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
import MyOrder from '../pages/Center/myOrder'
import GroupOrder from '../pages/Center/groupOrder'
/* 重写push和replace方法，解决连续执行路由跳转引发的错误 
重写函数的参数：
第一个：原来的push方法，指明跳转路径
第二个参数：成功回调（promise对象）
第三个参数：失败的回调
//通过apply方法和call方法改变this的指向
*/
/* 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。 */
let originPush=VueRouter.prototype.push;//获取原push方法
let originReplace=VueRouter.prototype.replace;
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
};
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
let router= new VueRouter({
    routes:[
        {
            name:'center',
            component:Center,
            path:'/center',
            meta:{show:true},
            children:[
                {
                    path:'myorder',
                    component:MyOrder
                },
                {
                    path:'grouporder',
                    component:GroupOrder
                },
                {
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]
        },
        {
            name:'paysuccess',
            component:PaySuccess,
            path:'/paysuccess',
            meta:{show:true},
            
        },
        {
            name:'pay',
            component:Pay,
            path:'/pay',
            meta:{show:true},
            beforeEnter: (to, from, next) => {
                //只能从交易页面进
                if(from.path=='/trade'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            name:'trade',
            component:Trade,
            path:'/trade',
            meta:{show:true},
            //路由独享守卫
            beforeEnter: (to, from, next) => {
                //只能从购物车界面, 才能跳转到交易界面
                if (from.path=='/shopcart') {
                    next()
                }else{
                    next(false)//回到原路由
                }
            }
        },
        {
            name:'shopcart' ,
            path:'/shopcart',
            component:ShopCart,
            meta:{show:true}
         },
        {
           name:'addCartSuccess' ,
           path:'/addCartSuccess',
           component:AddCartSuccess,
           meta:{show:true}
        },
        {   
            name:'detail',
            path:"/detail/:skuId",
            component:Detail,
             meta:{show:true}
        },
        {   
            name:'home',
            path:"/home",
            component:()=>import('../pages/Home'),//路由懒加载用法
             meta:{show:true}
        },
        {
            name:'serch',
            path:"/serch/:keyword?",//parsms参数需要占位
            component:()=>import('../pages/Serch'),
            meta:{show:true},
            
        },
        {
            path:"/login",
            component:Login,
            meta:{show:false}
        },
        {
            path:"/register",
            component:Register,
            meta:{show:false}
        },
        {
            path:'*',
            redirect:'home'
        }
    ],
    //默认滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },    
})
router.beforeEach(async (to,from,next)=>{
    //to:获取到要跳转到的路由信息
   //from：获取到从哪个路由跳转过来来的信息
   //next: next() 放行  next(path) 放行  
   //方便测试 统一放行
  // next();
  //获取仓库中的token-----可以确定用户是登录了
    let token=store.state.user.token
    let name = store.state.user.userInfo.name;
    // console.log(token);
    //  console.log(store.state.user.userInfo.name);
    //  console.log(store);
    //用户登录了
    if (token) {
        //已经登录而且还想去登录------不行
        if (to.path=='/login'||to.path=='register') {
            next('/home') 
             
        }else{
        //已经登陆了,访问的是非登录与注册
       //登录了且拥有用户信息放行
       if (name) {
        next()
        
       }else{
         //登陆了且没有用户信息
         //在路由跳转之前获取用户信息且放行
       try {
        await store.dispatch('getUserInfo');
        next()
        
       } catch (error) {
        //token失效，获取失败
        await store.dispatch('userLogout')
        next('/login')
       }
       }
        }
    }else{
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面这些路由-----登录
        let toPath=to.path
       
        if (toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1) {
            next('/login?redirect='+toPath)
        }else{
            //不是上面这些路由
            next()
        }
        
        
    }
})
export default router