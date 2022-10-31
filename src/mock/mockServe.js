//引入mock
import Mock from 'mockjs'
//引入所需资源 json文件
import banner from './banner.json'
import floor from './floor.json'
//mock数据：第一个参数：请求地址 第二个参数：请求的数据
Mock.mock('/mock/banner',{code:200,date:banner})
Mock.mock('/mock/floor',{code:200,data:floor})