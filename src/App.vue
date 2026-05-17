<template>
  <div>
    <!-- Fixed animated background canvas -->
    <canvas ref="bgCanvas" class="bg-canvas" @click="onCanvasClick" />

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
          <li><RouterLink to="/home">← Back</RouterLink></li>
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
        <RouterLink to="/home">← Back home</RouterLink>
      </template>
    </div>

    <!-- Page content -->
    <RouterView />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

/* ── Router / Nav ─────────────────────────────────────────── */
const route         = useRoute()
const isHome        = computed(() => route.name === 'home')
const isScrolled    = ref(false)
const activeSection = ref('hero')
const mobileOpen    = ref(false)

const anchorLinks = [
  { href: '#hero',    id: 'hero',    label: 'Home'    },
  { href: '#about',   id: 'about',   label: 'About'   },
  { href: '#skills',  id: 'skills',  label: 'Skills'  },
  { href: '#work',    id: 'work',    label: 'Work'    },
  { href: '#contact', id: 'contact', label: 'Contact' },
]

function onScroll() {
  isScrolled.value = window.scrollY > 60
  const sections = ['hero', 'about', 'skills', 'work', 'contact']
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i])
    if (el && window.scrollY >= el.offsetTop - 160) {
      activeSection.value = sections[i]
      break
    }
  }
}

/* ── Canvas animation ─────────────────────────────────────── */
const bgCanvas = ref(null)

let ctx     = null
let animId  = null
let startTs = null
let W = 0, H = 0

// Floating ambient particles above the waves
let floaters = []
let bursts   = []

function rand(a, b) { return a + Math.random() * (b - a) }

// ── Wave ribbon config ───────────────────────────────────────
// Each "ribbon" is a horizontal band of densely packed dots
// shaped by multiple sine harmonics, giving the 3D cloth look
const RIBBONS = [
  // { centerY fraction, amplitude, speed, brightness, dot spacing x/y, color tint }
  { cy: 0.82, amp: 90,  spd: 0.00042, bright: 1.0,  sx: 4,  sy: 7,  tint: [0,229,192] },
  { cy: 0.70, amp: 80,  spd: 0.00055, bright: 0.75, sx: 4,  sy: 7,  tint: [0,200,170] },
  { cy: 0.60, amp: 75,  spd: 0.00038, bright: 0.55, sx: 4,  sy: 8,  tint: [0,180,155] },
  { cy: 0.50, amp: 70,  spd: 0.00062, bright: 0.40, sx: 4,  sy: 8,  tint: [0,160,140] },
  { cy: 0.40, amp: 65,  spd: 0.00030, bright: 0.28, sx: 5,  sy: 9,  tint: [0,140,125] },
]

// Precompute dot columns for each ribbon
let ribbonDots = []   // ribbonDots[i] = array of { bx, localPhase, row, rowFrac }

function buildRibbons() {
  ribbonDots = RIBBONS.map(rb => {
    const cols = Math.ceil(W / rb.sx) + 2
    const rowCount = 18   // dots stacked vertically in the ribbon band
    const dots = []
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rowCount; row++) {
        dots.push({
          bx:        col * rb.sx,
          localPhase: col * 0.035,   // horizontal phase shift → wave travels rightward
          row,
          rowFrac:   row / (rowCount - 1),  // 0 = top of band, 1 = bottom
        })
      }
    }
    return dots
  })
}

function initFloaters() {
  floaters = Array.from({ length: 120 }, () => ({
    x:     rand(0, W),
    y:     rand(0, H * 0.55),
    vx:    rand(-0.12, 0.12),
    vy:    rand(-0.18, -0.04),
    r:     rand(0.6, 1.8),
    alpha: rand(0.05, 0.35),
  }))
}

function resize() {
  const c = bgCanvas.value
  W = c.width  = window.innerWidth
  H = c.height = window.innerHeight
  buildRibbons()
  initFloaters()
}

// Wave height for a dot at position bx, time elapsed, ribbon config
function waveY(bx, elapsed, rb, localPhase) {
  const t = elapsed * rb.spd
  // Primary wave
  const w1 = Math.sin(t * 6.0  + localPhase) * rb.amp
  // Secondary harmonic (different freq) for the S-curve complexity
  const w2 = Math.sin(t * 3.7  + localPhase * 1.4 + 1.2) * rb.amp * 0.45
  // Slow global swell
  const w3 = Math.sin(t * 1.1  + localPhase * 0.3) * rb.amp * 0.25
  return w1 + w2 + w3
}

function frame(ts) {
  if (!bgCanvas.value) return
  if (startTs === null) startTs = ts
  const elapsed = ts - startTs

  // Soft fade trail
  ctx.fillStyle = 'rgba(7,9,13,0.42)'
  ctx.fillRect(0, 0, W, H)

  // ── Ribbons ───────────────────────────────────────────────
  for (let ri = 0; ri < RIBBONS.length; ri++) {
    const rb   = RIBBONS[ri]
    const dots = ribbonDots[ri]
    const baseY = H * rb.cy
    const bandH = rb.sy * 18   // total pixel height of this ribbon
    const [tr, tg, tb] = rb.tint

    for (const d of dots) {
      const wy  = waveY(d.bx, elapsed, rb, d.localPhase)
      const py  = baseY + wy + (d.rowFrac - 0.5) * bandH

      // brightness peaks at wave crest (where wy is near max amp)
      // rowFrac: middle rows are brighter (inner surface of cloth)
      const crestFrac  = (Math.sin(elapsed * rb.spd * 6.0 + d.localPhase) + 1) / 2
      const rowBright  = 1 - Math.abs(d.rowFrac - 0.5) * 1.2
      const alpha = Math.max(0.02,
          rb.bright * (0.08 + crestFrac * 0.22 + rowBright * 0.18)
      )
      const r = 0.7 + crestFrac * 0.9 + rowBright * 0.5

      ctx.beginPath()
      ctx.arc(d.bx, py, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${tr},${tg},${tb},${alpha})`
      ctx.fill()
    }
  }

  // ── Floating ambient particles ────────────────────────────
  for (const f of floaters) {
    ctx.beginPath()
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(0,229,192,${f.alpha})`
    ctx.fill()

    f.x += f.vx
    f.y += f.vy
    if (f.y < -10) { f.y = H * 0.55; f.x = rand(0, W) }
    if (f.x < -10) f.x = W + 10
    if (f.x > W + 10) f.x = -10
  }

  // ── Click bursts ──────────────────────────────────────────
  for (let b = bursts.length - 1; b >= 0; b--) {
    const burst = bursts[b]
    burst.life--
    const fade = Math.max(0, burst.life / burst.maxLife)
    fade * fade  // ease out

    for (let i = 0; i < burst.px.length; i++) {
      burst.px[i]  += burst.pvx[i]
      burst.py[i]  += burst.pvy[i]
      burst.pvx[i] *= 0.95
      burst.pvy[i] *= 0.95

      ctx.beginPath()
      ctx.arc(burst.px[i], burst.py[i], 1.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0,229,192,${fade * 0.95})`
      ctx.fill()
    }
    if (burst.life <= 0) bursts.splice(b, 1)
  }

  animId = requestAnimationFrame(frame)
}

function onCanvasClick(e) {
  const count = 70
  const px = [], py = [], pvx = [], pvy = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const speed = rand(1.2, 6)
    px.push(e.clientX); py.push(e.clientY)
    pvx.push(Math.cos(angle) * speed)
    pvy.push(Math.sin(angle) * speed)
  }
  bursts.push({ px, py, pvx, pvy, life: 65, maxLife: 65 })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', resize)

  ctx = bgCanvas.value.getContext('2d')
  resize()
  animId = requestAnimationFrame(frame)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', resize)
  if (animId) cancelAnimationFrame(animId)
})
</script>

<style scoped>
.bg-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  display: block;
  cursor: crosshair;
}
</style>