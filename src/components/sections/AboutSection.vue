<template>
  <SectionCard id="about">
    <div class="section-label reveal">{{ t.about.label }}</div>
    <h2 class="section-title reveal">{{ t.about.title }} <span class="accent">{{ t.about.titleAccent }}</span></h2>

    <div class="about-grid">
      <div class="about-img-wrap reveal">
        <img src="/images/portrait.jpg" alt="Kristof Kamin" />
        <div class="about-img-badge">{{ t.about.badge }}</div>
      </div>

      <div>
        <div class="about-meta reveal-stagger">
          <div v-for="m in t.about.meta" :key="m.key" class="about-meta-item">
            <span class="key">{{ m.key }}</span>
            <span class="val">{{ m.val }}</span>
          </div>
        </div>

        <div class="about-status reveal">
          <span class="about-status-dot" />
          {{ t.about.available }}
        </div>

        <p class="about-bio reveal">{{ t.about.bio }}</p>
      </div>
    </div>
  </SectionCard>
</template>

<script setup>
import SectionCard from '@/components/layout/SectionCard.vue'
import { useI18n } from '@/composables/useI18n.js'

const { t } = useI18n()
</script>

<style scoped>
.about-status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  color: var(--text);
  border: 1px solid rgba(0, 229, 192, 0.15);
  padding: 0.3rem 0.7rem;
  margin-bottom: 1.5rem;
}

.about-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
  animation: pulse 2.4s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1;   box-shadow: 0 0 6px var(--accent); }
  50%       { opacity: 0.5; box-shadow: 0 0 2px var(--accent); }
}
</style>