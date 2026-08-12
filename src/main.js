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

// Keep rel=canonical and og:url in sync with the current route so that every
// page (home, imprint, data-protection) points to its own URL instead of
// always pointing to the domain's root.
const SITE_ORIGIN = 'https://kristof-kamin.de'
router.afterEach((to) => {
  const canonicalPath = to.name === 'home' ? '/' : to.path
  const canonicalUrl  = `${SITE_ORIGIN}${canonicalPath}`

  const canonicalLink = document.querySelector('link[rel="canonical"]')
  if (canonicalLink) canonicalLink.setAttribute('href', canonicalUrl)

  const ogUrlMeta = document.querySelector('meta[property="og:url"]')
  if (ogUrlMeta) ogUrlMeta.setAttribute('content', canonicalUrl)
})

createApp(App).use(router).mount('#app')