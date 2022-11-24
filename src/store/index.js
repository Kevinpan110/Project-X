import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX)
import Home from './Home'
import Search from './Search'
import Detail from './Detail'
import ShopCart from './ShopCart'
import Users from './Users'
import Trade from './Trade'
import Payment from './Payment'
import Center from './Center'
export default new VueX.Store ({
    modules:{
        Home,
        Search,
        Detail,
        ShopCart,
        Users,
        Trade,
        Payment,
        Center
    }
})

