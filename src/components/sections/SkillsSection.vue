<template>
  <section id="skills" class="section-z" ref="wrapEl">
    <div class="sk-track" ref="trackEl">
      <div class="sk-sticky" ref="stickyEl">
        <div class="section-inner">
          <div class="section-card" ref="cardEl">

            <div class="sk-header" ref="headerEl">
              <div class="section-label reveal">Expertise</div>
              <h2 class="section-title reveal">My <span class="accent">Skills</span></h2>
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const NAV_H = 80

const skillCats = [
  {
    id: 'backend', name: 'Backend & DB', avgPct: 98,
    skills: [
      { name: 'PHP',              pct: 100 },
      { name: 'MySQL / Doctrine', pct: 95  },
      { name: 'Node',             pct: 80  },
      { name: 'Java',             pct: 45  },
    ],
  },
  {
    id: 'javascript', name: 'JavaScript', avgPct: 92,
    skills: [
      { name: 'JavaScript (ES6+)', pct: 100 },
      { name: 'TypeScript',        pct: 95  },
      { name: 'Vue2 / Vue3',       pct: 90  },
      { name: 'React',             pct: 70  },
      { name: 'Angular',           pct: 60  },
    ],
  },
  {
    id: 'frontend', name: 'Frontend', avgPct: 88,
    skills: [
      { name: 'HTML / CSS',           pct: 95 },
      { name: 'SASS / SCSS',          pct: 90 },
      { name: 'Bootstrap / Tailwind', pct: 80 },
      { name: 'Responsive / Mobile',  pct: 75 },
    ],
  },
  {
    id: 'tools', name: 'Tools & Systems', avgPct: 82,
    skills: [
      { name: 'Jetbrains PhpStorm',     pct: 100 },
      { name: 'Git',                    pct: 95 },
      { name: 'Linux Administration',   pct: 90 },
      { name: 'PHPUnit / CSFixer',      pct: 90 },
      { name: 'Selenium / Codeception', pct: 85 },
    ],
  },
]

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

    // Panel height = max of left nav height and tallest right panel.
    // This ensures the window is always tall enough to show all skill rows,
    // and the belt step matches the left column exactly so nothing is cut off.
    const rightPanelH = Math.max(...panels.map(p => p.offsetHeight))
    const leftNavH    = navEl.value ? navEl.value.offsetHeight : 0
    const panelH      = Math.max(rightPanelH, leftNavH)

    // Force every belt panel to that height so the belt step is uniform
    panels.forEach(p => { p.style.minHeight = panelH + 'px' })

    const totalTravel = panelH * (skillCats.length - 1)

    window_.style.height = panelH + 'px'
    track.style.height   = (card.offsetHeight + totalTravel) + 'px'

    scrollHandler = () => {
      if (!trackEl.value) return
      const rect     = trackEl.value.getBoundingClientRect()
      const scrolled  = Math.max(0, -(rect.top - NAV_H))
      const clamped   = Math.min(scrolled, totalTravel)

      beltOffset.value = clamped

      const idx = Math.min(skillCats.length - 1, Math.floor(clamped / panelH + 0.35))
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

.sk-body {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 4rem;
  margin-top: 4rem;
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

/* Remove interactive appearance — nav items are display-only */
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

/* ── Spacing fixes ── */

.sk-panel {
  width: 100%;
  /* generous top/bottom padding so each panel has visual breathing room */
  padding: 2rem 0 3rem;
}

/* Override the global .skill-row gap — more space between each bar */
.skill-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;      /* was 0.35rem */
  margin-bottom: 1.6rem;  /* space between rows */
}

.skill-row:last-child {
  margin-bottom: 0;
}

/* Panel title gets a bit more breathing room too */
.skill-panel-title {
  margin-bottom: 1.8rem;
}
</style>