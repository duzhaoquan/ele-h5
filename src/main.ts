import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Tabbar, TabbarItem, Search, Sticky, Icon } from 'vant'

import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'

const app = createApp(App)

const rootValue = 16
const rootWidth = 390
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = (rootValue * deviceWidth) / rootWidth + 'px'

app.use(createPinia())
app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(Sticky)
app.use(Icon)
//ttt
app.mount('#app')
