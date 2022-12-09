import store from "@/store";
export default [
  {
    path: "/detail/:skuId?",
    //路由懒加载
    component: () => import("@/views/AppDetail"),
    name: "detail",
    meta: { show: false },
    props: ($route) => {
      return { skuId: $route.params.skuId };
    },
  },
  {
    path: "/home",
    component: () => import("@/views/AppHome"),
    meta: { show: true },
  },
  {
    path: "/login/",
    component: () => import("@/views/AppLogin"),
    meta: { show: false },
  },
  {
    path: "/register/",
    component: () => import("@/views/AppRegister"),
    meta: { show: false },
  },
  {
    path: "/search/:keyword?",
    component: () => import("@/views/AppSearch"),
    meta: { show: true },
    name: "search",
    props: ($route) => {
      return { keyword: $route.params.keyword, k: $route.query.k };
    },
  },
  {
    path: "/shopcart",
    component: () => import("@/views/ShopCart"),
    meta: { show: true },
    name: "shopcart",
  },
  {
    path: "/addcartsuccess/:skuNum?",
    component: () => import("@/views/AddCartSuccess"),
    name: "addcartsuccess",
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path.indexOf("/detail") != -1) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/trade",
    component: () => import("@/views/AppTrade"),
    name: "trade",
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path.indexOf("/shopcart") != -1) {
        next();
      } else if (from.path.indexOf("/login") != -1) {
        let { token } = store.state.Users;
        if (token) {
          next();
        } else {
          next(false);
        }
      } else {
        next(false);
      }
    },
  },
  {
    path: "/pay",
    component: () => import("@/views/AppPay"),
    name: "apppay",
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path.indexOf("/trade") != -1) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/paysuccess",
    component: () => import("@/views/PaySuccess"),
    name: "paysuccess",
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path.indexOf("/pay") != -1) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/center",
    component: () => import("@/views/AppCenter"),
    name: "center",
    meta: { show: true },
    children: [
      {
        path: "myorder",
        component: () => import("@/views/AppCenter/MyOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/views/AppCenter/GroupOrder"),
      },
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    path: "*",
    redirect: "/home",
  },
];
