import { reqCategoryList,reqBannerImage ,reqFloor,} from "@/api";

const actions={
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code==200){
            commit('CATEGORYLIST',result.data)
        }
    },
    async reqGetBanner({commit}){
        let result = await reqBannerImage();
        if(result.code == 200){
            commit('REQGETBANNER',result.data)
        }
    },
    async reqGetFloor({commit}){
        let result = await reqFloor();
        if(result.code ==200){
            commit('REQGETFLOOR',result.data)
        }
    },
   
};
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    REQGETBANNER(state,bannerImage){
        state.bannerImage=bannerImage
    },
    REQGETFLOOR(state,floorList){
        state.floorList=floorList
    },

};
const state={
    categoryList:[],
    bannerImage:[],
    floorList:[],
    
};
const getters={

};
export default{
    actions,
    mutations,
    state,
    getters
}


