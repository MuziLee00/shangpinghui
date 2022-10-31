import { reqGetSerchInfo } from "@/api";

//serch模块的vuex仓库
const state={
    serchList:{} 
};
const mutations={
    GETSERCHLIST(state,serchList){
        state.serchList=serchList
    }
};
const actions={
  async  getSerchList({commit},params={}){
    let result= await reqGetSerchInfo(params)
    if (result.code==200) {
        commit('GETSERCHLIST',result.data)
    }
    }
};
//通过getters简化处理state中的数据
const getters={
    //此处的参数state为当前仓库的state，即serch模块的仓库
    goodsList(state){
        //不能确定state的状态，存在问题
        return state.serchList.goodsList
    },
    attrsList(state){
        return state.serchList.attrsList
    },
    trademarkList(state){
        return state.serchList.trademarkList
    }
};
export default{
    state,
    actions,
    mutations,
    getters
}