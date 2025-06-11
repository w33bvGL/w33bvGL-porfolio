<script setup lang="ts">
const { global } = useAppConfig()
const { t } = useI18n()
const { footer } = useAppConfig()
const img = useImage()

const resumeOptions = computed(() => [
  { label: t('cta.resumeRu'), value: 'ru' },
  { label: t('cta.resumeEn'), value: 'en' }
])

function downloadResume(lang: string) {
  const fileName = lang === 'ru' ? 'resume-ru.pdf' : 'resume-en.pdf'
  const filePath = `/resumes/${fileName}`

  const link = document.createElement('a')
  link.href = filePath
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <UPageCTA
    :description="t('cta.description')"
    variant="naked"
    :ui="{ links: 'mt-5 flex flex-col space-y-3', container: 'p-0 sm:p-5 md:py-0 lg:py-0 px-0 sm:px-5 mb-10' }"
  >
    <template #title>
      <div>
        <div class="mb-5">
          <div class="flex items-center justify-center">
            <NuxtImg
              :src="global.picture.src"
              :alt="global.picture.alt"
              width="110"
              height="110"
              format="webp"
              class="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-1 border-muted shadow-xl"
              :placeholder="img(global.picture.src, { h: 10, f: 'png', blur: 0.3, q: 50 })"
            />
          </div>
        </div>
        <h2 class="text-3xl sm:text-4xl text-pretty tracking-tight font-bold text-highlighted text-center">
          {{ t('cta.title') }}
        </h2>
      </div>
    </template>

    <template #links>
      <div class="flex items-center justify-center gap-5">
        <USelect
          variant="subtle"
          :items="resumeOptions"
          :placeholder="t('cta.downloadPlaceholder')"
          @update:model-value="downloadResume"
        />
        <CommonAvailableStatus />
      </div>
      <div class="flex items-center justify-center gap-3">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ size: 'lg', color: 'neutral', variant: 'soft', ...link }"
        />
      </div>
    </template>
  </UPageCTA>
</template>
