<template>
  <div>
      <TypeNav/> <!-- 全局组件，无需引用，直接使用 -->
      <ListContainer/>
      <Recommend/>
      <Rank/>
      <Like/>
      <Floor v-for="(floor,index) in floorList" :key="floor.id" :list='floor'/>
      <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from "./Floor"
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
  name:'Home',
  components:{ListContainer,Recommend, Rank,Like,Floor,Brand},
  mounted(){
    //派发dispacth请求，获取floor组件的数据
    this.$store.dispatch('getFloorList')
    //this.$store.dispatch('getUserInfo')
  },
  computed:{
    
    ...mapState({
      floorList:(state)=>{
        return state.home.floorList} 
    })
  }
}
</script>

<style>

</style>