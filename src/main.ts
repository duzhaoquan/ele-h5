import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

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
//ttt
app.mount('#app')
