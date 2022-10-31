<template>
  <div>
    <!-- 三级列表组件 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 --> 
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
             <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTradmark">×</i></li>
            <!-- 品牌属性的面包屑 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeAttr(index)">×</i></li>

          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trandmarkInfo="trandmarkInfo" @attrInfo="attrInfo" />

        <!--details 产品列表-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a  href="#">综合<span v-show="isOne" class="iconfont" :class="{'icon-UP':isAsc,'icon-DOWN': isDesc }"></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a  href="#">价格 <span v-show="isTwo" class="iconfont":class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"> </span> </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                   <router-link :to="`/detail/${good.id}`"><img v-lazy="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>     
            <!-- 分页器 -->
           <Pagination   :pageNo="searchParams.pageNo"  :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters ,mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        //三级分类列表的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //分类名
        categoryName: "",
        //输入的关键字
        keyword: "",
        //排序方式，默认为综合且 降序
        order: "1:desc",
        //分页器首页
        pageNo: 1,
        //商品展示数量
        pageSize: 10,
        //商品属性所带参数
        props: [],
        //品牌参数
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount(){
   //获取所点击物品的参数
   //复杂写法
  // this.searchParams.category1Id=this.$route.query.category1Id
  // this.searchParams.category2Id=this.$route.query.category2Id
  // 利用Object.assign方法，实现参数合并
  Object.assign(this.searchParams,this.$route.query,this.$route.params)
  },
  mounted() {
    //派发dispacth，获取serch数据
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getSerchList", this.searchParams);
    },
    removeCategoryName(){
      //删除面包屑的参数
      //点X将参数清楚，重新发起请求，拿到默认数据
      //将参数值设置为undefind，不会传递参数，减少网络占用
      this.searchParams.categoryName=undefined;
      this.searchParams.category1Id=undefined;
      this.searchParams.category2Id=undefined;
      this.searchParams.category3Id=undefined;
      this.getData();
      //将地址栏的参数去掉
      //当有params参数时，点x将query参数删掉，保留params参数
      if(this.$route.params){
            this.$router.push({name:'serch',params:this.$route.params})
      }
      
    },
    removeKeyword(){
      //删除面包屑输入的关键字
      this.searchParams.keyword=undefined;
      this.getData();
      //通知兄弟组件Header，修改keyword
      this.$bus.$emit('clear');
      //清除地址栏的keyword关键字
      //当有query参数时，点击，清除params参数，保留query参数
      if (this.$route.query) {
        this.$router.push({name:'serch',query:this.$route.query})
      }
    },
    removeTradmark(){
      //删除品牌面包屑
      this.searchParams.trademark=undefined;
      //再次发送请求
      this.getData();
    },
    removeAttr(index){
      //删除商品属性面包屑
      console.log(index);
      //splice删除数组元素
      this.searchParams.props.splice(index,1)
      this.getData()
    },
    trandmarkInfo(trademark){
      // //自定义事件，在子组件中注册事件，父组件执行事件回调，接受数据
        //整理trademark的数据，发送请求时需要“ID；品牌名称”
      this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`//模板字符串拼接
      this.getData()
    },
    //自定义事件回调，获取子组件的商品属性信息
    attrInfo(attr,attrValue){
      //console.log(attr,attrValue);
      //["属性ID:属性值:属性名"]
      let props=`${attr.attrId}:${attrValue}:${attr.attrName}`
      //利用indexof数组去重
      if (this.searchParams.props.indexOf(props)==-1) {
        this.searchParams.props.push(props);
      }
      this.getData()

    },
    //排序操作
    changeOrder(flag){
      //flag:用户每一次点击li标签的时候，用于区分是综合（1）还是价格（2）
      //现获取order初始状态【咱们需要通过初始状态去判断接下来做什么】
      let orginOrder=this.searchParams.order;
      let orginFlag=orginOrder.split(':')[0]//获取是哪个标签用于区分是综合（1）还是价格（2）
      let orginSort=orginOrder.split(':')[1]//获取是升序还是降序
     //新的排序方式，新参数
     let newOrder='';
     //判断是不是多次点击同一个按扭
     if (flag==orginFlag) {
      newOrder=`${orginFlag}:${orginSort=='desc'?'asc':'desc'}`
     }else{
      //点击的是不同按钮
      newOrder=`${flag}:${'desc'}`//与上次点击不同，默认为desc
     }
     //将新的newOrder赋值给order
     this.searchParams.order=newOrder;
     //发送请求
     this.getData();
      
    },
    //获取当前点击的是那一页（分页器）
    getPageNo(pageNo){
      //整理参数发请求，拿数据
        this.searchParams.pageNo=pageNo;
        this.getData();
    }
    
  },
  computed: {
    //数组写法，可以直接拿到仓库中的getters，没有划分模块
    ...mapGetters(["trademarkList", "goodsList", "attrsList"]),
    ...mapState({
      total:(state)=>{
        return state.serch.serchList.total
      },

      
    }),
    //判断是否为为所选
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  watch:{
    //监听属性：监听组件实例对象身上的属性的属性值发生变化

    $route(oldValue,nweValue){
      
        //当$route中的参数发生变化，重新发起请求
        
        //将上次请求的category1、2、3Id清空,使他接受新的id
        this.searchParams.category1Id="";
        this.searchParams.category2Id="";
        this.searchParams.category3Id="";
        //将新的参数合并
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        //发送请求
        this.getData()
        
        
        
      
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>