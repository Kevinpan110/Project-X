import { reqCartList, reqUpdateChecked, reqDeleteCartById } from "@/api";
const actions = {
  async cartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("CARTLIST", result.data);
    }
  },
  async updateChecked({ commit }, { skuID, isChecked }) {
    let result = await reqUpdateChecked(skuID, isChecked);
    if (result.code == 200) {
      return Promise.resolve('ok');
    } else {
      return Promise.reject(new Error("更新勾选状态失败"));
    }
  },
  async deleteCartByID({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("更新勾选状态失败"));
    }
  },
  deleteSelectedCart({ dispatch, getters }) {
    let AllResult = [];
    getters.cartList.cartInfoList.forEach( (item) => {
      if (item.isChecked == 1) {
        let result =  dispatch("deleteCartByID", item.skuId);
        AllResult.push(result);
      }
    });
    return Promise.all(AllResult);
  },
  updateAllChecked({ dispatch, getters }, isChecked) {
    isChecked = isChecked ? 1 : 0;
    let AllResult = [];
    getters.cartList.cartInfoList.forEach( (item) => {
      let result =  dispatch("updateChecked", {
        skuID: item.skuId,
        isChecked,
      });
      AllResult.push(result);
    });
    return Promise.all(AllResult);
  },
};
const mutations = {
  CARTLIST(state, data) {
    state.cartList = data;
  },
};
const state = {
  cartList: {},
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};
export default {
  actions,
  mutations,
  state,
  getters,
};
