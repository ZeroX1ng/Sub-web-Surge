import Vue from 'vue'
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  CollapseItem,
  Container,
  Dialog,
  Divider,
  Form,
  FormItem,
  Input,
  Link,
  Option,
  OptionGroup,
  Popover,
  Row,
  Select,
  TabPane,
  Tabs,
  Loading,
  Message,
  MessageBox,
  Notification
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/base.css'

// 设置全局组件尺寸与中文语言包
Vue.prototype.$ELEMENT = { size: 'small' }
locale.use(lang)

// 按需注册模板中实际使用到的组件（配合 babel-plugin-component 按需引入样式）
const components = [
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  CollapseItem,
  Container,
  Dialog,
  Divider,
  Form,
  FormItem,
  Input,
  Link,
  Option,
  OptionGroup,
  Popover,
  Row,
  Select,
  TabPane,
  Tabs
]
components.forEach((component) => Vue.use(component))

Vue.use(Loading.directive)

// 保持原有的全局方法，便于业务代码中直接调用
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
