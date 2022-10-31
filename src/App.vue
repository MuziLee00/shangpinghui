<template>
 <div>
   <Header></Header>
   <!-- 路由组件的出口 -->
   <router-view></router-view>
   <Footer v-show="$route.meta.show"></Footer>
 </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
     Header, Footer
  },
  mounted(){
    //发送请求,将三级联动的数据存放在vuex中
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>

</style>
