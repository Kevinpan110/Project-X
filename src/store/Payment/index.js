import { reqPayment,reqPayStatus } from "@/api";
const actions = {
  async payment({ commit }, orderId) {
    let result = await reqPayment(orderId);
    if (result.code == 200) {
      commit("PAYMENT", result.data);
    }
  },
  async payStatus({ commit }, orderId) {
    let result = await reqPayStatus(orderId);
    if(result.code==200){
        commit('PAYSTATUS',result.code)
        return 'ok'
    }else{
        return Promise.reject(new Error('未支付成功'))
    }
  },
};
const mutations = {
  PAYMENT(state, result) {
    state.paymentInfo = result;
  },
  PAYSTATUS(state,result){
    state.code=result
  }
};
const state = {
  paymentInfo: {},
  code:undefined
};
const getters = {};
export default {
  actions,
  mutations,
  state,
  getters,
};
