/*
 * @Author: luoheng
 * @Date: 2022-01-14 23:13:40
 * @LastEditTime: 2022-03-03 01:45:51
 * @LastEditors: luoheng
 * @Description: 
 * God help those who help themselves
 */
// @ts-nocheck
import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录注册   
import Login from "@/components/Login"
// 后台菜单栏
import Home from "@/components/Home"
import Welcome from "@/components/Welcome"
// 用户列表
import Users from "@/components/user/Users"
// 权限管理
import Rights from "@/components/power/Rights"
// 角色列表
import Roles from "@/components/power/Roles"
// 商品分类
import Cate from "@/components/goods/Cate"
// 分类参数
import Params from "@/components/goods/Params"
// 商品列表
import GoodsList from "@/components/goods/List"
// 商品添加
import Add from "@/components/goods/Add"
// 订单管理
import Order from "@/components/order/Order"
// 数据报表
import Report from "@/components/report/Report"

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        /*让目录默认到login目录*/
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        // children属性 (子路由)
        {
            path: '/home',
            component: Home,
            // 重定向到 /welcome
            redirect: '/welcome',
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
    //         next有两种调用方式：next() 放行     next('/login')强制跳转路径
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