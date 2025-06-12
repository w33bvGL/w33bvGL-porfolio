<script setup lang="ts">
const { global } = useAppConfig()
const img = useImage()
const { t } = useI18n()

const birthday = new Date(global.birthday)
const today = new Date()
const age = today.getFullYear() - birthday.getFullYear() - (
  today.getMonth() < birthday.getMonth()
  || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())
    ? 1
    : 0
)

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
    <section class="mb-10 flex gap-5 flex-col md:flex-row">
      <div class="flex-1">
        <h1 class="text-2xl font-bold tracking-tight">
          {{ $t('about.title') }}
        </h1>
        <p class="text-muted text-base">
          {{ $t('about.intro', { age }) }}
        </p>
      </div>
      <div class="hidden md:flex justify-center items-start">
        <NuxtImg
          class="rounded-xl border-2 border-muted pointer-events-none select-none"
          width="150"
          height="150"
          format="webp"
          :src="global.picture.src"
          :alt="global.picture.alt"
          :placeholder="img(global.picture.src, { h: 10, f: 'png', blur: 0.3, q: 50 })"
        />
      </div>
    </section>

    <AboutStack />

    <section class="mb-10 grid md:grid-cols-2 md:gap-5">
      <div class="mb-10 md:mb-0">
        <p class="text-base text-muted leading-relaxed">
          {{ $t('about.stack') }}
          <br><br>
          {{ $t('about.business') }}
          <br><br>
          {{ $t('about.projects') }}
          <br><br>
          {{ $t('about.approach') }}
          <br><br>
          {{ $t('about.opensource') }}
        </p>
      </div>
      <div>
        <AboutAchievements />
      </div>
    </section>
  </UPage>
</template>
