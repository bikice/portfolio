import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/css/main.css'

// Views
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import WorkView from './views/WorkView.vue'
import ContactView from './views/ContactView.vue'
import ImprintView from './views/ImprintView.vue'
import DataProtectionView from './views/DataProtectionView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/work', name: 'work', component: WorkView },
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/imprint', name: 'imprint', component: ImprintView },
    { path: '/data-protection', name: 'data-protection', component: DataProtectionView },
  ]
})

createApp(App).use(router).mount('#app')
