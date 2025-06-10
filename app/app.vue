<script setup lang="ts">
import * as locales from '@nuxt/ui-pro/locale'

const colorMode = useColorMode()
const { locale, t } = useI18n()
const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: locale.value
  }
})

// useSeoMeta({
//   titleTemplate: 'Nuxt Portfolio Template',
//   ogImage: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3BvcnRmb2xpby10ZW1wbGF0ZS5udXh0LmRldiIsImlhdCI6MTc0NTkzNDczMX0.XDWnQoyVy3XVtKQD6PLQ8RFUwr4yr1QnVwPxRrjCrro.jpg?theme=light',
//   twitterImage: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3BvcnRmb2xpby10ZW1wbGF0ZS5udXh0LmRldiIsImlhdCI6MTc0NTkzNDczMX0.XDWnQoyVy3XVtKQD6PLQ8RFUwr4yr1QnVwPxRrjCrro.jpg?theme=light',
//   twitterCard: 'summary_large_image'
// })
</script>

<template>
  <UApp
    :locale="locales[locale]"
    :toaster="{ expand: false }"
  >
    <NuxtLoadingIndicator
      color="var(--ui-primary)"
      :height="2"
    />
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
  </UApp>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
