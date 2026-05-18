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
import HeroSection    from '@/components/sections/HeroSection.vue'
import AboutSection   from '@/components/sections/AboutSection.vue'
import SkillsSection  from '@/components/sections/SkillsSection.vue'
import CareerTimeline from '@/components/sections/CareerTimeline.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import SiteFooter     from '@/components/layout/SiteFooter.vue'
import { useReveal }  from '@/composables/useReveal.js'

useReveal([
  { selector: '.reveal, .reveal-stagger', threshold: 0.15 },
  { selector: '.tl-entry',                threshold: 0.10 },
])
</script>