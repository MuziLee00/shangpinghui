import { reqGoodsInfo ,reqAddOrUpdateShopCart } from "../../api/index"
import {getUUID} from '../../utils/uuid_token'
const state={
    goodInfo:{},
    uuid_token:getUUID()
}

const actions={
   async getGoodInfo({commit},skuId){
        let result=await reqGoodsInfo(skuId)
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    },
    async AddOrUpdateShopCart({commit},{skuId,skuNum}){
    //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
    //不需要在三连环（仓库存储数据了）
    //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
        let result=await reqAddOrUpdateShopCart(skuId,skuNum)
        if (result.code==200) {
           //返回成功的promise结果
            return '成功'
        }else{
            //返回失败的promise结果
            return Promise.reject(new Error('faile'))
            
        }
    }
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    }
}
const getters={
    //比如:state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
    //当前计算出的 categoryView属性值至少是一个空对象，假的报错不会有了。
    categoryView(state){
        //商品导航信息数据整理
        return state.goodInfo.categoryView||{};
    },
    skuInfo(state){
        //商品详细信息数据整理（轮播图）
        return state.goodInfo.skuInfo||{};
    },
    //商品售卖属性信息数据展示
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }

}
export default{
   state,
   actions,
   mutations,
   getters 
}