<template>
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
</template>

<script setup>
import { socials, IconMail } from '@/icons/index.js'
import { useTypewriter }     from '@/composables/useTypewriter.js'

const { text: typewriterText } = useTypewriter([
  'Building the web since 2010.',
  'Frontend engineering, done right.',
  'JavaScript is home.',
  "Vue, SASS, Linux — all in a day's work.",
])
</script>