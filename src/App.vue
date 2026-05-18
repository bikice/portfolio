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
          <li><RouterLink :to="{ path: '/home', hash: '#contact' }">{{ t.nav.back }}</RouterLink></li>
        </template>
      </ul>

      <div class="nav-right">
        <!-- Language switcher -->
        <button class="lang-switch" @click="toggleLang" :aria-label="lang === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'">
          <span :class="{ 'lang-active': lang === 'de' }">DE</span>
          <span class="lang-sep">/</span>
          <span :class="{ 'lang-active': lang === 'en' }">EN</span>
        </button>

        <button
            class="nav-toggle"
            :class="{ open: mobileOpen }"
            @click="mobileOpen = !mobileOpen"
            aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>

    <!-- Mobile Nav Overlay -->
    <div class="mobile-nav" :class="{ open: mobileOpen }" @click="mobileOpen = false">
      <template v-if="isHome">
        <a v-for="link in anchorLinks" :key="link.href" :href="link.href">
          {{ link.label }}
        </a>
      </template>
      <template v-else>
        <RouterLink :to="{ path: '/home', hash: '#hero' }">{{ t.nav.backHome }}</RouterLink>
      </template>

      <!-- Language switcher in mobile overlay -->
      <button class="lang-switch lang-switch--mobile" @click.stop="toggleLang">
        <span :class="{ 'lang-active': lang === 'de' }">DE</span>
        <span class="lang-sep">/</span>
        <span :class="{ 'lang-active': lang === 'en' }">EN</span>
      </button>
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
import { useI18n }        from '@/composables/useI18n.js'

const route      = useRoute()
const isHome     = computed(() => route.name === 'home')
const mobileOpen = ref(false)

const { lang, t, toggleLang } = useI18n()

const anchorLinks = computed(() => [
  { href: '#hero',    id: 'hero',    label: t.value.nav.home    },
  { href: '#about',   id: 'about',   label: t.value.nav.about   },
  { href: '#skills',  id: 'skills',  label: t.value.nav.skills  },
  { href: '#work',    id: 'work',    label: t.value.nav.work    },
  { href: '#contact', id: 'contact', label: t.value.nav.contact },
])

const { activeSection, isScrolled } = useScrollSpy(['hero', 'about', 'skills', 'work', 'contact'])
</script>

<style>
/* Language switcher */
.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-switch {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  background: none;
  border: 1px solid rgba(221, 227, 237, 0.18);
  padding: 0.28rem 0.6rem;
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  color: var(--muted);
  transition: border-color 0.25s, color 0.25s;
}

.lang-switch:hover {
  border-color: rgba(0, 229, 192, 0.35);
  color: var(--text);
}

.lang-sep {
  color: rgba(221, 227, 237, 0.2);
  margin: 0 0.1rem;
}

.lang-active {
  color: var(--accent);
  font-weight: 600;
}

.lang-switch--mobile {
  margin-top: 2rem;
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  border-color: rgba(0, 229, 192, 0.2);
}
</style>