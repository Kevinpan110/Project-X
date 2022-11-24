import { reqValidationCode, reqRegister, reqLogin, reqLogOut,reqUserInfo } from "@/api";
const actions = {
  async validationCode({ commit }, phone) {
    let result = await reqValidationCode(phone);
    if (result.code == 200) {
      commit("VALIDATIONCODE", result.data);
    } else {
      return Promise.reject(new Error("获取验证码失败"));
    }
  },
  async register({ commit }, data) {
    let result = await reqRegister(data);
    if (result.code == 200) {
      return Promise.resolve("ok");
    } else {
      return Promise.reject(new Error("注册失败"));
    }
  },
  async login({ commit }, data) {
    let result = await reqLogin(data);
    if (result.code == 200) {
      localStorage.setItem("TOKEN", result.data.token);
      commit("LOGIN", result.data.token);
    } else {
      return Promise.reject(new Error("登录失败"));
    }
  },
  async logOut({ commit }) {
    let result = await reqLogOut();
    if (result.code == 200) {
      commit("LOGOUT");
      return "ok";
    } else {
      return Promise.reject(new Error("退出登录失败"));
    }
  },
  async userInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("USERINFO", result.data);
    } else {
      return Promise.reject(new Error("获取用户信息失败"));
    }
  },
};
const mutations = {
  VALIDATIONCODE(state, result) {
    state.code = result;
  },
  LOGIN(state, token) {
    state.token = token;
  },
  LOGOUT(state) {
    (state.token = ""), (state.userInfo = {}), localStorage.removeItem("TOKEN");
  },
  USERINFO(state, result) {
    state.userInfo = result;
  },
};
const state = {
  code: "",
  token: localStorage.getItem("TOKEN"),
  userInfo: {},
};
const getters = {};
export default {
  actions,
  mutations,
  state,
  getters,
};
