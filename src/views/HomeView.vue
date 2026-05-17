<template>
  <main class="page-main" id="home">
    <h1 class="lg-heading mt-[20vh]">
      Kristof <span class="text-accent">Kamin</span>
    </h1>
    <h2 class="sm-heading">Web Developer, Programmer</h2>

    <div class="flex gap-5 mt-4">
      <a
        v-for="link in socials"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener"
        class="text-white hover:text-secondary transition-colors duration-300 text-2xl"
        :aria-label="link.label"
      >
        <i :class="link.icon" />
      </a>
    </div>
  </main>
</template>

<script setup>
const socials = [
  { url: 'https://www.facebook.com/BiKICE', icon: 'fab fa-facebook fa-2x', label: 'Facebook' },
  { url: 'https://www.linkedin.com/in/kristof-kamin', icon: 'fab fa-linkedin fa-2x', label: 'LinkedIn' },
  { url: 'https://www.xing.com/profile/Kristof_Kamin', icon: 'fab fa-xing fa-2x', label: 'Xing' },
  { url: 'https://github.com/bikice', icon: 'fab fa-github fa-2x', label: 'GitHub' },
  { url: 'https://codepen.io/BiKICE', icon: 'fab fa-codepen fa-2x', label: 'CodePen' },
]
</script>
