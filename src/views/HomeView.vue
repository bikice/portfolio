<template>
  <main>

    <!-- ── HERO ─────────────────────────────────── -->
    <section id="hero" class="section-z" style="position:relative;">
      <div style="max-width:1100px; margin:0 auto; padding:0 3rem; padding-top:80px; min-height:100vh; display:flex; flex-direction:column; justify-content:center;">

        <p class="hero-tag">// web developer &amp; programmer</p>

        <h1 class="hero-name">
          Kristof<br>
          <span class="accent">Kamin</span><span class="dim">.</span>
        </h1>

        <p class="hero-sub">
          <span>{{ typewriterText }}</span><span class="hero-cursor" />
        </p>

        <div class="hero-socials">
          <a v-for="s in socials" :key="s.url" :href="s.url" target="_blank" rel="noopener">
            <component :is="s.icon" :size="13" />
            {{ s.label }}
          </a>
          <a href="mailto:info@kristof-kamin.de">
            <IconMail :size="13" />
            Email
          </a>
        </div>

        <div class="hero-scroll-hint">
          <div class="scroll-line" />
          scroll to explore
        </div>

        <div class="hero-deco" aria-hidden="true">
          <div class="hero-deco-line" style="width:110px" />
          <div class="hero-deco-text">since 2001</div>
          <div class="hero-deco-line" style="width:55px" />
        </div>
      </div>
    </section>

    <!-- ── ABOUT ──────────────────────────────────── -->
    <SectionCard id="about">
      <div class="section-label reveal">About me</div>
      <h2 class="section-title reveal">Who I <span class="accent">Am</span></h2>

      <div class="about-grid">
        <div class="about-img-wrap reveal">
          <img src="/images/portrait.jpg" alt="Kristof Kamin" />
          <div class="about-img-badge">Dev since 2010</div>
        </div>

        <div>
          <div class="about-meta reveal-stagger">
            <div v-for="m in aboutMeta" :key="m.key" class="about-meta-item">
              <span class="key">{{ m.key }}</span>
              <span class="val">{{ m.val }}</span>
            </div>
          </div>
          <p class="about-bio reveal">
            Since 2010 I've been working in the web development space — building modern
            websites and web applications, including the mobile domain. For many years
            JavaScript has been my primary environment. I've shipped everything from RIA
            office suites and cloud-storage platforms to social-media networks and freelance
            client projects.
          </p>
        </div>
      </div>
    </SectionCard>

    <!-- ── SKILLS ─────────────────────────────────── -->
    <SkillsSection />

    <!-- ── WORK ───────────────────────────────────── -->
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
          <!-- Period bubble on the spine -->
          <div class="tl2-period-wrap">
            <div class="tl2-period">{{ entry.period }}</div>
          </div>

          <!-- Node on the spine line -->
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

    <!-- ── CONTACT ────────────────────────────────── -->
    <SectionCard id="contact">
      <div class="section-label reveal">Get in touch</div>
      <h2 class="section-title reveal">Let's <span class="accent">Talk</span></h2>

      <div class="contact-layout">
        <div class="reveal">
          <p class="contact-blurb">
            Whether you have a project in mind, a question, or just want to connect —
            I'm always happy to hear from you. Drop me a message or reach out directly
            by email.
          </p>
          <a href="mailto:info@kristof-kamin.de" class="contact-email-link">
            <IconMail :size="13" />
            info@kristof-kamin.de
          </a>
        </div>

        <form class="contact-form reveal" @submit.prevent="sendMessage">
          <div class="form-group">
            <label class="form-label" for="f-name">Name</label>
            <input id="f-name" v-model="form.name" class="form-input"
                   type="text" placeholder="Your name" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="f-email">Email</label>
            <input id="f-email" v-model="form.email" class="form-input"
                   type="email" placeholder="your@email.com" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="f-msg">Message</label>
            <textarea id="f-msg" v-model="form.message" class="form-textarea"
                      rows="5" placeholder="Your message…" required />
          </div>

          <p v-if="formStatus" class="form-status" :class="formStatus.type">
            {{ formStatus.text }}
          </p>

          <button class="btn-send" type="submit">
            <span class="btn-send-text">Send Message →</span>
          </button>
        </form>
      </div>
    </SectionCard>

    <!-- ── FOOTER ─────────────────────────────────── -->
    <SiteFooter />

  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { socials, IconMail } from '@/icons/index.js'
import SectionCard   from '@/components/SectionCard.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import SiteFooter    from '@/components/SiteFooter.vue'
import { useTypewriter } from '@/composables/useTypewriter.js'
import { useReveal }     from '@/composables/useReveal.js'

/* ── Typewriter ───────────────────────────────────── */
const { text: typewriterText } = useTypewriter([
  'Building the web since 2010.',
  'Frontend engineering, done right.',
  'JavaScript is home.',
  'Vue, SASS, Linux — all in a day\'s work.',
])

/* ── Reveal animations ────────────────────────────── */
useReveal([
  { selector: '.reveal, .reveal-stagger', threshold: 0.15 },
  { selector: '.tl-entry',                threshold: 0.10 },
])

/* ── About ────────────────────────────────────────── */
const aboutMeta = [
  { key: 'born',      val: '1st November, 1984'                                  },
  { key: 'based in',  val: 'Germany'                                             },
  { key: 'languages', val: 'German, English'                                     },
  { key: 'focus',     val: 'Web Development · JavaScript · Frontend Engineering' },
]

/* ── Work timeline ────────────────────────────────── */
const tlEntries = ref([])
const timeline = [
  { period: '2017 – present', company: 'Open-Xchange AG',                type: 'work', description: 'Web Application Developer — Developing a RIA Office Suite and cloud-based storage platform' },
  { period: '2014 – 2017',    company: 'motory GmbH',                    type: 'work', description: 'Full Stack Developer — Developing a social media platform' },
  { period: '2012 – 2014',    company: 'onitec Werbeagentur GmbH',       type: 'work', description: 'Full Stack Developer — Websites, webshops and web applications. Linux administration and networking.' },
  { period: '2008 – present', company: 'Freelancer',                     type: 'work', description: 'Web Developer — Development of websites and webshops for clients' },
  { period: '2008 – 2014',    company: 'Jade Hochschule',                type: 'edu',  description: 'Bachelor of Science: Economic Computer Science' },
  { period: '2006 – 2009',    company: 'Hermes Logistik Bremen',         type: 'work', description: 'Creating maps and route systems for package delivery' },
  { period: '2004 – 2005',    company: 'Rheinmetall Defence Electronics', type: 'work', description: 'IT Specialist — Remote control for power plant simulator, tactical navigation system, interface to a mobile robot' },
  { period: '2001 – 2004',    company: 'Rheinmetall Defence Electronics', type: 'edu',  description: 'Education: IT Specialist for Application Development' },
]

/* ── Contact form ─────────────────────────────────── */
const form       = reactive({ name: '', email: '', message: '' })
const formStatus = ref(null)

function sendMessage() {
  formStatus.value = {
    type: 'success',
    text: `Thanks ${form.name}! Your message was sent. I'll get back to you soon.`,
  }
  form.name = form.email = form.message = ''
  setTimeout(() => { formStatus.value = null }, 6000)
}
</script>
<style scoped>
/* ── Timeline 2.0 root ────────────────────────────── */
.tl2-root {
  position: relative;
  margin-top: 3.5rem;
  padding-left: 220px; /* space for period labels */
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
  left: 200px; /* aligns with node column */
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(255,255,255,0.06);
  pointer-events: none;
}
.tl2-spine-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom,
  transparent 0%,
  var(--accent) 20%,
  rgba(0,229,192,0.3) 60%,
  #a78bfa 85%,
  transparent 100%
  );
  opacity: 0.35;
  filter: blur(1px);
}

/* ── Each entry row ───────────────────────────────── */
.tl2-entry {
  position: relative;
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: flex-start;
  margin-bottom: 0;
  padding: 1.6rem 0;
}

/* ── Period label (left, outside grid) ────────────── */
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
.tl2-entry:hover .tl2-period {
  color: var(--accent);
  border-color: rgba(0,229,192,0.25);
}
.tl2-entry.edu:hover .tl2-period {
  color: #a78bfa;
  border-color: rgba(167,139,250,0.25);
}

/* ── Spine node (col 2) ───────────────────────────── */
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
  transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
  z-index: 1;
}
.tl2-entry.edu .tl2-node-dot  { background: #a78bfa; box-shadow: 0 0 8px #a78bfa; }
.tl2-entry.edu .tl2-node-ring { border-color: rgba(167,139,250,0.35); }

.tl2-entry:hover .tl2-node-ring { transform: scale(1.5); border-color: rgba(0,229,192,0.6); }
.tl2-entry:hover .tl2-node-dot  { transform: scale(1.3); box-shadow: 0 0 14px var(--accent); }
.tl2-entry.edu:hover .tl2-node-ring { border-color: rgba(167,139,250,0.6); }
.tl2-entry.edu:hover .tl2-node-dot  { box-shadow: 0 0 14px #a78bfa; }

/* ── Card (col 3) ─────────────────────────────────── */
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
.tl2-entry:hover .tl2-card {
  background: rgba(0,229,192,0.04);
  border-color: rgba(0,229,192,0.18);
  transform: translateX(4px);
}
.tl2-entry.edu:hover .tl2-card {
  background: rgba(167,139,250,0.04);
  border-color: rgba(167,139,250,0.18);
}

/* accent bar that slides in from left on hover */
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
.tl2-entry.edu .tl2-card-bar { background: #a78bfa; box-shadow: 0 0 8px #a78bfa; }
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

/* ── Reveal animation (reuse existing .tl-entry class) */
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
  .tl2-root {
    padding-left: 0;
  }
  .tl2-legend {
    margin-left: 0;
  }
  .tl2-spine {
    left: 9px;
  }
  .tl2-entry {
    grid-template-columns: 20px 1fr;
    padding: 1.2rem 0;
  }
  .tl2-period-wrap {
    position: static;
    width: auto;
    text-align: left;
    grid-column: 1 / -1;
    margin-bottom: 0.6rem;
    margin-left: 2.2rem;
  }
  .tl2-node {
    grid-column: 1;
    grid-row: 2;
  }
  .tl2-card {
    grid-column: 2;
    grid-row: 2;
    margin-left: 1rem;
  }
}
</style>