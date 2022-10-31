//统一接口管理
import requests from "./request";
import mockRequest from './mockRequest'
//三级联动请求  /api/product/getBaseCategoryList  get  无参数
export const reqCategoryList=()=>{
    //发送axios请求 返回值为pormise对象
    return requests({url:'/product/getBaseCategoryList',method:"get"});
}
//通过mock获取banner数据
export const reqGetBannerList=()=>{
    return mockRequest.get('/banner')
}
//通过mock获得floor数据
export const reqFloorList=()=>{
    return mockRequest.get('/floor')
}
//发送serch模块数据请求
export const reqGetSerchInfo=(params)=>{
    return requests({url:'/list',method:'post',data:params})
}
//发送商品详情数据请求
export const reqGoodsInfo=(skuId)=>{
    return requests({url:`/item/${skuId}`,method:'get'})
}
//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>{
    return requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
}
//获取购物车的数据
export const reqCartList=()=>{
    return requests({url:'/cart/cartList',method:'get'})
}
//删除购物车数据
export const reqDeleteCartById=(skuId)=>{
    return requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}
//修改商品的选中状态
export const reqUpdateCheckedByid=(skuId,isChecked)=>{
    return requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}
//获取验证码
export const reqGetCode=(phone)=>{
    return requests({url:`/user/passport/sendCode/${phone}`,method:"get"})
}
//注册接口
export const reqUserRegister=(data)=>{
    return requests({url:'/user/passport/register',data,method:'post'})
}
//登录接口
export const reqUserLogin=(data)=>{
    return requests({url:'/user/passport/login',data,method:'post'})
}
//获取用户信息
export const reqUserInfo=()=>{
    return requests({url:'/user/passport/auth/getUserInfo',method:'get'})
}
//退出登录
export const reqLogout=()=>{
    return requests({url:'/user/passport/logout',method:'get'})
}
//获取用户地址信息
export const reqAddressInfo=()=>{
    return requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
}
//获取商品订单信息
export const reqOrderInfo=()=>{
    return requests({url:'/order/auth/trade',method:'get'})
}
//提交订单
export const reqSubmitOrder=(tradeNo,data)=>{
    return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
}
//获取支付信息
export const reqPayInfo=(orderId)=>{
    return requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}
//获取支付订单状态
export const reqPayStatus=(orderId)=>{
    return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}
//获取个人中心数据
export const reqMyOrderList=(page,limit)=>{
    return requests({url:`/order/auth/${page}/${limit}`,method:'get'})
}