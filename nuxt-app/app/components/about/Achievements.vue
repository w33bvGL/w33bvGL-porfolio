<script setup lang="ts">
import type { Achievement, TranslatedAchievements } from '~/types/achievements'

const { locale } = useI18n()

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
  <section class="py-10">
    <h2 class="text-2xl sm:text-3xl font-bold text-highlighted mb-6">
      📈 Мои достижения
    </h2>

    <div class="space-y-4 border-l-2 border-muted pl-6 relative">
      <div
        v-for="(item, index) in achievements"
        :key="index"
        class="relative"
      >
        <div class="absolute -left-[9px] top-[6px] w-3 h-3 rounded-full bg-primary border-2 border-background" />
        <div class="text-sm text-muted font-mono">
          {{ item.year }}
        </div>
        <div class="text-base sm:text-lg text-balance text-foreground">
          {{ item.description }}
        </div>
      </div>
    </div>
  </section>
</template>
