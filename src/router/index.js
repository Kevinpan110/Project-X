import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)
import store from '@/store'

let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace
//重写push方法
VueRouter.prototype.push = function (location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
//重写replace方法
VueRouter.prototype.replace = function (location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
//创建路由对象
let router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      }
})
//路由守卫
router.beforeEach(async (to,from,next)=>{
    let {token}  = store.state.Users
    let {loginName} = store.state.Users.userInfo
    //如果有token
    if(token){
        //login重定向
        if(to.path=='login'||to.path=='register'){
            next('/')
        }else{
            //无loginName拿loginName
            if(loginName){
                next();
            }else{
                try {
                    await store.dispatch('userInfo')
                    next()
                } catch (error) {
                    //token失效了，清除token，并引导至登陆页面
                    await store.dispatch('logOut')
                    next('login')
                }
            }
        }
    }else{
        let toPath=to.path
        //如果是去pay,center,trade，记录到query中，登陆后跳转
        if(toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1||toPath.indexOf('/trade')!=-1){
            next(`/login?redirect=${toPath}`)
        }else{
            next()
        }
    }
})
export default router