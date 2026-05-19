<template>
  <section id="hero" class="section-z" style="position:relative; min-height:100vh;">
    <div class="hero-inner">

      <p class="hero-tag">{{ t.hero.tag }}</p>

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

    </div>

    <div class="hero-scroll-hint">
      <div class="scroll-line" />
      {{ t.hero.scrollHint }}
    </div>

    <div class="hero-deco" aria-hidden="true">
      <div class="hero-deco-line" style="width:110px" />
      <div class="hero-deco-text">since 2001</div>
      <div class="hero-deco-line" style="width:55px" />
    </div>

  </section>
</template>

<script setup>
import { computed }          from 'vue'
import { socials, IconMail } from '@/icons/index.js'
import { useTypewriter }     from '@/composables/useTypewriter.js'
import { useI18n }           from '@/composables/useI18n.js'

const { t } = useI18n()

// Pass a computed ref so useTypewriter reacts to language changes and restarts
const phrases = computed(() => t.value.hero.typewriter)
const { text: typewriterText } = useTypewriter(phrases)
</script>