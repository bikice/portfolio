import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: { '@': resolve(__dirname, 'src') }
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/vue') || id.includes('node_modules/vue-router') || id.includes('node_modules/@vue')) {
            return 'vendor-vue'
          }
          if (id.includes('SkillsSection')) return 'section-skills'
          if (id.includes('CareerTimeline')) return 'section-career'
          if (id.includes('ParticleBackground')) return 'section-particle'
        },
      },
    },
  },
})