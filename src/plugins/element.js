import Vue from 'vue'
import {
    Button, Form, FormItem, Input,
    Container, Header, Aside, Main,
    Menu,Submenu,MenuItem
} from 'element-ui'
// 导入单框提示组件  需要全局挂载
import {Message} from "element-ui"

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)

Vue.prototype.$message = Message
