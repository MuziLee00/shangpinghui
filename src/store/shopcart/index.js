import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api"
const state = {
    cartList: [],
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车数据
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        //判断返回的结果
        if (result.code == 200) {
            return '成功'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改商品订单选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked)
        if (result.code == 200) {
            return '成功'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除勾选的全部商品
    deleteAllCheckedCart({ dispatch, getters }) {
        //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        //获取购物车中全部的产品（是一个数组）
        let promiseAll=[]
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            //将每一次返回的Promise添加到数组当中
            promiseAll.push(promise)
           
        });
        //只要全部的p1|p2....都成功，返回结果即为成功
       //如果有一个失败，返回即为失败结果
       return Promise.all(promiseAll)



    },
    //修改全部选中的商品状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll=[];
        state.cartList[0].cartInfoList.forEach((item)=>{
            let promise=dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            //将每一次返回的Promise添加到数组当中
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters = {
    //获取cartList中商品部分信息
    cartList(state) {
        return state.cartList[0] || {}
    }
}
export default {
    state, mutations, actions, getters
}