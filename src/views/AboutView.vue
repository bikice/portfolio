<template>
  <main class="page-main" id="about">
    <h1 class="lg-heading">About <span class="text-accent">Me</span></h1>
    <h2 class="sm-heading">Let me tell you a few things</h2>

    <div class="about-grid">
      <img src="/images/portrait.jpg" alt="Kristof Kamin" class="bio-image" />

      <div class="bio-panel">
        <h3 class="text-secondary text-xl mb-3">Bio</h3>
        <ul class="list-disc list-inside text-left space-y-1 mb-4 text-gray-300">
          <li>Date of birth: 1st November, 1984</li>
          <li>Language: German, English</li>
          <li>Expert in: Web Development</li>
        </ul>
        <p class="text-gray-300 leading-relaxed">
          Since 2010 I'm on the web development department. I build modern websites and web applications.
          This also includes the mobile area. For many years I am also in the JavaScript area.
          In the past I have been working with PHP.
        </p>
      </div>
    </div>

    <!-- Skill Circles -->
    <div class="circle-container">
      <SkillCircle
        v-for="skill in skills"
        :key="skill.label"
        :label="skill.label"
        :percentage="skill.pct"
      />
    </div>
  </main>
</template>

<script setup>
import SkillCircle from '@/components/SkillCircle.vue'

const skills = [
  { label: 'CSS',       pct: 90 },
  { label: 'JS',        pct: 95 },
  { label: 'jQuery',    pct: 90 },
  { label: 'PHP',       pct: 70 },
  { label: 'SASS',      pct: 90 },
  { label: 'Java',      pct: 45 },
  { label: 'Linux',     pct: 85 },
  { label: 'Mobile',    pct: 80 },
  { label: 'MySQL',     pct: 75 },
  { label: 'Bootstrap', pct: 80 },
  { label: 'Selenium',  pct: 75 },
  { label: 'Vue',       pct: 85 },
]
</script>
