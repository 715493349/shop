import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login"
import Home from "@/components/Home"
import Welcome from "@/components/Welcome"
import Users from "@/components/user/Users"
import Rights from "@/components/power/Rights"
import Roles from "@/components/power/Roles"
import Cate from "@/components/goods/Cate"
import Params from "@/components/goods/Params"
import GoodsList from "@/components/goods/List"
import Add from "@/components/goods/Add"
import Order from "@/components/order/Order"
import Report from "@/components/report/Report"

Vue.use(VueRouter)
    // 声明一个，最下面在暴露出去router
const router = new VueRouter({
    routes: [
<<<<<<< HEAD
        /*重定向：让目录默认到login目录*/
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
=======
        /*让目录默认到login目录*/
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        // children属性 (子路由)
>>>>>>> goods_params
        {
            path: '/home',
            component: Home,
            // 重定向到 /welcome
            redirect: '/welcome',
            // children属性 (子路由)
            children: [
                { path: '/welcome', component: Welcome },
                { path: '/users', component: Users },
                { path: '/rights', component: Rights },
                { path: '/roles', component: Roles },
                { path: '/categories', component: Cate },
                { path: '/params', component: Params },
                { path: '/goods', component: GoodsList },
                { path: '/goods/add', component: Add },
                { path: '/orders', component: Order },
                { path: '/reports', component: Report }
            ]
        }
    ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要分访问路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //   next有两种调用方式：next() 放行     next('/login')强制跳转路径
    // 判断用户访问的是不是登录页
    if (to.path === '/login') return next()
        // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

// 退出功能实现原理
// 局域token的方式实现退出比较简单，只需要销毁本地的token即可，这样，后续的请求就不会携带token,必须重新登陆生成一个新的token之后才可以访问页面
// 清空token    window.sessionStorage.clear()
// 跳转到登陆页      this.$router.push('/login')
export default router