<template>
  <section :id="id" class="section-z sj-section" ref="sectionEl">
    <div class="sj-track" ref="trackEl">
      <div class="section-inner sj-sticky">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  /** Section anchor id */
  id: { type: String, required: true },
  /** Number of scroll steps (one per logical "page") */
  steps: { type: Number, required: true },
  /** Pixels of scroll travel per step */
  stepPx: { type: Number, default: 420 },
  /** Height of the sticky nav bar, used as scroll offset */
  navHeight: { type: Number, default: 80 },
})

const emit = defineEmits([
  /** Fired whenever the active step index changes. Payload: { index: number } */
  'step',
  /** Fired once when the section first enters the viewport */
  'visible',
])

const sectionEl = ref(null)
const trackEl   = ref(null)

let scrollHandler = null

onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) emit('visible')
  }, { threshold: 0.1 })
  io.observe(sectionEl.value)

  nextTick(() => {
    const track = trackEl.value
    if (!track) return

    const cardEl = track.querySelector('.section-card')
    const cardH  = cardEl ? cardEl.offsetHeight : 500

    track.style.height =
        (cardH + props.navHeight + props.steps * props.stepPx) + 'px'

    let lastIdx = -1

    scrollHandler = () => {
      if (!trackEl.value) return
      const rect     = trackEl.value.getBoundingClientRect()
      const scrolled = -(rect.top - props.navHeight)
      const zoneEnd  = props.stepPx * (props.steps - 1)
      const clamped  = Math.max(0, Math.min(zoneEnd, scrolled))
      const idx      = Math.min(props.steps - 1, Math.floor(clamped / props.stepPx))
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
}
.sj-sticky {
  position: sticky;
  top: 0;
}
</style>