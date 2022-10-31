import axios from "axios";
//axios的二次封装
//引入nprogress请求进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'
//引入store 获取uuid-token
import  store  from "../store";
//start:进度条开始，done：进度条结束
const requests =axios.create({
    baseURL:"/api",//配置基础路径
    timeout:5000  //请求超时的时间为5000ms
});
//配置请求拦截器
requests.interceptors.request.use((config)=>{
    //config中有一个重要的属性 ：header请求头
    //请求头添加一个字段(userTempId):和后台老师商量好了
    if (store.state.detail.uuid_token) {
        config.headers.userTempId=store.state.detail.uuid_token
    }
    //token 请求头
    if (store.state.user.token) {
        config.headers.token=store.state.user.token
    }
    nprogress.start();
    return config;
});
//配置响应拦截器
requests.interceptors.response.use((res)=>{
   //成功的回调函数
   nprogress.done()
    return res.data
},(error)=>{
    //失败的回调函数
    return Promise.reject(new Error('faile'))
});
export default requests;