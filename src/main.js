import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 引入商品管理的树形结构第三方UI库
import TreeTable from 'vue-table-with-tree-grid'


import axios from "axios"
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    // config是我们的请求对象    拦截器 用use函数挂载一个回调函数
    // interceptors.request就是请求的拦截器
axios.interceptors.request.use(config => {
        // console.log(config);
        // 预处理
        config.headers.Authorization = window.sessionStorage.getItem('token')
            // 在最后必须return一个config  就是把这个请求头做了预处理，经过处理才发到服务器
        return config
    })
    // 把定义的axios包挂载到vue的原型对象上
Vue.prototype.$http = axios

Vue.config.productionTip = false
    // 全局注册组件
Vue.component('tree-table', TreeTable)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')