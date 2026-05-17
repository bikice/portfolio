import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/css/main.css'

import HomeView           from './views/HomeView.vue'
import ImprintView        from './views/ImprintView.vue'
import DataProtectionView from './views/DataProtectionView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to) {
    // hash links handled natively by smooth-scroll CSS
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/',                redirect: '/home'                                                        },
    { path: '/home',            name: 'home',            component: HomeView                            },
    /* legacy routes still work but everything is now in HomeView */
    { path: '/about',           redirect: '/home'                                                        },
    { path: '/work',            redirect: '/home'                                                        },
    { path: '/contact',         redirect: '/home'                                                        },
    { path: '/imprint',         name: 'imprint',         component: ImprintView                         },
    { path: '/data-protection', name: 'data-protection', component: DataProtectionView                  },
  ],
})

createApp(App).use(router).mount('#app')