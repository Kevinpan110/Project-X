import { reqUserAddress ,reqUserOrder,reqSubmitOrder} from "@/api";
const actions = {
  async userAddress({ commit }) {
    let result = await reqUserAddress();
    if(result.code==200){
        commit('USERADDRESS',result.data)
        return 'ok'
    }else{
        return Promise.reject(new Error('获取用户地址失败'))
    }
  },
  async userOrder({commit}){
    let result = await reqUserOrder();
    if(result.code==200){
        commit('USERORDER',result.data)
        return 'ok'
    }else{
        return Promise.reject(new Error('获取用户订单失败'))
    }
  },
  async submitOrder({commit},{tradeNo,data}){
    let result = await reqSubmitOrder(tradeNo,data);
    if(result.code==200){
      console.log('submitOrdersuccess',result);
      commit('SUBMITORDER',result.data)
      return 'ok'
    }else{
      console.log('submitOrderfail',result);
      return Promise.reject(new Error('提交订单失败'))
    }
  },

};
const mutations = {
    USERADDRESS(state,result){
        state.address=result
    },
    USERORDER(state,result){
        state.order=result
    },
    SUBMITORDER(state,result){
      state.orderId=result
    }
};
const state = {
    address:[],
    order:{},
    orderId:''
};
const getters = {
  
};
export default {
  actions,
  mutations,
  state,
  getters,
};
