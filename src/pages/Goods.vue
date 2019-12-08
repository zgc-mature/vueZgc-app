<!-- HTML -->
<template>
    <div class="product">
        <!-- 左边 -->
        <div id="imenu" class="menu">
            <ul class="content">
              
                    <p v-for="items in list" :key="items.name" @click="btnleftScroll(items.name)" 
                    :class="{selected:curSelectLab==items.name}">
                    {{items.name}}
                    </p>
              
                <div style="height:54px"></div>
            </ul>
        </div>
        <!-- 右边产品 -->
        <div id="menulist" class="productlist">
            <ul class="content"> 
                <div :id="item.name" class="onelist" v-for="item in list" :key="item.name">
                   <h5>{{item.name}}</h5>
                   <div class="footsMessage" v-for="food in item.foods" :key="food.name">
                    <img :src="food.icon" alt="图片加载失败">
                    <div class="footmsg"> 
                        <p class="blackname">
                            {{food.name}}
                        </p>
                        <p>{{food.description}}</p>
                        <p>月售{{food.sellCount}}份&emsp;好评度{{food.rating}}%</p>
                        <span>&yen;{{food.price}}&emsp;</span> <del v-show="food.oldPrice">&yen;{{food.oldPrice}}</del>&emsp; 
                        <button type="button" @click="changeFoodDec(food.name)" v-show="food.count>0"><Icon type="md-remove" color="blue" size="24"/></button>
                        <label>{{food.count}}</label> 
                        <button type="button" @click="changeFoodAdd(food.name)"><Icon type="md-add-circle" color="blue" size="24"/></button>
                    </div>
                  
                </div>
            </div>
            </ul>
              <div style="height:54px"></div>
        </div>
    </div>
</template>
<!--js-->
<script>
import {getGoods} from '../api/api.js';
//引入滚动插件
import BScroll from 'better-scroll';
export default {
//数据绑定
    data(){
      return {
          curSelectLab:'热销榜'
      }
    },
    created(){
        getGoods()
        .then(result=>{
          let data=result.data.data;
          //前端不给我拿加减数量count，我自己定义,循环每一个都加一个count=0
          for (const oneObj of data) {
                for(const food of oneObj.foods){
                    food.count=0;
                } 
          }
         this.$store.commit('changeList',data);
         //console.log(this.$store.state.list)
        })
    },
    mounted(){
          //获取真实DOM元素
        //   左边容器的滚动
          let menuScroll=new BScroll('#imenu',{
              click:true,//派发事件
          });
          // 左边容器的滚动
          this.menulistScroll=new BScroll('#menulist',{
              probeType:3,   ////实时派发scroll事件  如果不设置则不会派发滚动事件
              click:true,
          });
          this.menulistScroll.on('scroll',obj=>{
              //只获取上下滚动y的值，并都取为正数
             let _y=Math.abs(obj.y);
                
             //判断循环
            for(let obj of this.heightArr){
                if(_y>=obj.min&&_y<obj.max){
                    this.curSelectLab=obj.selectLab;
                    //循环找到后直接终止 优化性能
                    break;
                }
            }
              //在mounted中不能获取异步节点， 因为还没有收到响应， 异步节点还未创建
          })
    },
    updated(){
         //数组属性不存在，则初始化数组(这段代码只运行一次)优化性能
     if(!this.heightArr){
        //只初始化一次
        this.heightArr=[];
        let totalHeight = 0 ;  //之前累加的高度
       
            for(let objj of this.list){
                //当前元素的高度
                //min： 在当前DIV之前的所有DIV累加的高度
                //max： 当前元素+之前所有DIV累计的高度
                  let height=document.getElementById(objj.name).offsetHeight;
                this.heightArr.push({min:totalHeight,max:totalHeight+height,selectLab:objj.name});
                //每循环一次，总高度加一次
                totalHeight += height
            }
        }
    },
//函数
    methods: {
        btnleftScroll(name){
            //因为better-scroll默认阻止了事件开启
           // console.log(name);
           //当name的值等于
                this.curSelectLab=name;
               //滚动面板到指定DIV上
               this.menulistScroll.scrollToElement("#"+name,500)
        },

        changeFoodDec(name){
            this.$store.commit('changeFoodnum',{name,num:-1});
        },
        changeFoodAdd(name){

             this.$store.commit('changeFoodnum',{name,num:1});
        }
    },
// 计算属性
    computed: {
        //优化性能，把从vuex里的数据放在这里，要用的地方只加载一次
        list(){
            return this.$store.state.list;
        }
    },
//局部组件配置
    components: {}
}
</script>
<!--css-->
<style lang="less" scoped>
.selected{
    background: rgba(166, 173, 179, 0.61);
}
.product{
    width: 100%;
    border-top: 2px solid #d9dde1;
    display: flex;
    -height: 408px;
    flex: 1;
    .menu{
        width: 100px;
        height: 100%;
        background:#f3f6f6;
        overflow: scroll;
            p{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 80px;
                text-align: center;
                font-size: 16px;
                border-bottom: 1px solid #d9dde1;
            }
        
    }
    .productlist{
        height: 100%;
        flex:1;
         overflow: scroll;
        .onelist{
            h5{
                font-size: 14px;
                background: #f3f6f6;
                padding: 8px 0 8px 20px;
                border-left: 2px solid #d9dde1;
                
            }
            .footsMessage{
                padding: 10px;
                display: flex;
                img{
                    width: 80px;
                    height: 80px;
                    border-radius: 5px;
                }
                .footmsg{
                     padding-left: 12px;
                     .blackname{
                         color: black;
                         font-size: 14px;
                     }
                    p{
                        color: #8f9699;
                        font-size: 12px;
                    }
                    span{
                        color: red;
                        font-size: 14px;
                    }
                    button{
                        background: #fff;
                        width: 30px;
                        height: 30px;
                        border: 0;
                    }
               }
            }
        }
    }
}
</style>