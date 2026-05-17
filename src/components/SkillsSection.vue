<template>
  <section id="skills" class="section-z skills-scroll-section" ref="skillsSection">
    <div class="skills-scroll-track" ref="skillsTrack">
      <div class="section-inner skills-sticky-wrap">
        <div class="section-card">

          <div class="section-label reveal">Expertise</div>
          <h2 class="section-title reveal">My <span class="accent">Skills</span></h2>

          <div class="skills-layout">

            <!-- Left: category nav -->
            <div class="skill-nav reveal-stagger">
              <div
                  v-for="(cat, idx) in skillCats"
                  :key="cat.id"
                  class="skill-nav-item"
                  :class="{ active: activeSkill === cat.id }"
                  @click="setSkill(cat.id)"
              >
                <span class="skill-nav-num">0{{ idx + 1 }}</span>
                <span class="skill-nav-name">{{ cat.name }}</span>
                <div class="skill-nav-track">
                  <div class="skill-nav-fill" :style="{ width: cat.avgPct + '%' }" />
                </div>
              </div>
            </div>

            <!-- Right: skill bars for active category -->
            <div class="skills-panel-host">
              <transition name="panel-fade" mode="out-in">
                <div :key="activeSkill" class="skill-panel active">
                  <div class="skill-panel-title">{{ currentCat.name }}</div>
                  <div
                      v-for="skill in currentCat.skills"
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
              </transition>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const skillCats = [
  {
    id: 'frontend', name: 'Frontend', avgPct: 88,
    skills: [
      { name: 'HTML / CSS',          pct: 90 },
      { name: 'SASS / SCSS',         pct: 90 },
      { name: 'Bootstrap',           pct: 80 },
      { name: 'Responsive / Mobile', pct: 80 },
    ],
  },
  {
    id: 'javascript', name: 'JavaScript', avgPct: 90,
    skills: [
      { name: 'JavaScript (ES6+)', pct: 95 },
      { name: 'Vue.js',            pct: 85 },
      { name: 'jQuery',            pct: 90 },
    ],
  },
  {
    id: 'backend', name: 'Backend & DB', avgPct: 63,
    skills: [
      { name: 'PHP',   pct: 70 },
      { name: 'MySQL', pct: 75 },
      { name: 'Java',  pct: 45 },
    ],
  },
  {
    id: 'tools', name: 'Tools & Systems', avgPct: 82,
    skills: [
      { name: 'Linux Administration', pct: 85 },
      { name: 'Selenium',             pct: 75 },
      { name: 'Git',                  pct: 88 },
    ],
  },
]

const STEP_PX = 420

const skillsSection = ref(null)
const skillsTrack   = ref(null)
const activeSkill   = ref('frontend')
const skillsVisible = ref(false)

const currentCat = computed(() => skillCats.find(c => c.id === activeSkill.value))

function setSkill(id) {
  activeSkill.value   = id
  skillsVisible.value = false
  setTimeout(() => { skillsVisible.value = true }, 80)
}

// Defined at setup() scope so onUnmounted can reference it
let scrollHandler = null

onMounted(() => {
  // Trigger bar animation when section enters view
  const skillsIo = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) skillsVisible.value = true
  }, { threshold: 0.1 })
  skillsIo.observe(skillsSection.value)

  nextTick(() => {
    const track = skillsTrack.value
    if (!track) return

    const cardEl = track.querySelector('.section-card')
    const cardH  = cardEl ? cardEl.offsetHeight : 500
    const navH   = 80

    // Give the track enough height for STEP_PX of scroll dwell per category
    track.style.height = (cardH + navH + skillCats.length * STEP_PX) + 'px'

    scrollHandler = function onScroll() {
      if (!skillsTrack.value) return
      const rect     = skillsTrack.value.getBoundingClientRect()
      const scrolled = -(rect.top - navH)
      const zoneEnd  = STEP_PX * (skillCats.length - 1)
      const clamped  = Math.max(0, Math.min(zoneEnd, scrolled))
      const idx      = Math.min(skillCats.length - 1, Math.floor(clamped / STEP_PX))
      const newId    = skillCats[idx].id
      if (newId !== activeSkill.value) setSkill(newId)
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })
  })
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>

<style scoped>
.panel-fade-enter-active,
.panel-fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.panel-fade-enter-from   { opacity: 0; transform: translateY(10px);  }
.panel-fade-leave-to     { opacity: 0; transform: translateY(-6px); }
</style>