import Vue from 'vue';
import Vuex from 'vuex';

//全局注册
Vue.use(Vuex);

export default new Vuex.Store({
    //定义状态数据
    state:{
        list:[],
    },
    //只有mutation才能修改state里面的数据
    mutations:{
        changeList(state,listArr){
            state.list=listArr;
        },
        //更改list中的数量
        changeFoodnum(state,dataArr){ 
             //先循环state里的list
            for(let obj of state.list){
                //再循环里面的foods
                for(let food of obj.foods){
                    //找到和他名字相匹配的，然后数量加减
                    if(food.name==dataArr.name){
                        food.count+=dataArr.num;
                        //找到后用return,如果用break，但是外层循环还是要继续
                        return;
                    }
                }
            }
        }
    },
    //getters是vuex中的计算属性，只能vuex用
    getters:{
        shopCarList(state){
            //等会接过炉的
            let arr=[];
            for (const onefood of state.list) {
                for(const food of onefood.foods){
                    if(food.count>0){
                        arr.push(food);
                    }
                }
            }
            return arr

        }
    }
})

// //建一个仓库,统一管理交互数据
// const store=new Vuex.Store({
//     //状态定义在state中
//     state:{
//         name:'李思思',
//         age:18
//     },
//     //修改通知，只有mutations才可以修改state
//     //要改值必须要触发一个store.commit()方法
//     mutations:{
//         //每个mutations函数都会接受一个形参,第一个是只能修改state里的数据，是固定的，第二个是传来要改变的值
//         changeName(state,val){
//             state.name=val;
//         }
//     }
   
// })
// //触发一个mutation,使用方法commit()
// //参数1是要触发的mutations内的一个名字
// //参数二是要传给它的参数
// store.commit('changeName','李白');
// // console.log(store)
// export default store;