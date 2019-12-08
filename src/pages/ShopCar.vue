<!-- HTML -->
<template>
    <div class="shopcar">
            <p class="myCar"><strong>购物车</strong><span @click="allDel">清空</span></p>
            <div v-show="shopCarList.length<1" style="font-size:18px;color:yellow;padding:20px">
                购物车空空如也，请添加商品-->
            </div>
            <div class="carList" v-for="obj in shopCarList" :key="obj.name">
                <span>{{obj.name}}</span>
                <p>
                    <strong>&yen;{{obj.price*obj.count}}&emsp;</strong>
                        <button type="button" @click="changeFoodDec(obj.name)"><Icon type="md-remove" color="blue" size="24"/></button>
                        <label>{{obj.count}}</label> 
                        <button type="button" @click="changeFoodAdd(obj.name)"><Icon type="md-add-circle" color="blue" size="24"/></button>
                </p>
       </div>
        <!-- <div class="carList">
           <span>莲子核桃黑米粥</span>
           <p>
               <strong>&yen;10&emsp;</strong>
                 <button type="button" @click="changeFoodDec(food.name)"><Icon type="md-remove" color="blue" size="24"/></button>
                 <label>0</label> 
                 <button type="button" @click="changeFoodAdd(food.name)"><Icon type="md-add-circle" color="blue" size="24"/></button>
           </p>
       </div> -->
    </div>
</template>
<!--js-->
<script>
export default {
//数据绑定
    data(){
      return {
            carshow:true,
      }
},
//函数
    methods: {
        changeFoodDec(name){
            this.$store.commit('changeFoodnum',{name,num:-1});
        },
        changeFoodAdd(name){

             this.$store.commit('changeFoodnum',{name,num:1});
        },
        //清空购物车
        allDel(){
            let listArr=this.$store.state.list;
            for (const obj of listArr) {
                for(const food of obj.foods){
                    food.count=0;
                }
            }
        }
    },
// 计算属性
    computed: {
        shopCarList(){
           return this.$store.getters.shopCarList;
        }
    },
//局部组件配置
    components: {}
}

</script>
<!--css-->
<style lang="less" scoped>
.shopcar{
    width: 100%;
    position: fixed;
    bottom: 54px;
    -height: 200px;
    background:#fff;
    .myCar{
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        padding: 10px;
        color: black;
        background: #ccc;
        border-bottom: 2px solid silver;
        span{
            color: blue;
        }
    }
    .carList{
          display: flex;
          padding: 10px;
          justify-content: space-between;
         font-size: 14px;
        p{
            strong{
                font-size: 14px;
                color: red;
            }
            button{
                background: #fff;
                border: 0;
            }
        }
    }
}
</style>