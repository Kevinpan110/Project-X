import axios from "axios"
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
import store from '@/store'
const requests = axios.create({
    baseURL:"/api",
    timeout:5000
})
//封装axios
//接收拦截器
requests.interceptors.request.use((config)=>{
    if(store.state.Detail.nanoid)
    config.headers.userTempId=store.state.Detail.nanoid
    if(store.state.Users.token){
        config.headers.token = store.state.Users.token
    }
    nprogress.start()
    return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data;
},(err)=>{
    nprogress.done()
    return Promise.reject(new Error('faile'))
})

export default requests