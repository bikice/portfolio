<template>
  <main class="page-main relative" id="work">
    <h1 class="lg-heading">My <span class="text-accent">Work</span></h1>
    <h2 class="sm-heading">Check out some of my curriculum vitae</h2>

    <ul class="timeline">
      <li
        v-for="entry in timeline"
        :key="entry.company"
        class="timeline-entry"
        :class="entry.side"
      >
        <div class="entry-wrapper">
          <span class="flag">{{ entry.company }}</span>
          <span class="date-tag">{{ entry.period }}</span>
          <span class="entry-desc">{{ entry.description }}</span>
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup>
const timeline = [
  {
    company: 'Open-Xchange AG',
    period: '2017 – present',
    description: 'Web Application Developer — Developing a RIA Office Suite and a cloud based storage',
    side: 'right',
  },
  {
    company: 'motory GmbH',
    period: '2014 – 2017',
    description: 'Full Stack Developer — Developing a Social media platform',
    side: 'left',
  },
  {
    company: 'onitec Werbeagentur GmbH & Co. KG',
    period: '2012 – 2014',
    description: 'Full Stack Developer — Development of Websites, Webshops and Webapplications. Also Linux administration and networking.',
    side: 'right',
  },
  {
    company: 'Freelancer',
    period: '2008 – present',
    description: 'Web Developer — Development of Websites and Webshops',
    side: 'left',
  },
  {
    company: 'Jade Hochschule',
    period: '2008 – 2014',
    description: 'Bachelor of Science: Economic Computer Science',
    side: 'right',
  },
  {
    company: 'Hermes Logistik Bremen',
    period: '2006 – 2009',
    description: 'Creating maps for package delivery',
    side: 'left',
  },
  {
    company: 'Rheinmetall Defence Electronics GmbH',
    period: '2004 – 2005',
    description: 'IT specialist — Remote control for power plant simulator, parts of a tactical navigation system and an interface to a mobile robot',
    side: 'right',
  },
  {
    company: 'Rheinmetall Defence Electronics GmbH',
    period: '2001 – 2004',
    description: 'Education: IT specialist for application development',
    side: 'left',
  },
]
</script>
