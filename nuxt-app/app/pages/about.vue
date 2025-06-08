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
        Привет! Меня зовут <strong>Vahe</strong> (в сети можно найти как <strong>w33bvGL</strong>) — я Full-Stack разработчик из Армении. Мне {{ age }} лет, и я уже успел поработать над десятками реальных проектов — от лендингов до сложных микросервисных систем.
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
  <AboutAchievements />
  </UPage>
</template>
