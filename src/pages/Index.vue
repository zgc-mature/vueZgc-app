<!-- HTML -->
<template>
    <div class="Index">
        <!-- 上边的整个盒子 -->
        <div class="topBox">
            <!-- 左边 -->
            <div class="topLeft">
                <div class="prodimg">
                    <img :src="avatar" alt="图片加载失败">
                </div>
                <div class="prod">
                    <h4> <img src="../assets/images/brand@2x.png" alt="图片加载失败"> <span>&nbsp;{{name}}</span></h4>
                    <p>{{description}}/{{deliveryTime}}分钟送达</p>
                    <p>{{getSupports}}</p>
                </div>
            </div>
            <!-- 右边 -->
            <div class="topRight">
                <p class="prodnum">
                    50000个
                </p>
            </div>
        </div>
        <div class="prodmessage"><img src="../assets/images/bulletin@2x.png" alt="图片加载失败"><span>&nbsp;{{bulletin}}</span> </div>
        <div class="prodrouter">
            <div class="routerLinkBox">
                <!-- 路由线路 -->
                <router-link to="/">商品</router-link>
                <router-link to="/evaluation">评价</router-link>
                <router-link to="/merchants">商家</router-link>
            </div>
             <!-- 显示出口 -->
            <router-view></router-view>
        </div>
        <div class="footer" @click="clickbar">
               <div class="carleft">
                   <span class="money">&yen;{{carAllData}}</span>
                   <span class="othermoney">另需配送费&yen;4元</span>
                   <div class="carlogo"><img :src="shopcaricon" alt=""></div>
               </div>
               <div class="carright" v-show="carAllData<20">
                    &yen;20起送
               </div>
                <div class="carright" v-show="carAllData>=20" style="color:black;background:#ccc">
                    可以配送啦
               </div>
        </div>
         <transition name="slide-fade">
                   <div class="shopcar-board" v-show="showboard">
                        <is-shopCar/>
                    </div>
         </transition>
    </div>
</template>
<!--js-->
<script>
import {getSell} from '../api/api.js';
import shopCar from './ShopCar';
export default {
//数据绑定
    data(){
      return {
            avatar: '', //商家头像
            name:'',  //商家名称
            description: '', //配送方式
            deliveryTime: 0, //配送时间
            bulletin:'' ,//公告
            supports: [],  //活动数组
            showboard:false,//控制购物车显示
      }
},
created(){
    getSell()
    .then(result=>{
            //接收后，保存数据
        let data=result.data.data;
        this.avatar = data.avatar
        this.name = data.name
        this.description = data.description
        this.deliveryTime = data.deliveryTime
        this.supports = data.supports //这个是搞活动打折数据
        this.bulletin=data.bulletin
    })
},
//函数
    methods: {
        clickbar(){
            this.showboard=!this.showboard;
               // console.log(this.$store.getters.shopCarList.length)
        }
    },
// 计算属性
    computed: {
        getSupports(){
            let str='';
            for (const items of this.supports) {
                str+=items.description+',';
            }
          return str;
        },
        //图标购物车亮和暗
        shopcaricon(){
            if(this.$store.getters.shopCarList.length>0){
                   return require('../assets/images/icon_shopcar_light.png')
            }else{
                   return require('../assets/images/icon_shopcar.png')
            }
        },
        carAllData(){
            let data= this.$store.getters.shopCarList;
           // console.log(data)
            let sum=0;
            for (const obj of data) {
                    sum+=(obj.count*obj.price);
            }
            return sum
        }
    },
//局部组件配置
    components: {
        'is-shopCar':shopCar,
    }
}
</script>
<!--css-->
<style lang="less" scoped>
.Index{
    height: 100%;
    display: flex;
    flex-direction: column;
    .topBox{
        color: #fff;
        background: #3e362e;
        width: 100%;
        display: flex;
         justify-content: space-between;
        padding: 20px;
        .topLeft{
            display: flex;
            justify-content: space-between;
            .prodimg{
                img{
                    width: 80px;
                    padding-right: 10px;
                }
            }
            .prod{
                h4{
                    display: flex;
                    img{
                        height: 24px;
                    }
                    span{
                        font-size: 18px;
                    }
                }
            }
        }
        .topRight{
               display: flex;
               width: 10%;
               position: relative;
               .prodnum{
                   position: absolute;
                   bottom: -20px;
                   left: -20px;
                   width: 60px;
                   height: 40px;
                   border-radius: 20px;
                   text-align: center;
                   line-height: 40px;
                   background:rgba(0, 0, 0, 0.2);
                 
               }
        }
    }
    .prodmessage{
        color: #fff;
        display: flex;
        padding: 10px;
        background:rgba(7,17,27,0.8);
        font-size: 16px;
       
        span{
             text-overflow: ellipsis;
             white-space: nowrap;
             overflow: hidden;
             font-size: 14px;
        }
    }
    .prodrouter{
        display: flex;
        flex-direction: column;
        flex: 1;
            .routerLinkBox{
            width: 100%;
            display: flex;
            justify-content: space-around;
            height: 50px;
            background:honeydew;
            font-size: 20px;
            line-height: 50px;
    }
   
    }
    .footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 54px;
        line-height: 54px;
        background: darkgrey;
        display: flex;
           z-index: 999;
        .carleft{
            width: 70%;
            background: #131d27;
            padding-left: 80px;
            position: relative;
            line-height: 54px;
            .money{
                font-size: 20px;
                padding-right: 10px;
                font-weight: bolder;
                border-right: 1px solid black;
            }
            .othermoney{
                padding-left: 10px;
                font-size: 14px;
            }
            .carlogo{
                width: 50px;
                height: 50px;
                background: rgba(0, 0, 0, 0.4);
                border-radius: 100%;
                position: absolute;
                top: -10px;
                left: 20px;
                img{
                    width: 50px;
                    height: 50px;
                }
            }
        }
        .carright{
            width: 30%;
            font-size: 16px;
            text-align: center;
            line-height: 54px;
            font-weight: bolder;
            background: #2a353a;
        }
    }
    /* 可以设置不同的进入和离开动画 */
        /* 设置持续时间和动画函数 */
        //进入的CSS效果
        .slide-fade-enter-active {
        transition: all .8s ease;
        }
        //离开的CSS效果
        .slide-fade-leave-active {
        transition: all .8s ease;
        }
        .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateY(30px);
        opacity: 0;
        }
}
</style>