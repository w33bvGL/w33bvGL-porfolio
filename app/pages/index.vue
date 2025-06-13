<script setup lang="ts">
const { t } = useI18n()

const title = t('cta.title')
const description = t('cta.description')

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,

  twitterTitle: title,
  twitterDescription: description
})
</script>

<template>
  <UPage>
    <IndexCta />
    <IndexExperience />

    <section class="grid md:grid-cols-2 md:gap-5">
      <div class="mb-10 md:mb-0">
        <IndexEducationAndCertificates />
      </div>
      <div>
        <IndexActivities />
      </div>
    </section>
  </UPage>
</template>
