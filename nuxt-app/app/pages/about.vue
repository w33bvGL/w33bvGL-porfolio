<script setup lang="ts">
const { global } = useAppConfig()

const birthday = new Date(global.birthday)
const today = new Date()
const age = today.getFullYear() - birthday.getFullYear() - (
  today.getMonth() < birthday.getMonth()
  || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())
    ? 1
    : 0
)
</script>

<template>
  <UPage>
    <section class="py-10 flex gap-5 flex-col md:flex-row">
      <div class="flex-1">
        <h1 class="text-3xl sm:text-4xl text-pretty tracking-tight font-bold text-highlighted">
          Обо мне
        </h1>
        <p class="text-base sm:text-lg text-balance text-muted mt-3">
          {{ $t('about.intro', { age }) }}
        </p>
      </div>
      <div class="flex justify-center items-start">
        <NuxtImg
          class="rounded-xl border-2 border-muted max-w-[150px] pointer-events-none select-none"
          :src="global.picture.src"
          :alt="global.picture.alt"
        />
      </div>
    </section>

    <AboutStack/>

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
