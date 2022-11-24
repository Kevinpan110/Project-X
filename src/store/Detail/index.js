import {reqGoodDetail,reqAddToCart} from '@/api'
import getnanoid from '@/utils/nanoid_token'
const actions={
    async goodDetail({commit},skuId=0){
    let result = await reqGoodDetail(skuId)
        if(result.code==200){
            commit('GOODDETAIL',result.data)
        }
    },
    
    async addToCart({commit},{skuId,skuNum}){
        let result = await reqAddToCart(skuId,skuNum)
        if (result.code==200){
            return 'ok'
        }else{
            return  Promise.reject(new Error('加入购物车失败'))
        }
    }
};
const mutations={
    GOODDETAIL(state,data){
        state.good=data
    },
    
};
const state={
    good : {},
    nanoid : getnanoid()
};
const getters={
    categoryView(state){
        return state.good.categoryView||{}
    },
    skuInfo(state){
        return state.good.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.good.spuSaleAttrList||[]
    }
};
export default{
    actions,
    mutations,
    state,
    getters
}


