<template>
  <SectionCard id="contact">
    <div class="section-label reveal">Get in touch</div>
    <h2 class="section-title reveal">Let's <span class="accent">Talk</span></h2>

    <div class="contact-layout">
      <div class="reveal">
        <p class="contact-blurb">
          Whether you have a project in mind, a question, or just want to connect —
          I'm always happy to hear from you. Drop me a message or reach out directly
          by email.
        </p>
        <a href="mailto:info@kristof-kamin.de" class="contact-email-link">
          <IconMail :size="13" />
          info@kristof-kamin.de
        </a>
      </div>

      <form class="contact-form reveal" @submit.prevent="sendMessage">
        <div class="form-group">
          <label class="form-label" for="f-name">Name</label>
          <input id="f-name" v-model="form.name" class="form-input"
                 type="text" placeholder="Your name" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-email">Email</label>
          <input id="f-email" v-model="form.email" class="form-input"
                 type="email" placeholder="your@email.com" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-msg">Message</label>
          <textarea id="f-msg" v-model="form.message" class="form-textarea"
                    rows="5" placeholder="Your message…" required />
        </div>

        <p v-if="formStatus" class="form-status" :class="formStatus.type">
          {{ formStatus.text }}
        </p>

        <button class="btn-send" type="submit">
          <span class="btn-send-text">Send Message →</span>
        </button>
      </form>
    </div>
  </SectionCard>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { IconMail }      from '@/icons/index.js'
import SectionCard       from '@/components/layout/SectionCard.vue'

const form       = reactive({ name: '', email: '', message: '' })
const formStatus = ref(null)

function sendMessage() {
  formStatus.value = {
    type: 'success',
    text: `Thanks ${form.name}! Your message was sent. I'll get back to you soon.`,
  }
  form.name = form.email = form.message = ''
  setTimeout(() => { formStatus.value = null }, 6000)
}
</script>