<template>
  <div class="legal-page">
    <div class="legal-inner">

      <RouterLink :to="{path: '/home', hash: '#contact'}" class="legal-back">
        {{ t.imprint.back }}
      </RouterLink>

      <div class="section-card legal-card">

        <h1 class="legal-h1"><span class="accent">{{ t.imprint.title }}</span></h1>

        <div
            v-for="(section, i) in t.imprint.sections"
            :key="i"
            class="legal-section"
        >
          <h2 class="legal-h2">{{ section.heading }}</h2>
          <p
              v-for="(para, j) in section.paragraphs"
              :key="j"
              class="legal-p"
              v-html="para"
          />
        </div>

      </div>

    </div>

    <div class="legal-mini-footer">
      <RouterLink to="/home">{{ t.imprint.miniFooterPortfolio }}</RouterLink>
      <span style="color:var(--muted)">·</span>
      <RouterLink to="/data-protection">{{ t.imprint.miniFooterDataProtect }}</RouterLink>
      <span style="color:var(--muted)">·</span>
      <span>© {{ new Date().getFullYear() }} Kristof Kamin</span>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '@/composables/useI18n.js'
const { t } = useI18n()
</script>

<style scoped>
.legal-card {
  padding: 3rem 3.5rem;
}

@media (max-width: 768px) {
  .legal-card { padding: 2rem 1.5rem; }
}

.legal-section:last-child {
  margin-bottom: 0;
}
</style>