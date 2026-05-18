<template>
  <footer class="site-footer">

    <div class="f-wrap">

      <!-- Main row: brand left · nav + icons right -->
      <div class="f-main">

        <div class="f-brand">
          <a href="#hero" class="f-logo">KK<span>.</span></a>
          <p class="f-tagline">{{ t.footer.tagline }}</p>
          <div class="f-status">
            <span class="f-status-dot" />
            {{ t.footer.available }}
          </div>
        </div>

        <div class="f-right">
          <nav class="f-nav">
            <a v-for="link in t.footer.nav" :key="link.href" :href="link.href">
              {{ link.label }}
            </a>
          </nav>

          <div class="f-icons">
            <a
                v-for="s in socials"
                :key="s.url"
                :href="s.url"
                target="_blank"
                rel="noopener"
                :title="s.label"
            >
              <component :is="s.icon" :size="15" />
            </a>
            <a href="mailto:info@kristof-kamin.de" title="Email">
              <IconMail :size="15" />
            </a>
          </div>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="f-bottom">
        <span class="f-copy">© {{ year }} Kristof Kamin</span>
        <div class="f-legal">
          <RouterLink to="/imprint">{{ t.footer.imprint }}</RouterLink>
          <RouterLink to="/data-protection">{{ t.footer.dataProtection }}</RouterLink>
        </div>
      </div>

    </div>

  </footer>
</template>

<script setup>
import { socials, IconMail } from '@/icons/index.js'
import { useI18n }           from '@/composables/useI18n.js'

const { t } = useI18n()
const year  = new Date().getFullYear()
</script>

<style scoped>
/* ── Shell ────────────────────────────────────────── */
.f-wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ── Main row ─────────────────────────────────────── */
.f-main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;
  padding: 3rem 0 2.5rem;
  border-bottom: 1px solid rgba(0, 229, 192, 0.08);
}

/* ── Brand ────────────────────────────────────────── */
.f-logo {
  display: inline-block;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--accent);
  text-decoration: none;
  margin-bottom: 0.75rem;
}

.f-logo span { color: var(--text); }

.f-tagline {
  font-size: 0.65rem;
  color: var(--text);
  letter-spacing: 0.14em;
  line-height: 1.9;
  margin-bottom: 1.2rem;
  white-space: pre-line;
}

.f-status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  color: var(--text);
  border: 1px solid rgba(0, 229, 192, 0.15);
  padding: 0.3rem 0.7rem;
}

.f-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
  animation: pulse 2.4s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1;   box-shadow: 0 0 6px var(--accent); }
  50%       { opacity: 0.5; box-shadow: 0 0 2px var(--accent); }
}

/* ── Right column ─────────────────────────────────── */
.f-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.5rem;
  padding-top: 0.1rem;
}

/* ── Nav links ────────────────────────────────────── */
.f-nav {
  display: flex;
  gap: 1.8rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.f-nav a {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text);
  text-decoration: none;
  position: relative;
  transition: color 0.25s;
}

.f-nav a::after {
  content: '';
  position: absolute;
  bottom: -3px; left: 0;
  width: 0; height: 1px;
  background: var(--accent);
  transition: width 0.3s;
}

.f-nav a:hover { color: var(--accent); }
.f-nav a:hover::after { width: 100%; }

/* ── Social icons ─────────────────────────────────── */
.f-icons {
  display: flex;
  gap: 0.9rem;
  align-items: center;
}

.f-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--text);
  border: 1px solid rgba(221, 227, 237, 0.25);
  text-decoration: none;
  transition: color 0.25s, border-color 0.25s, background 0.25s, transform 0.2s;
}

.f-icons a:hover {
  color: var(--accent);
  border-color: rgba(0, 229, 192, 0.4);
  background: rgba(0, 229, 192, 0.05);
  transform: translateY(-2px);
}

/* ── Bottom bar ───────────────────────────────────── */
.f-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 0;
  gap: 1rem;
}

.f-copy {
  font-size: 0.6rem;
  color: var(--text);
  letter-spacing: 0.12em;
}

.f-legal {
  display: flex;
  gap: 1.5rem;
}

.f-legal a {
  font-size: 0.6rem;
  color: var(--text);
  letter-spacing: 0.12em;
  text-decoration: none;
  transition: color 0.25s;
}

.f-legal a:hover { color: var(--accent); }

/* ── Responsive ───────────────────────────────────── */
@media (max-width: 768px) {
  .f-main {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 0 1.75rem;
  }

  .f-right {
    align-items: flex-start;
    width: 100%;
  }

  .f-nav { justify-content: flex-start; }
}
</style>