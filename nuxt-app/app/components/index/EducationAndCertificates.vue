<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import type {Education, TranslatedEducation} from "~/types/education";
const { t, locale } = useI18n()

const { data: educationByLang } = await useAsyncData<TranslatedEducation>('education', () =>
  $fetch('/api/education')
)

const educations = computed<Education[]>(() => {
  if (!educationByLang.value) return []
  if (locale.value in educationByLang.value) {
    return educationByLang.value[locale.value as keyof TranslatedEducation]
  }
  return []
})
</script>

<template>
  <div class="space-y-5">
    <UiPageHeader
      :title="t('education.title')"
      :description="t('education.description')"
    />

    <div class="space-y-4">
      <div
        v-for="(item, index) in educations"
        :key="'edu-' + index"
        class="rounded-xl bg-muted/40 p-4 shadow-sm"
      >
        <h4 class="font-semibold text-base text-foreground">
          {{ item.title }}
        </h4>
        <p class="text-sm text-muted-foreground">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

