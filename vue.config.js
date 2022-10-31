
module.exports = {
  productionSourceMap:false,//打包时去除map文件
  lintOnSave:false,//关闭语法检查
  //解决跨域，配置代理服务器
  devServer:{
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
       // pathRewrite: {"^/api" : ""},
      },
    },
  },
};
