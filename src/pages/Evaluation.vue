<!-- HTML -->
<template>
    <div class="evaluation">
        <!-- 商家评分服务态度 -->
        <div class="evalCountMsg">
                <div class="evaluationLeft">
                    <h5>{{rankRate}}</h5>
                    <p>综合评分</p>
                    <span>高于周边商家32%</span>
                </div>
                <div class="evaluationRight">
                    <p><span>服务态度&emsp;</span> <Rate allow-half v-model="value" />{{serviceScore}}</p>
                     <p><span>口味评分&emsp;</span><Rate allow-half v-model="value2" />{{score}}</p>
                     <p><span>送达时间&emsp;</span>{{deliveryTime}}分钟</p>
                </div>
        </div>
        <!-- 中间空白 -->
        <div class="evwhite"></div>
        <!-- 评论区 -->
        <div class="personMsg">
            <div class="personBtn">
               <Button type="primary">全部{{evaluationList.length}}</Button>
              <Button type="info">满意14</Button>
                <Button>不满意10</Button>
            </div>
            <div class="contentMsg">
                <p>***只看有内容的评价</p>
            </div>
            <div class="allMsg" v-for="item in evaluationList">
                <img :src="item.avatar" alt="图片加载失败">
                <div class="msg">
                    <h5>{{item.username}}</h5>
                    <p class="imgstar"><span> <Rate allow-half v-model="item.score" /></span><span v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span></p>
                    <p class="pinglun">{{item.text}}</p>
                      <div>
                          {{item.rateTime}}
                     </div>
                    <p>👍👍👍</p>
                </div>
            </div>
        </div>
        <div style="height:54px">

        </div>
    </div>
</template>
<!--js-->
<script>
import {getRatings,getSell} from '../api/api';
export default {
//数据绑定
    data(){
      return {
          evaluationList:[],
          score:'',     //口味评分
          serviceScore:'',      //服务评分
          rankRate:'',      //等级评分
          deliveryTime:'',      //送达时间
          value:0,
          value2:0,

      }
},
    created(){
        //获取拿到评论数据
        getRatings()
        .then(result=>{
            let res=result.data.data;
            for(let obj  of res){
                let time=obj.rateTime;
                let onetime=new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/,'');
                obj.rateTime=onetime;

            }
             this.evaluationList=res;
             //console.log(this.evaluationList)
        }),
        getSell()
        .then(result=>{
           let data=result.data.data;
           this.score=data.score;
           this.serviceScore=data.serviceScore;
           this.rankRate=data.rankRate;
           this.deliveryTime=data.deliveryTime;
           this.value=data.serviceScore;
           this.value2=data.score;
        })
    },
//函数
    methods: {
    },
// 计算属性
    computed: {
    },
//局部组件配置
    components: {}
}
</script>
<!--css-->
<style lang="less" scoped>
.evaluation{
    width: 100%;
    flex: 1;
    border-top: 2px solid #ccc;
    display: flex;
    flex-direction: column;
    .evalCountMsg{
        display: flex;
        width: 100%;
        -margin: 10px 0;
         border-bottom: 2px solid #ccc;
        .evaluationLeft{
           
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border-right: 1px solid #ccc;
            h5{
                color: orangered;
                font-size: 18px;
            }
            p{
                color: black;
                font-size: 16px
            }

            
        }
        .evaluationRight{
            padding: 10px;
            flex: 2;
            p{
                span{
                    color: black;
                    font-size: 14px;
                }
            }
        }
    }
    .evwhite{
        width: 100%;
        height: 30px;
        background: #d9dde1;
        border-bottom: 2px solid #ccc;
    }
    .personMsg{
        width: 100%;
        flex: 1;
        overflow: scroll;
        .personBtn{
            padding: 10px;
            border-bottom: 1px solid #ccc;
            Button{
                margin-right: 10px;
            }
        }
        .contentMsg{
            padding: 10px;
            font-size: 16px;
            border-bottom: 1px solid salmon;
        }
    }
    .allMsg{
        display: flex;
        padding: 12px;
        img{
            width: 50px;
            height: 50px;
            border-radius: 8px;
        }
        .msg{
            padding-left: 10px;
            .pinglun{
                color: black;
                font-size: 14px;
            }
            .imgstar {
                img{
                    width: 16px;
                    height: 16px;
                }
            }
        }
    }
}
</style>