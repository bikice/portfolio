<template>
  <div class="skill-circle">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <!-- Background ring -->
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        stroke="#3a3a3a"
        :stroke-width="strokeWidth"
      />
      <!-- Progress arc -->
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        stroke="#2a9df4"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90, {{ center }}, {{ center }})"
        :style="{
          transform: `rotate(-90deg)`,
          transformOrigin: `${center}px ${center}px`,
          transition: 'stroke-dashoffset 1s ease-in-out'
        }"
      />
    </svg>
    <span class="skill-label text-sm font-mono font-semibold text-secondary">{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  percentage: { type: Number, required: true },
  size: { type: Number, default: 130 },
  strokeWidth: { type: Number, default: 16 },
})

const center = computed(() => props.size / 2)
const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() =>
  circumference.value - (props.percentage / 100) * circumference.value
)
</script>
