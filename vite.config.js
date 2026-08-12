import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],

  resolve: {
    alias: { '@': resolve(__dirname, 'src') }
  },

  // Strip console.* and debugger statements from production bundles.
  esbuild: mode === 'production' ? { drop: ['console', 'debugger'] } : {},

  build: {
    target: 'es2019',
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/vue') || id.includes('node_modules/vue-router') || id.includes('node_modules/@vue')) {
            return 'vendor-vue'
          }
          if (id.includes('node_modules/three')) return 'vendor-three'
          if (id.includes('SkillsSection')) return 'section-skills'
          if (id.includes('CareerTimeline')) return 'section-career'
          if (id.includes('ParticleBackground')) return 'section-particle'
        },
      },
    },
  },
}))