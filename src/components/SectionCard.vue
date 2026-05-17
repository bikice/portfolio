<template>
  <section :id="id" class="section-z">
    <div class="section-inner">
      <div class="section-card">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  /** Maps to the HTML id, used for anchor navigation */
  id: { type: String, required: true },
})
</script>