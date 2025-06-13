<script setup lang="ts">
import type { TranslatedExperiences, Experience } from '~/types/experience'

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

const { experienceString } = useExperienceString()
</script>

<template>
  <section class="mb-10">
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
            <hr class="w-full opacity-50 hidden lg:block">
            <span class="text-muted text-nowrap hidden md:block">
              {{ exp.period }}
            </span>
            <span class="text-muted text-nowrap md:hidden">
              {{ exp.year }}
            </span>
          </div>
          <h3 class="text-xl font-semibold">
            {{ exp.title }}
          </h3>
          <p class="text-base text-muted text-sm line-clamp-2">
            {{ exp.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
