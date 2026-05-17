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
          <a v-for="s in socials" :key="s.url"
             :href="s.url" target="_blank" rel="noopener">
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
    <section id="about" class="section-z">
      <div class="section-inner">
        <div class="section-card">
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
        </div><!-- /.section-card -->
      </div>
    </section>

    <!-- ── SKILLS ─────────────────────────────────── -->
    <!--
      Scroll-driven sticky skills:
      The section is given artificial height (via .skills-scroll-track) so there
      is scroll room for each category. The card is position:sticky so it stays
      on screen while scroll progresses through the track.
    -->
    <section id="skills" class="section-z skills-scroll-section" ref="skillsSection">
      <!-- Tall scroll track — height set by JS based on category count -->
      <div class="skills-scroll-track" ref="skillsTrack">

        <!-- Sticky card — stays in viewport while track scrolls past -->
        <div class="section-inner skills-sticky-wrap">
          <div class="section-card">
            <div class="section-label reveal">Expertise</div>
            <h2 class="section-title reveal">My <span class="accent">Skills</span></h2>

            <div class="skills-layout">

              <!-- Left: category nav (shows active state) -->
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
          </div><!-- /.section-card -->
        </div><!-- /.skills-sticky-wrap -->

      </div><!-- /.skills-scroll-track -->
    </section>

    <!-- ── WORK ───────────────────────────────────── -->
    <section id="work" class="section-z">
      <div class="section-inner">
        <div class="section-card">
          <div class="section-label reveal">Career</div>
          <h2 class="section-title reveal">Work &amp; <span class="accent">Education</span></h2>

          <div class="timeline">
            <div
                v-for="(entry, i) in timeline"
                :key="entry.company + i"
                class="tl-entry"
                :ref="el => { if (el) tlEntries[i] = el }"
                :style="{ transitionDelay: (i * 0.07) + 's' }"
            >
              <div class="tl-dot" />
              <div class="tl-period">{{ entry.period }}</div>
              <div class="tl-company">{{ entry.company }}</div>
              <div class="tl-desc">{{ entry.description }}</div>
            </div>
          </div>
        </div><!-- /.section-card -->
      </div>
    </section>

    <!-- ── CONTACT ────────────────────────────────── -->
    <section id="contact" class="section-z">
      <div class="section-inner">
        <div class="section-card">
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
        </div><!-- /.section-card -->
      </div>
    </section>

    <!-- ── FOOTER ─────────────────────────────────── -->
    <footer class="site-footer">
      <div class="footer-outer">
        <div class="footer-inner">
          <div class="footer-top">
            <div>
              <div class="footer-brand-name">Kristof<br><span class="accent">Kamin</span></div>
              <div class="footer-tagline">// web developer since 2010</div>
            </div>

            <div class="footer-col">
              <div class="footer-col-title">Navigate</div>
              <ul>
                <li v-for="link in footerNav" :key="link.href">
                  <a :href="link.href">{{ link.label }}</a>
                </li>
              </ul>
            </div>

            <div class="footer-col">
              <div class="footer-col-title">Connect</div>
              <ul>
                <li v-for="s in socials" :key="s.url">
                  <a :href="s.url" target="_blank" rel="noopener">{{ s.label }}</a>
                </li>
                <li><a href="mailto:info@kristof-kamin.de">Email</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p class="footer-copy">© {{ new Date().getFullYear() }} Kristof Kamin. All rights reserved.</p>
            <div class="footer-legal">
              <RouterLink to="/imprint">Imprint</RouterLink>
              <RouterLink to="/data-protection">Data Protection</RouterLink>
            </div>
          </div>
        </div>
      </div><!-- /.footer-outer -->
    </footer>

  </main>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'

/* ── Inline SVG icon components ──────────────────── */
const IconLinkedIn = {
  props: ['size'],
  template: `<svg :width="size||14" :height="size||14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`
}
const IconGitHub = {
  props: ['size'],
  template: `<svg :width="size||14" :height="size||14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>`
}
const IconCodePen = {
  props: ['size'],
  template: `<svg :width="size||14" :height="size||14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/><polyline points="2 15.5 12 8.5 22 15.5"/><line x1="12" y1="2" x2="12" y2="8.5"/></svg>`
}
const IconXing = {
  props: ['size'],
  template: `<svg :width="size||14" :height="size||14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.228 5.306L4 9.04l5.127 8.933H13L7.867 9.04 10.098 5.306H6.228zm8.4-4.306l-5.12 8.908L15.827 21H20l-6.303-11.092 5.12-8.908H14.627z"/></svg>`
}
const IconMail = {
  props: ['size'],
  template: `<svg :width="size||14" :height="size||14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
}

/* ── Data ─────────────────────────────────────────── */
const socials = [
  { url: 'https://www.linkedin.com/in/kristof-kamin', label: 'LinkedIn', icon: IconLinkedIn },
  { url: 'https://github.com/bikice',                 label: 'GitHub',   icon: IconGitHub   },
  { url: 'https://codepen.io/BiKICE',                 label: 'CodePen',  icon: IconCodePen  },
  { url: 'https://www.xing.com/profile/Kristof_Kamin',label: 'Xing',     icon: IconXing     },
]

const aboutMeta = [
  { key: 'born',      val: '1st November, 1984'               },
  { key: 'based in',  val: 'Germany'                          },
  { key: 'languages', val: 'German, English'                  },
  { key: 'focus',     val: 'Web Development · JavaScript · Frontend Engineering' },
]

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

const timeline = [
  { period: '2017 – present', company: 'Open-Xchange AG',                   description: 'Web Application Developer — Developing a RIA Office Suite and cloud-based storage platform' },
  { period: '2014 – 2017',    company: 'motory GmbH',                        description: 'Full Stack Developer — Developing a social media platform' },
  { period: '2012 – 2014',    company: 'onitec Werbeagentur GmbH',           description: 'Full Stack Developer — Websites, webshops and web applications. Linux administration and networking.' },
  { period: '2008 – present', company: 'Freelancer',                         description: 'Web Developer — Development of websites and webshops for clients' },
  { period: '2008 – 2014',    company: 'Jade Hochschule',                    description: 'Bachelor of Science: Economic Computer Science' },
  { period: '2006 – 2009',    company: 'Hermes Logistik Bremen',             description: 'Creating maps and route systems for package delivery' },
  { period: '2004 – 2005',    company: 'Rheinmetall Defence Electronics',    description: 'IT Specialist — Remote control for power plant simulator, tactical navigation system, interface to a mobile robot' },
  { period: '2001 – 2004',    company: 'Rheinmetall Defence Electronics',    description: 'Education: IT Specialist for Application Development' },
]

const footerNav = [
  { href: '#hero',    label: 'Home'    },
  { href: '#about',   label: 'About'   },
  { href: '#skills',  label: 'Skills'  },
  { href: '#work',    label: 'Work'    },
  { href: '#contact', label: 'Contact' },
]

/* ── Typewriter ───────────────────────────────────── */
const phrases = [
  'Building the web since 2010.',
  'Frontend engineering, done right.',
  'JavaScript is home.',
  'Vue, SASS, Linux — all in a day\'s work.',
]
const typewriterText = ref('')
let twPi = 0, twCi = 0, twDeleting = false, twTimer = null

function type() {
  const phrase = phrases[twPi]
  if (!twDeleting) {
    typewriterText.value = phrase.slice(0, ++twCi)
    if (twCi === phrase.length) {
      twDeleting = true
      twTimer = setTimeout(type, 2200)
      return
    }
  } else {
    typewriterText.value = phrase.slice(0, --twCi)
    if (twCi === 0) {
      twDeleting = false
      twPi = (twPi + 1) % phrases.length
    }
  }
  twTimer = setTimeout(type, twDeleting ? 38 : 62)
}

/* ── Skills panel ─────────────────────────────────── */
const activeSkill   = ref('frontend')
const skillsVisible = ref(false)
const skillsSection = ref(null)   // <section> ref
const skillsTrack   = ref(null)   // scroll-track ref

const currentCat = computed(() => skillCats.find(c => c.id === activeSkill.value))

// PER-CATEGORY scroll height in px (how much scroll each category gets)
const STEP_PX = 420

function setSkill(id) {
  activeSkill.value = id
  skillsVisible.value = false
  setTimeout(() => { skillsVisible.value = true }, 80)
}

/* ── Contact form ─────────────────────────────────── */
const form = reactive({ name: '', email: '', message: '' })
const formStatus = ref(null)

function sendMessage() {
  formStatus.value = {
    type: 'success',
    text: `Thanks ${form.name}! Your message was sent. I'll get back to you soon.`,
  }
  form.name = form.email = form.message = ''
  setTimeout(() => { formStatus.value = null }, 6000)
}

/* ── Intersection observers ───────────────────────── */
const tlEntries = ref([])

onMounted(() => {
  // typewriter
  twTimer = setTimeout(type, 1400)

  // reveal elements
  const revealIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        revealIo.unobserve(e.target)
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealIo.observe(el))

  // timeline entries
  const tlIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        tlIo.unobserve(e.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.tl-entry').forEach(el => tlIo.observe(el))

  // ── Sticky skills scroll logic ─────────────────────────
  // Set the track height so there is STEP_PX of scroll per category
  // The card itself is position:sticky so it stays visible the whole time.
  nextTick(() => {
    const track = skillsTrack.value
    if (!track) return

    // Card height + padding (measured after render)
    const cardEl = track.querySelector('.section-card')
    const cardH  = cardEl ? cardEl.offsetHeight : 500
    const navH   = 80   // approx nav bar height

    // Total track height:
    //   cardH + navH  → space needed so the sticky card is fully visible when pinned
    //   skillCats.length * STEP_PX → one full STEP_PX dwell per category (incl. last)
    track.style.height = (cardH + navH + skillCats.length * STEP_PX) + 'px'

    // Trigger skill bars once section enters view
    const skillsIo = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) skillsVisible.value = true
    }, { threshold: 0.1 })
    skillsIo.observe(skillsSection.value)

    // Map scroll position within track → active category
    function onScroll() {
      const track = skillsTrack.value
      if (!track) return
      const rect     = track.getBoundingClientRect()
      const cardH    = track.querySelector('.section-card')?.offsetHeight ?? 500
      // scrolled past the top of the track (positive = scrolled in)
      const scrolled = -(rect.top - navH)
      // active zone starts after the card has pinned (one viewport of scroll room)
      const zoneStart = 0
      const zoneEnd   = STEP_PX * (skillCats.length - 1)
      const clamped   = Math.max(0, Math.min(zoneEnd, scrolled - zoneStart))
      const idx       = Math.min(skillCats.length - 1, Math.floor(clamped / STEP_PX))
      const newId     = skillCats[idx].id
      if (newId !== activeSkill.value) setSkill(newId)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onUnmounted(() => window.removeEventListener('scroll', onScroll))
  })
})

onUnmounted(() => clearTimeout(twTimer))
</script>

<style scoped>
/* panel transition */
.panel-fade-enter-active,
.panel-fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.panel-fade-enter-from   { opacity: 0; transform: translateY(10px); }
.panel-fade-leave-to     { opacity: 0; transform: translateY(-6px); }
</style>