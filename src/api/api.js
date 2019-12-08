import axios from 'axios';

const IP='http://127.0.0.1:3000';

//获取商家信息接口
export let getSell=function(){
   return axios.get(IP+'/api/seller')
}
//商品列表接口信息
export function getGoods(){
    return axios.get(IP+'/api/goods')
}
//评论接口
export function getRatings(){
    return axios.get(IP+'/api/ratings')
}