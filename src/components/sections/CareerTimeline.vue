<template>
  <SectionCard id="work">
    <div class="section-label reveal">Career</div>
    <h2 class="section-title reveal">Work &amp; <span class="accent">Education</span></h2>
    <div class="tl2-root">

      <!-- Legend -->
      <div class="tl2-legend reveal">
        <span class="tl2-leg-item tl2-leg-work">
          <span class="tl2-leg-dot" />Work
        </span>
        <span class="tl2-leg-item tl2-leg-edu">
          <span class="tl2-leg-dot" />Education
        </span>
      </div>

      <!-- Spine -->
      <div class="tl2-spine" aria-hidden="true">
        <div class="tl2-spine-glow" />
      </div>

      <!-- Entries -->
      <div
          v-for="(entry, i) in timeline"
          :key="entry.company + i"
          class="tl2-entry tl-entry"
          :class="entry.type"
          :style="{ transitionDelay: (i * 0.09) + 's' }"
      >
        <!-- Period label -->
        <div class="tl2-period-wrap">
          <div class="tl2-period">{{ entry.period }}</div>
        </div>

        <!-- Node on the spine -->
        <div class="tl2-node">
          <div class="tl2-node-ring" />
          <div class="tl2-node-dot" />
        </div>

        <!-- Card -->
        <div class="tl2-card">
          <div class="tl2-card-type">{{ entry.type === 'work' ? '// work' : '// edu' }}</div>
          <div class="tl2-card-company">{{ entry.company }}</div>
          <div class="tl2-card-desc">{{ entry.description }}</div>
          <div class="tl2-card-bar" />
        </div>
      </div>

    </div>
  </SectionCard>
</template>

<script setup>
import SectionCard from "@/components/layout/SectionCard.vue";

const timeline = [
  { period: '2020 – present', company: 'Books on Demand GmbH',            type: 'work', description: 'Senior Full Stack Developer — Backend with PHP, Symfony, TYPO3. Frontend with Vue2/Vue3, Bootstrap.' },
  { period: '2017 – 2020',    company: 'Open-Xchange AG',                 type: 'work', description: 'Web Application Developer — Developing a RIA Office Suite and cloud-based storage platform' },
  { period: '2014 – 2017',    company: 'motory GmbH',                     type: 'work', description: 'Full Stack Developer — Developing a social media platform' },
  { period: '2012 – 2014',    company: 'onitec Werbeagentur GmbH',        type: 'work', description: 'Full Stack Developer — Websites, webshops and web applications. Linux administration and networking.' },
  { period: '2008 – present', company: 'Freelancer',                      type: 'work', description: 'Web Developer — Development of websites and webshops for clients' },
  { period: '2008 – 2014',    company: 'Jade Hochschule',                 type: 'edu',  description: 'Bachelor of Science: Economic Computer Science' },
  { period: '2006 – 2009',    company: 'Hermes Logistik Bremen',          type: 'work', description: 'Creating maps and route systems for package delivery' },
  { period: '2004 – 2005',    company: 'Rheinmetall Defence Electronics', type: 'work', description: 'IT Specialist — Remote control for power plant simulator, tactical navigation system, interface to a mobile robot' },
  { period: '2001 – 2004',    company: 'Rheinmetall Defence Electronics', type: 'edu',  description: 'Education: IT Specialist for Application Development' },
]
</script>

<style scoped>
/* ── Root ─────────────────────────────────────────── */
.tl2-root {
  position: relative;
  margin-top: 3.5rem;
  padding-left: 220px;
}

/* ── Legend ───────────────────────────────────────── */
.tl2-legend {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  margin-left: -220px;
}
.tl2-leg-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}
.tl2-leg-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.tl2-leg-work .tl2-leg-dot { background: var(--accent); box-shadow: 0 0 6px var(--accent); }
.tl2-leg-edu  .tl2-leg-dot { background: #a78bfa;       box-shadow: 0 0 6px #a78bfa; }

/* ── Vertical spine ───────────────────────────────── */
.tl2-spine {
  position: absolute;
  left: 220px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(255,255,255,0.06);
  pointer-events: none;
}
.tl2-spine-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--accent) 20%,
      rgba(0,229,192,0.3) 60%,
      #a78bfa 85%,
      transparent 100%
  );
  opacity: 0.35;
  filter: blur(1px);
}

/* ── Entry row ────────────────────────────────────── */
.tl2-entry {
  position: relative;
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: flex-start;
  padding: 1.6rem 0;
}

/* ── Period label ─────────────────────────────────── */
.tl2-period-wrap {
  position: absolute;
  left: -220px;
  width: 200px;
  padding-top: 0.15rem;
  text-align: right;
}
.tl2-period {
  display: inline-block;
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  padding: 0.25rem 0.6rem;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  white-space: nowrap;
  transition: color 0.3s, border-color 0.3s;
}
.tl2-entry:hover            .tl2-period { color: var(--accent); border-color: rgba(0,229,192,0.25); }
.tl2-entry.edu:hover        .tl2-period { color: #a78bfa;       border-color: rgba(167,139,250,0.25); }

/* ── Node ─────────────────────────────────────────── */
.tl2-node {
  grid-column: 1;
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.1rem;
}
.tl2-node-ring {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid rgba(0,229,192,0.3);
  transition: transform 0.35s, border-color 0.35s;
}
.tl2-node-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  transition: transform 0.3s, box-shadow 0.3s;
  z-index: 1;
}
.tl2-entry.edu .tl2-node-dot        { background: #a78bfa; box-shadow: 0 0 8px #a78bfa; }
.tl2-entry.edu .tl2-node-ring       { border-color: rgba(167,139,250,0.35); }
.tl2-entry:hover     .tl2-node-ring { transform: scale(1.5); border-color: rgba(0,229,192,0.6); }
.tl2-entry:hover     .tl2-node-dot  { transform: scale(1.3); box-shadow: 0 0 14px var(--accent); }
.tl2-entry.edu:hover .tl2-node-ring { border-color: rgba(167,139,250,0.6); }
.tl2-entry.edu:hover .tl2-node-dot  { box-shadow: 0 0 14px #a78bfa; }

/* ── Card ─────────────────────────────────────────── */
.tl2-card {
  grid-column: 2;
  margin-left: 2rem;
  padding: 1.4rem 1.6rem;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  position: relative;
  overflow: hidden;
  transition: background 0.3s, border-color 0.3s, transform 0.3s;
}
.tl2-entry:hover     .tl2-card { background: rgba(0,229,192,0.04);   border-color: rgba(0,229,192,0.18);   transform: translateX(4px); }
.tl2-entry.edu:hover .tl2-card { background: rgba(167,139,250,0.04); border-color: rgba(167,139,250,0.18); }

.tl2-card-bar {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
}
.tl2-entry.edu   .tl2-card-bar { background: #a78bfa; box-shadow: 0 0 8px #a78bfa; }
.tl2-entry:hover .tl2-card-bar { transform: scaleY(1); }

.tl2-card-type {
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
}
.tl2-entry.edu .tl2-card-type { color: #a78bfa; }

.tl2-card-company {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: 0.04em;
  margin-bottom: 0.5rem;
}
.tl2-card-desc {
  font-size: 0.72rem;
  color: var(--muted);
  line-height: 1.7;
  letter-spacing: 0.02em;
}

/* ── Reveal (hooks into global useReveal / .tl-entry) ─ */
.tl2-entry.tl-entry {
  opacity: 0;
  transform: translateX(-18px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.tl2-entry.tl-entry.visible {
  opacity: 1;
  transform: none;
}

/* ── Responsive ───────────────────────────────────── */
@media (max-width: 768px) {
  .tl2-root        { padding-left: 0; }
  .tl2-legend      { margin-left: 0; }
  .tl2-spine       { left: 9px; }

  .tl2-entry       { padding: 1.2rem 0; }

  .tl2-period-wrap {
    position: static;
    width: auto;
    text-align: left;
    grid-column: 1 / -1;
    margin-bottom: 0.6rem;
    margin-left: 2.2rem;
  }
  .tl2-node        { grid-column: 1; grid-row: 2; }
  .tl2-card        { grid-column: 2; grid-row: 2; margin-left: 1rem; }
}
</style>