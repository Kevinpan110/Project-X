import {reqMyOrder} from '@/api'
const actions={
    async myOrder({commit},{page,limit}){
        let result = await reqMyOrder(page,limit)
        if(result.code==200){
            commit('MYORDER',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('获取个人订单失败'))
        }
    }
};
const mutations={
    MYORDER(state,result){
        state.myOrder=result
    }
};
const state={
    myOrder:{}
};
const getters={

};
export default{
    actions,
    mutations,
    state,
    getters
}


