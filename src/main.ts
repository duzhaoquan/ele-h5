import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  Tabbar,
  TabbarItem,
  Search,
  Sticky,
  Icon,
  Skeleton,
  Loading,
  Tabs,
  Tab,
  NavBar,
  Form,
  CellGroup,
  Field,
  Button,
  ActionSheet,
  Sidebar,
  SidebarItem,
  CheckboxGroup,
  Checkbox,
  Popup,
  List,
  Cell,
} from 'vant'

import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import './assets/common.scss'
import lazyPlugin from './directives/lazyLoading'

const app = createApp(App)

const rootValue = 16
const rootWidth = 390
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = (rootValue * deviceWidth) / rootWidth + 'px'

app.use(NavBar)
app.use(createPinia())
app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(Form)
app.use(CellGroup)
app.use(Field)
app.use(Button)
app.use(Sticky)
app.use(Icon)
app.use(Skeleton)
app.use(Loading)
app.use(Tab)
app.use(Tabs)
app.use(lazyPlugin)
app.use(ActionSheet)
app.use(Sidebar)
app.use(SidebarItem)
app.use(Checkbox)
app.use(CheckboxGroup)
app.use(Popup)
app.use(List)
app.use(Loading)
app.use(Cell)
//ttt
app.mount('#app')
declare global {
  interface Window {
    isWeixin: boolean
  }
}
