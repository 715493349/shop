import Vue from 'vue'
import {
    Button, Form, FormItem, Input,
    Container, Header, Aside, Main,
    Menu,Submenu,MenuItem,
    Breadcrumb,BreadcrumbItem, Card,Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,Dialog,MessageBox,Select,Option,
    Tag,Tree,Cascader,
    Button,
    Form,
    FormItem,
    Input,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Select,
    Option,
    Tag,
    Tree,
    Cascader,
    Alert,
    Tabs,
    TabPane,
    Steps,
    Step,
    CheckboxGroup,
    Checkbox,
    Upload,
    Timeline,
    TimelineItem
} from 'element-ui'

// import Timeline from "./timeline/index"
// import TimelineItem from "./timeline-item/index"
// 导入单框提示组件  需要全局挂载
import { Message } from "element-ui"
import { Slider } from "element-ui";

// 登陆页面
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

// 用户列表组件
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)

// 权限列表
Vue.use(Tag)
Vue.use(Cascader)

// 分类参数
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)

// 商品列表>商品分类
Vue.use(Steps)
Vue.use(Step)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Upload)

Vue.use(Timeline)
Vue.use(TimelineItem)


Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
