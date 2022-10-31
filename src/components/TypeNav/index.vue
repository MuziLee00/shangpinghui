<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <!-- 利用事件委派的方式，实现鼠标移出是颜色的改变 -->
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画效果 -->
       <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSerch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <!-- 动态类名 -->
              <h3 @mouseenter="changeIndex(index)">
                <a :data-categoryName=c1.categoryName :data-category1Id=c1.categoryId >{{ c1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName=c2.categoryName :data-category2Id=c2.categoryId>{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a :data-categoryName=c3.categoryName :data-category3Id=c3.categoryId>{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
       </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入节流函数，提升性能
import throttle from 'lodash/throttle'
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show:true //临时变量，存储鼠标移入的一级标题的索引index，起始为未移入状态
    };
  },
  methods: {
    //通过事件回调改变索引值,加入节流
    changeIndex:throttle(function(index){
        this.currentIndex = index;
        //console.log(index);
    },50),
    enterShow(){
      this.show=true
    },
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path!='/home') {
        this.show=false
      }
      
      
    },
    goSerch(event){
      let element= event.target
      //console.log(element.dataset);
      let {categoryname,category1id,category2id,category3id} = element.dataset
      //console.log(categoryname,category1id,category2id,category3id);
      //通过if语句判断点击的是哪一个元素，当只有是带有categoryname属性的标签是才进行跳转，通过categoryid判断是第几级导航
      if(categoryname){
        let location={name:'serch'}
        let query={categoryName:categoryname}
        if (category1id) {
          query.category1Id=category1id
        }else if (category2id) {
          query.category2Id=category2id
        }else{
          query.category3Id=category3id
        }
       if(this.$route.params){
        //将params参数与query参数合并，一同发送给serch路由
          location.params=this.$route.params
          location.query=query
          this.$router.push(location)
       }
      }
      }
  },
  mounted() {
    //根据路径判断当前页面是哪个组件
    if(this.$route.path!='/home'){
      this.show=false
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //动画效果的css样式
    .sort-enter{
      height: 0px;  
    }
    .sort-enter-to{
      height: 461px;
    }
    .sort-enter-active{
      transition: all 0.5s linear;
    }
  }
}
</style>



