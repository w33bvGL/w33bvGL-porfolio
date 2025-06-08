<script setup lang="ts">
import type { Achievement, TranslatedAchievements } from '~/types/achievements'

const { locale, t } = useI18n()

const { data: achievementsByLang } = await useAsyncData<TranslatedAchievements>('achievement', () =>
  $fetch('/api/achievements')
)

const achievements = computed<Achievement[]>(() => {
  if (!achievementsByLang.value) return []
  if (locale.value in achievementsByLang.value) {
    return achievementsByLang.value[locale.value as keyof TranslatedAchievements]
  }
  return []
})
</script>

<template>
  <section class="mb-10 space-y-5">
    <UiPageHeader
      :title="t('achievements.title')"
      :description="t('achievements.description')"
    />
    <div class="space-y-3 border-l-3 border-muted pl-4 relative">
      <div
        v-for="(item, index) in achievements"
        :key="index"
        class="relative"
      >
        <div class="text-sm text-muted font-mono">
          {{ item.year }}
        </div>
        <p class="font-semibold text-base">
          {{ item.description }}
        </p>
      </div>
    </div>
  </section>
</template>
