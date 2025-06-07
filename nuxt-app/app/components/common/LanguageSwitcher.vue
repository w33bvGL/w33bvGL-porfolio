<script setup lang="ts">
import { en, ru, hy } from '@nuxt/ui/locale'
const { locale } = useI18n()
const route = useRoute()

const onLocaleChange = (newLocale: string) => {
  locale.value = newLocale as 'en' | 'ru' | 'hy'

  const newPrefix = newLocale !== 'en' ? `/${newLocale}` : ''
  const currentPathWithoutLocale = route.fullPath.replace(/^\/(en|ru|hy)(\/|$)/, '/')

  const newPath = `${newPrefix}${currentPathWithoutLocale}`
  navigateTo(newPath)
}
</script>

<template>
  <ULocaleSelect
    variant="soft"
    v-model="locale"
    size="xs"
    :locales="[en, ru, hy]"
    @update:model-value="onLocaleChange"
  />
</template>
