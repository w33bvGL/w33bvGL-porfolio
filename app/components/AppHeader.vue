<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from '#imports'

const { t, locale } = useI18n()
const route = useRoute()

const localizedPath = (path: string) => {
  return locale.value !== 'en' ? `/${locale.value}${path}` : path
}

const links = computed(() => [
  {
    key: 'home',
    icon: 'i-lucide-home',
    to: localizedPath('/')
  },
  {
    key: 'projects',
    icon: 'i-lucide-folder',
    to: localizedPath('/projects')
  },
  {
    key: 'shop',
    icon: 'i-lucide-shopping-cart',
    to: localizedPath('/shop')
  },
  {
    key: 'about',
    icon: 'i-lucide-user',
    to: localizedPath('/about')
  }
])

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<template>
  <header class="sticky z-50 top-2 sm:top-5 flex justify-center">
    <nav
      class="flex gap-3 sm:gap-2 bg-muted/80 backdrop-blur-sm rounded-full px-4 py-2 border border-muted/50 shadow-lg shadow-neutral-950/5"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.key"
        :to="link.to"
        class="flex"
      >
        <UButton
          :variant="isActive(link.to) ? 'solid' : 'link'"
          color="neutral"
          class="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full"
        >
          <UIcon
            :name="link.icon"
            class="w-4 h-4"
          />
          <span class="hidden sm:inline">{{ t(`routes.${link.key}`) }}</span>
        </UButton>
      </NuxtLink>

      <!-- Переключатель темы -->
      <div class="flex items-center">
        <CommonColorModeButton />
      </div>
    </nav>
  </header>
</template>
