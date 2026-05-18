<template>
  <section id="skills" class="section-z" ref="wrapEl">
    <div class="sk-track" ref="trackEl">
      <div class="sk-sticky" ref="stickyEl">
        <div class="sk-inner">
          <div class="sk-card" ref="cardEl">

            <div class="sk-header" ref="headerEl">
              <div class="section-label reveal">{{ t.skills.label }}</div>
              <h2 class="section-title reveal">{{ t.skills.title }} <span class="accent">{{ t.skills.titleAccent }}</span></h2>
            </div>

            <div class="sk-body">

              <!-- LEFT: static, only active class changes -->
              <div class="skill-nav reveal-stagger" ref="navEl">
                <div
                    v-for="(cat, ci) in skillCats"
                    :key="cat.id"
                    class="skill-nav-item"
                    :class="{ active: ci === activeIdx }"
                >
                  <span class="skill-nav-num">0{{ ci + 1 }}</span>
                  <span class="skill-nav-name">{{ cat.name }}</span>
                  <div class="skill-nav-track">
                    <div class="skill-nav-fill" :style="{ width: cat.avgPct + '%' }" />
                  </div>
                </div>
              </div>

              <!-- RIGHT: clipping window + translating belt -->
              <div class="sk-window" ref="windowEl">
                <div
                    class="sk-belt"
                    ref="beltEl"
                    :style="{ transform: `translateY(${-beltOffset}px)` }"
                >
                  <div
                      v-for="cat in skillCats"
                      :key="cat.id"
                      class="sk-panel"
                  >
                    <div class="skill-panel-title">{{ cat.name }}</div>
                    <div
                        v-for="skill in cat.skills"
                        :key="skill.name"
                        class="skill-row"
                    >
                      <div class="skill-row-label">
                        <span>{{ skill.name }}</span>
                        <span>{{ skill.pct }}%</span>
                      </div>
                      <div class="skill-track">
                        <div
                            class="skill-fill"
                            :style="{ width: skillsVisible ? skill.pct + '%' : '0%' }"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from '@/composables/useI18n.js'

const { t } = useI18n()

const NAV_H = 80

const skillCats = computed(() => t.value.skills.cats)

const activeIdx     = ref(0)
const skillsVisible = ref(false)
const beltOffset    = ref(0)

const wrapEl   = ref(null)
const trackEl  = ref(null)
const stickyEl = ref(null)
const cardEl   = ref(null)
const headerEl = ref(null)
const windowEl = ref(null)
const beltEl   = ref(null)
const navEl    = ref(null)

let scrollHandler = null
let lastIdx = -1

onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) skillsVisible.value = true
  }, { threshold: 0.1 })
  io.observe(wrapEl.value)

  nextTick(() => {
    const belt    = beltEl.value
    const window_ = windowEl.value
    const track   = trackEl.value
    const card    = cardEl.value
    if (!belt || !window_ || !track || !card) return

    const panels = Array.from(belt.children)

    const headerH    = headerEl.value ? headerEl.value.offsetHeight : 0
    const cardEl_    = stickyEl.value?.querySelector('.sk-card')
    const cardPadV   = cardEl_ ? parseFloat(getComputedStyle(cardEl_).paddingTop) + parseFloat(getComputedStyle(cardEl_).paddingBottom) : 64
    const innerEl_   = stickyEl.value?.querySelector('.sk-inner')
    const innerPadV  = innerEl_ ? parseFloat(getComputedStyle(innerEl_).paddingTop) + parseFloat(getComputedStyle(innerEl_).paddingBottom) : 48
    const bodyMargin = 32
    const chrome     = cardPadV + innerPadV + headerH + bodyMargin

    const maxWindowH  = Math.max(window.innerHeight - NAV_H - chrome, 180)
    const rightPanelH = Math.max(...panels.map(p => p.offsetHeight))
    const leftNavH    = navEl.value ? navEl.value.offsetHeight : 0
    const panelH      = Math.min(Math.max(rightPanelH, leftNavH), maxWindowH)

    panels.forEach(p => { p.style.minHeight = panelH + 'px' })

    const totalTravel = panelH * (skillCats.value.length - 1)

    window_.style.height    = panelH + 'px'
    window_.style.maxHeight = panelH + 'px'
    track.style.height   = (card.offsetHeight + totalTravel) + 'px'

    scrollHandler = () => {
      if (!trackEl.value) return
      const rect     = trackEl.value.getBoundingClientRect()
      const scrolled  = Math.max(0, -(rect.top - NAV_H))
      const clamped   = Math.min(scrolled, totalTravel)

      beltOffset.value = clamped

      const idx = Math.min(skillCats.value.length - 1, Math.floor(clamped / panelH + 0.35))
      if (idx !== lastIdx) {
        lastIdx = idx
        activeIdx.value = idx
      }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })
  })
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>

<style scoped>
.sk-track {
  position: relative;
  width: 100%;
}

.sk-sticky {
  position: sticky;
  top: 80px;
  z-index: 2;
}

.sk-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
}

.sk-card {
  background: rgba(10, 13, 20, 0.72);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 229, 192, 0.10);
  border-radius: 20px;
  padding: 2rem 3.5rem;
  box-shadow:
      0 8px 40px rgba(0, 0, 0, 0.45),
      0 0 0 1px rgba(255,255,255,0.02) inset;
}

@media (max-width: 768px) {
  .sk-inner { padding: 1rem 1rem; }
  .sk-card  { padding: 1.5rem 1.5rem; border-radius: 14px; }
}

.sk-body {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 4rem;
  margin-top: 2rem;
  align-items: start;
}

@media (max-width: 900px) {
  .sk-body { grid-template-columns: 1fr; }
}

.sk-window {
  overflow: hidden;
}

.sk-belt {
  will-change: transform;
  transition: transform 0.08s linear;
}

.skill-nav-item {
  cursor: default;
}

.skill-nav-item:hover {
  border-color: transparent !important;
  background: transparent !important;
}

.skill-nav-item:hover .skill-nav-name {
  color: var(--muted) !important;
}

.sk-panel {
  width: 100%;
  padding: 2rem 0 3rem;
}

.skill-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.6rem;
}

.skill-row:last-child {
  margin-bottom: 0;
}

.skill-panel-title {
  margin-bottom: 1.8rem;
}
</style>