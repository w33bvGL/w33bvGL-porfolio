<script setup lang="ts">
import * as locales from '@nuxt/ui-pro/locale'
import AppIcons from '~/components/AppIcons.vue'

const colorMode = useColorMode()
const { locale } = useI18n()
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

useSeoMeta({
  ogImage: '/avatar-og.jpg',
  twitterImage: '/avatar-og.jpg',
  twitterCard: 'summary'
})
</script>

<template>
  <UApp
    :locale="locales[locale]"
    :toaster="{ expand: false }"
  >
    <NuxtLoadingIndicator
      color="var(--loading-indicator)"
      :height="2"
    />
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
  </UApp>

  <AppIcons />
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
