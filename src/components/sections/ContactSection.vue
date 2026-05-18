<template>
  <SectionCard id="contact">
    <div class="section-label reveal">{{ t.contact.label }}</div>
    <h2 class="section-title reveal">{{ t.contact.title }} <span class="accent">{{ t.contact.titleAccent }}</span></h2>

    <div class="contact-layout">
      <div class="reveal">
        <p class="contact-blurb">{{ t.contact.blurb }}</p>
        <a href="mailto:info@kristof-kamin.de" class="contact-email-link">
          <IconMail :size="13" />
          info@kristof-kamin.de
        </a>
      </div>

      <form class="contact-form reveal" @submit.prevent="sendMessage">
        <div class="form-group">
          <label class="form-label" for="f-name">{{ t.contact.nameLabel }}</label>
          <input id="f-name" v-model="form.name" class="form-input"
                 type="text" :placeholder="t.contact.namePlaceholder" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-email">{{ t.contact.emailLabel }}</label>
          <input id="f-email" v-model="form.email" class="form-input"
                 type="email" :placeholder="t.contact.emailPlaceholder" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="f-msg">{{ t.contact.messageLabel }}</label>
          <textarea id="f-msg" v-model="form.message" class="form-textarea"
                    rows="5" :placeholder="t.contact.messagePlaceholder" required />
        </div>

        <p v-if="formStatus" class="form-status" :class="formStatus.type">
          {{ formStatus.text }}
        </p>

        <button class="btn-send" type="submit" :disabled="sending">
          <span class="btn-send-text">{{ sending ? t.contact.sending : t.contact.send }}</span>
        </button>
      </form>
    </div>
  </SectionCard>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { IconMail }      from '@/icons/index.js'
import SectionCard       from '@/components/layout/SectionCard.vue'
import { useI18n }       from '@/composables/useI18n.js'

const { t } = useI18n()

const form       = reactive({ name: '', email: '', message: '' })
const formStatus = ref(null)
const sending    = ref(false)

async function sendMessage() {
  sending.value    = true
  formStatus.value = null

  try {
    const res = await fetch('/mail.php', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name: form.name, email: form.email, message: form.message }),
    })

    const data = await res.json()

    if (data.ok) {
      formStatus.value = {
        type: 'success',
        text: t.value.contact.successMsg(form.name),
      }
      form.name = form.email = form.message = ''
      setTimeout(() => { formStatus.value = null }, 6000)
    } else {
      throw new Error(data.error ?? 'unknown')
    }
  } catch {
    formStatus.value = {
      type: 'error',
      text: t.value.contact.errorMsg,
    }
  } finally {
    sending.value = false
  }
}
</script>