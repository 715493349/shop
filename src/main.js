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

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // 导入样式
import 'quill/dist/quill.snow.css' // 雪主题
import 'quill/dist/quill.bubble.css' // 泡沫主体

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
=======
    // config是我们的请求对象
axios.interceptors.request.use(config => {
    // console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token')
        // 在最后必须return一个config  为什么？
    return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false
    // 全局注册组件
Vue.component('tree-table', TreeTable)

    // 将富文本编辑器祖册成为全局可用组件
Vue.use(VueQuillEditor)

// 全局过滤器(商品列表时间过滤器)   originVal处理的时间数据  过滤器名称：dateFormat
Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
        // 加一个字符串变成字符类型，月份不足2位前面补一个0
        // padStart() 方法用另一个字符串填充当前字符串(如果需要的话，会重复多次)，以便产生的字符串达到给定的长度。从当前字符串的左侧开始填充。
    const m = (dt.getMonth() + 1 + '').padStart('2', '0')
    const d = (dt.getDate() + '').padStart('2', '0')
    const hh = (dt.getHours() + '').padStart('2', '0')
    const mm = (dt.getMinutes() + '').padStart('2', '0')
    const ss = (dt.getSeconds() + '').padStart('2', '0')

    // 拼接成一个完成的模板字符串`yyyy-mm-dd hh:mm:ss`
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
