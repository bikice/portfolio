<template>
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
</template>

<script setup>
import SectionCard from '@/components/SectionCard.vue'

const aboutMeta = [
  { key: 'born',      val: '1st November, 1984'                                  },
  { key: 'based in',  val: 'Germany'                                             },
  { key: 'languages', val: 'German, English'                                     },
  { key: 'focus',     val: 'Web Development · JavaScript · Frontend Engineering' },
]
</script>