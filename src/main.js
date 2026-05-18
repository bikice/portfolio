import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/css/main.css'

// HomeView is eager — it's the primary page, loaded immediately
import HomeView from './views/HomeView.vue'

// Legal views are lazy-loaded — they're rarely visited and shouldn't
// bloat the main bundle
const ImprintView        = () => import('./views/ImprintView.vue')
const DataProtectionView = () => import('./views/DataProtectionView.vue')

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/',                redirect: '/home'                                                       },
    { path: '/home',            name: 'home',            component: HomeView                           },
    { path: '/about',           redirect: '/home'                                                       },
    { path: '/work',            redirect: '/home'                                                       },
    { path: '/contact',         redirect: '/home'                                                       },
    { path: '/imprint',         name: 'imprint',         component: ImprintView                        },
    { path: '/data-protection', name: 'data-protection', component: DataProtectionView                 },
  ],
})

createApp(App).use(router).mount('#app')