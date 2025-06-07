<script setup lang="ts">
import { useI18n, useLocalePath } from '#imports'
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()
const { locale } = useI18n()

const links = computed<NavigationMenuItem[]>(() => {
  const loc = locale.value
  const localizedPath = (path: string) => (loc !== 'en' ? `/${loc}${path}` : path)

  return [
    {
      label: t('routes.home'),
      icon: 'i-lucide-home',
      to: localizedPath('/')
    },
    {
      label: t('routes.projects'),
      icon: 'i-lucide-folder',
      to: localizedPath('/projects')
    },
    {
      label: t('routes.blog'),
      icon: 'i-lucide-file-text',
      to: localizedPath('/blog')
    },
    {
      label: t('routes.about'),
      icon: 'i-lucide-user',
      to: localizedPath('/about')
    }
  ]
})
</script>



<template>
  <div class="sticky z-50 top-2 sm:top-4 mx-auto justify-center flex">
    <UNavigationMenu
      :items="links"
      variant="link"
      color="neutral"
      class="bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
    >
      <template #list-trailing>
        <CommonColorModeButton />
      </template>
    </UNavigationMenu>
  </div>
</template>
