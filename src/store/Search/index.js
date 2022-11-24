import {reqSearchList} from '@/api'
const actions={
    async reqSearchList({commit},params={}){
        let result = await reqSearchList(params)
        if(result.code==200){
            commit('REQSEARCHLIST',result.data)
        }
    }
};
const mutations={
    REQSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
};
const state={
    searchList:{}
};
const getters={
    attrsList(state){
        return state.searchList.attrsList||[]
    },
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
};
export default{
    actions,
    mutations,
    state,
    getters
}


