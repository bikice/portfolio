<template>
  <section :id="id" class="section-z sj-section" ref="sectionEl">
    <!--
      .sj-track  — tall scroll canvas; height = sticky viewport height × steps
      .sj-sticky — pins to the viewport while track scrolls past
      .sj-window — clips to exactly one panel's height
      .sj-belt   — all panels stacked; translated upward by JS
    -->
    <div class="sj-track" ref="trackEl">
      <div class="sj-sticky" :style="{ top: navHeight + 'px' }">
        <div class="section-inner">
          <div class="section-card">
            <div class="sj-window" ref="windowEl">
              <div
                  class="sj-belt"
                  ref="beltEl"
                  :style="{ transform: `translateY(${-offset}px)` }"
              >
                <slot />
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

const props = defineProps({
  id:        { type: String,  required: true },
  steps:     { type: Number,  required: true },
  navHeight: { type: Number,  default: 80    },
})

const emit = defineEmits(['step', 'visible'])

const sectionEl = ref(null)
const trackEl   = ref(null)
const windowEl  = ref(null)
const beltEl    = ref(null)

// translateY applied to the belt — driven by scroll
const offset = ref(0)

let scrollHandler = null
let lastIdx = -1

onMounted(() => {
  // Fire 'visible' once on first intersection
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) emit('visible')
  }, { threshold: 0.1 })
  io.observe(sectionEl.value)

  nextTick(() => {
    const belt   = beltEl.value
    const window_ = windowEl.value
    const track  = trackEl.value
    if (!belt || !window_ || !track) return

    // Each child of the belt is one "panel"
    const panels = Array.from(belt.children)
    if (!panels.length) return

    // Measure the tallest panel to use as the fixed viewport height
    const panelH = Math.max(...panels.map(p => p.offsetHeight))

    // Clip the window to exactly one panel's height
    window_.style.height = panelH + 'px'

    // Total scroll canvas:
    //   one panel visible above the sticky top  +  one stepPx gap per additional panel
    const stepPx = panelH         // one full panel height = one scroll step
    const totalScroll = stepPx * (props.steps - 1)
    track.style.height = (panelH + props.navHeight + totalScroll) + 'px'

    scrollHandler = () => {
      if (!trackEl.value) return
      const rect     = trackEl.value.getBoundingClientRect()
      // How many px the track has scrolled past its sticky top
      const scrolled = Math.max(0, -(rect.top - props.navHeight))
      const maxScroll = stepPx * (props.steps - 1)
      const clamped  = Math.min(scrolled, maxScroll)

      // Smooth translate: belt slides up continuously with scroll
      offset.value = clamped

      // Discrete step index for the parent (nav highlight, etc.)
      const idx = Math.min(props.steps - 1, Math.floor(clamped / stepPx + 0.35))
      if (idx !== lastIdx) {
        lastIdx = idx
        emit('step', { index: idx })
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
.sj-track {
  position: relative;
  width: 100%;
}

.sj-sticky {
  position: sticky;
  /* top is set inline via :style binding */
  z-index: 2;
}

/* Clips vertically so only one panel is visible at a time */
.sj-window {
  overflow: hidden;
  /* height set by JS */
}

/* All panels stacked vertically; JS drives translateY */
.sj-belt {
  will-change: transform;
  transition: transform 0.08s linear;
}
</style>