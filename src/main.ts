import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import InfiniteScroll from 'vue-infinite-scroll'
import '@/assets/scss/style.scss'

createApp(App).use(store).use(router).use(InfiniteScroll).mount('#app')
