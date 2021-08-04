import Vue from 'vue'
import {Button,Form,FormItem,Input} from 'element-ui'
// 导入单框提示组件  需要全局挂载
import {Message} from "element-ui"

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.prototype.$message = Message
