<!-- HTML -->
<template>
    <div class="merchants">
       <div class="merMsg">
           <div>
              <h5>{{name}}</h5>
              <p><Rate allow-half v-model="value6" />(661)月售{{sellCount}}单</p>
           </div>
           <span>
              <Icon type="ios-heart-outline" size="26"/>
              <p>收藏</p>
           </span>
       </div>
       <div class="myMsg">
          <p><span>起送价</span><span>{{minPrice}}元</span></p> 
          <p><span>商家配送</span><span>{{deliveryPrice}}元</span></p> 
           <p class="lastp"><span>平均配送时间</span><span>39分钟</span></p>
       </div>
       <!-- 空白 -->
       <div class="whitediv">
           IIIIIIIIIIIIIIIIIIIIIIIIIIII
       </div>
       <div class="huodong">
           <h4>公告与活动</h4>
           <p class="shuoming">
              {{bulletin}}
           </p>
           <p v-for="obj in supports" :key="obj.type">
               {{obj.description}}
           </p>
         
       </div>
        <div class="whitediv">
           IIIIIIIIIIIIIIIIIIIIIIIIIIII
       </div>
       <div class="shijing">
           <h3>商家实景</h3>
           <div>
                <span v-for="pic in pics" :key="pic"><img :src="pic" alt="图片加载失败"></span>
           </div>
       </div>
         <div class="whitediv">
           IIIIIIIIIIIIIIIIIIIIIIIIIIII
       </div>
        <div class="Sjmsg">
          <h4>商家信息</h4>
                 <p v-for="info in infos" :key="info">{{info}}</p>
          
       </div>
       <div>
           <br>
           <br>
           <br>
           <br>
           <br>
           <br>
       </div>
    </div>
</template>
<!--js-->
<script>
import {getSell} from '../api/api';
export default {
//数据绑定
    data(){
      return {
          value6:3,
          sellCount:'',//销售总数
          name:'',  //名字
          minPrice:'',//起送价
          deliveryPrice:'', //配送费
          bulletin:'', //公告
          supports:[], 
          pics:[],  //商家店面图片
          infos:[],
      }
},
created(){
    getSell()
    .then(result=>{
        let data= result.data.data;
       this.sellCount=data.sellCount;
       this.name=data.name;
       this.minPrice=data.minPrice;
       this.deliveryPrice=data.deliveryPrice;
       this.bulletin=data.bulletin;
       this.supports=data.supports;
       this.pics=data.pics;
       this.infos=data.infos;
    })
},
//函数
    methods: {},
// 计算属性
    computed: {},
//局部组件配置
    components: {}
}
</script>
<!--css-->
<style lang="less" scoped>
    .merchants{
        display: flex;
        flex-direction: column;
        width: 100%;
        -flex: 1;
        height: 100%;
        overflow:scroll;
        border-top: 2px solid #ccc;
        .merMsg{
            border-bottom: 1px solid #ccc;
            h5{
                color: black;
                font-size: 16px;
            }
             display: flex;
             justify-content: space-between;
             padding: 16px;
        }
        .myMsg{
            display: flex;
            justify-content: space-around;
            padding: 10px;
            border-bottom: 1px solid #ccc;
            p{
                border-right: 1px solid black;
                padding-right: 20px;
                font-size: 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .lastp{
                border-right: 0;
                padding-right: 0;
            }
            
        }
        .whitediv{
            width: 100%;
            background: pink;
            text-align: center;
            height: 30px !important;
        }
        .huodong{
            width: 100%;
            padding: 20px;
            h4{
                font-size: 18px;
                color: black;
            }
            p{
                font-size: 20px;
                border-bottom: 1px solid yellowgreen;
                padding: 10px;
            }
            .shuoming{
                color: red;
                font-size: 16px;
                line-height: 26px;
                border-bottom:0;
            }
        }
        .shijing{
            width: 100%;
            padding: 16px;
            h3{
                font-size: 20px;
                color: black;
            }
            div{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
              justify-content: space-around;
                img{
                    border-radius: 10px;
                }
            }
        }
        .Sjmsg{
            padding: 16px;
             h4{
                font-size: 20px;
                color: black;
            }
            p{
                font-size: 16px;
                padding: 8px;
            }
        }
    }
</style>