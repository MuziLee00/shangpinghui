//home模块的vuex仓库
import {reqCategoryList, reqFloorList, reqGetBannerList,} from '../../api/index'
const state={
    categoryList:[],
    bannerList:[],
    floorList:[],
   
};
const mutations={
    CATEGOYRLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
        
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
        
    }
};
const actions={
    //通过api里面的接口函数发送三级联动请求
   async categoryList({commit}){
         let result = await reqCategoryList();
        if(result.code==200){
            commit('CATEGOYRLIST',result.data)
        }
    },
    //获取banner数据
    async getBannerList({commit}){
        let result=await reqGetBannerList();
        if(result.code==200){
            commit('GETBANNERLIST',result.date)
        }
    },
    //获取floor数据
    async getFloorList({commit}){
        let result=await reqFloorList();
        if (result.code==200) {
            commit('GETFLOORLIST',result.data)  
        }
        
    }
};
const getters={};
export default{
    state,
    actions,
    mutations,
    getters
}