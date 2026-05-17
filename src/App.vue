<template>
  <div>
    <!-- Hamburger Button -->
    <button
      class="menu-btn"
      :class="{ open: menuOpen }"
      @click="toggleMenu"
      aria-label="Toggle Menu"
    >
      <span class="btn-line" />
      <span class="btn-line" />
      <span class="btn-line" />
    </button>

    <!-- Full-screen Menu Overlay -->
    <div class="menu-overlay" :class="{ open: menuOpen }">
      <!-- Branding Panel -->
      <div class="menu-branding">
        <div class="portrait-circle" />
      </div>

      <!-- Nav Panel -->
      <nav class="menu-nav-panel">
        <ul class="nav-list">
          <li
            v-for="(link, i) in navLinks"
            :key="link.name"
            :style="{ transitionDelay: menuOpen ? `${(i + 1) * 0.1}s` : '0s' }"
          >
            <RouterLink
              :to="link.to"
              class="nav-link-item"
              :class="{ active: $route.name === link.name }"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Page Content -->
    <RouterView />

    <!-- Footer -->
    <footer id="main-footer">
      <span>Copyright &copy; 2019</span>
      <span>|</span>
      <RouterLink to="/imprint">imprint</RouterLink>
      <span>|</span>
      <RouterLink to="/data-protection">data protection</RouterLink>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const navLinks = [
  { name: 'home', label: 'Home', to: '/home' },
  { name: 'about', label: 'About Me', to: '/about' },
  { name: 'work', label: 'My Work', to: '/work' },
  { name: 'contact', label: 'How To Reach Me', to: '/contact' },
]

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
</script>
