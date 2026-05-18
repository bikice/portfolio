<template>
  <div>
    <ParticleBackground />

    <!-- Sticky Nav -->
    <nav class="site-nav" :class="{ scrolled: isScrolled }">
      <a :href="isHome ? '#hero' : '/home'" class="nav-logo">KK<span>.</span></a>

      <ul class="nav-links">
        <template v-if="isHome">
          <li v-for="link in anchorLinks" :key="link.href">
            <a :href="link.href" :class="{ active: activeSection === link.id }">
              {{ link.label }}
            </a>
          </li>
        </template>
        <template v-else>
          <li><RouterLink :to="{ path: '/home', hash: '#contact' }">← Back</RouterLink></li>
        </template>
      </ul>

      <button
          class="nav-toggle"
          :class="{ open: mobileOpen }"
          @click="mobileOpen = !mobileOpen"
          aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>

    <!-- Mobile Nav Overlay -->
    <div class="mobile-nav" :class="{ open: mobileOpen }" @click="mobileOpen = false">
      <template v-if="isHome">
        <a v-for="link in anchorLinks" :key="link.href" :href="link.href">
          {{ link.label }}
        </a>
      </template>
      <template v-else>
        <RouterLink :to="{ path: '/home', hash: '#hero' }">← Back home</RouterLink>
      </template>
    </div>

    <!-- Page content -->
    <RouterView />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ParticleBackground from '@/components/layout/ParticleBackground.vue'
import { useScrollSpy }   from '@/composables/useScrollSpy.js'

const route      = useRoute()
const isHome     = computed(() => route.name === 'home')
const mobileOpen = ref(false)

const anchorLinks = [
  { href: '#hero',    id: 'hero',    label: 'Home'    },
  { href: '#about',   id: 'about',   label: 'About'   },
  { href: '#skills',  id: 'skills',  label: 'Skills'  },
  { href: '#work',    id: 'work',    label: 'Work'    },
  { href: '#contact', id: 'contact', label: 'Contact' },
]

const { activeSection, isScrolled } = useScrollSpy(anchorLinks.map(l => l.id))
</script>