<script setup lang="ts">
const { t } = useI18n()

const age = getAge()
const title = t('about.title')
const description = t('about.intro', { age })

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
    <AboutHeading />
    <AboutStack />

    <section class="mb-10 grid md:grid-cols-2 md:gap-5">
      <div class="mb-10 md:mb-0">
        <About />
      </div>
      <div>
        <AboutAchievements />
      </div>
    </section>
  </UPage>
</template>
