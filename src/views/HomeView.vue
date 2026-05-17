<template>
  <main>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <CareerTimeline />
    <ContactSection />
    <SiteFooter />
  </main>
</template>

<script setup>
import HeroSection    from '@/components/HeroSection.vue'
import AboutSection   from '@/components/AboutSection.vue'
import SkillsSection  from '@/components/SkillsSection.vue'
import CareerTimeline from '@/components/CareerTimeline.vue'
import ContactSection from '@/components/ContactSection.vue'
import SiteFooter     from '@/components/SiteFooter.vue'
import { useReveal }  from '@/composables/useReveal.js'

useReveal([
  { selector: '.reveal, .reveal-stagger', threshold: 0.15 },
  { selector: '.tl-entry',                threshold: 0.10 },
])
</script>