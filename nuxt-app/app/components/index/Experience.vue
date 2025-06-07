<script setup lang="ts">
import type { TranslatedExperiences, Experience } from '~/types/experience'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const { t, tm } = useI18n()
const locale = useI18n().locale.value

const { data: experienceByLang } = await useAsyncData<TranslatedExperiences>('experiences', () =>
  $fetch('/api/experiences')
)

const experiences = computed<Experience[]>(() => {
  if (!experienceByLang.value) return []
  if (locale in experienceByLang.value) {
    return experienceByLang.value[locale as keyof TranslatedExperiences]
  }
  return []
})

function getExperience(startDate: string): { years: number; months: number } {
  const start = new Date(startDate)
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  return { years, months }
}

const experience = getExperience('2021-03-01')

const experienceString = computed(() => {
  const y = experience.years
  const m = experience.months

  function declOfNum(number: number, words: [string, string, string]): string {
    const cases: [number, number, number, number, number, number] = [2, 0, 1, 1, 1, 2]
    const mod100 = number % 100
    const mod10 = number % 10
    const index: 0 | 1 | 2 =
      mod100 > 4 && mod100 < 20 ? 2 : cases[(mod10 < 5 ? mod10 : 5)] as 0 | 1 | 2
    return words[index]
  }

  const yearsWords = tm('experience.years') as [string, string, string]
  const monthsWords = tm('experience.months') as [string, string, string]


  const yearsWord = declOfNum(y, yearsWords)
  const monthsWord = declOfNum(m, monthsWords)

  let result = ''
  if (y > 0) result += `${y} ${yearsWord}`
  if (m > 0) result += (result ? ' ' : '') + `${m} ${monthsWord}`
  if (!result) result = t('experience.lessThanMonth')

  return result
})
</script>

<template>
  <UPageSection
    :ui="{
      container: '!pt-0 lg:grid lg:grid-cols-2 lg:gap-5 py-0 sm:px-0 sm:py-0 lg:py-0 gap-5 sm:gap-5 px-0 sm:px-0 lg:px-0 lg:pb-10'
    }"
  >
    <div class="col-span-2 space-y-5">
      <UiPageHeader
        :title="`${$t('experience.title')} — ${experienceString}`"
        :description="$t('experience.description')"
      />
      <ul class="space-y-5">
        <li
          v-for="(exp, index) in experiences"
          :key="index"
          class="border-l-3 border-muted pl-4"
        >
          <div class="text-sm text-muted flex flex-row justify-between mb-2 items-center gap-5">
            <span class="font-medium text-black dark:text-white text-nowrap">
              {{ exp.company }}
            </span>
            <hr class="w-full opacity-50" />
            <span class="text-muted text-nowrap">
              {{ exp.period }}
            </span>
          </div>
          <h3 class="text-xl font-semibold">{{ exp.title }}</h3>
          <p class="text-base text-muted text-sm">{{ exp.description }}</p>
        </li>
      </ul>
    </div>
  </UPageSection>
</template>
