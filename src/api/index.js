import requests from "./request";
import mockRequest from "./mockRequest";

// 首页三级分类
export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });

// 模拟首页轮播图
export const reqBannerImage = () =>
  mockRequest({ url: "/banner", method: "get" });

// 模拟页脚
export const reqFloor = () => mockRequest({ url: "/floor", method: "get" });

// 搜索商品
export const reqSearchList = (params) =>
  requests({ url: "/list", method: "post", data: params });

// 获取商品详情
export const reqGoodDetail = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });

// 获取购物车列表
export const reqCartList = () =>
  requests({ url: "/cart/cartList", method: "get" });

// 添加到购物车
export const reqAddToCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 根据ID删除购物车商品
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

// 修改商品选中状态
export const reqUpdateChecked = (skuID, isChecked) =>
  requests({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: "get",
  });

// 获取验证码
export const reqValidationCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

// 注册用户
export const reqRegister = (data) =>
  requests({ url: "/user/passport/register", method: "post", data });

//用户登录
export const reqLogin = (data) =>
  requests({ url: "/user/passport/login", method: "post", data });

//获取用户信息
export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

//用户退出登陆
export const reqLogOut = () =>
  requests({ url: "/user/passport/logout", method: "get" });

//获取用户地址信息
export const reqUserAddress = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });

//获取用户订单列表
export const reqUserOrder = () =>
  requests({ url: `/order/auth/trade`, method: "get" });

//提交订单
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data,
  });

//获取支付信息
export const reqPayment = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });

//查询订单支付状态
export const reqPayStatus = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" });

//获取我的订单列表
export const reqMyOrder = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: "get" });
