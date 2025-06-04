<script setup lang="ts">
const { $gsap } = useNuxtApp()

onMounted(() => {
  $gsap.to('.error__code', {
    scale: 1.1,
    duration: 1,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1
  })

  if (window.console) {
    console.log('%cПривет, разработчик!', 'color: #42b983; font-size: 18px;')
    console.log('Если ты читаешь это — мы точно на одной волне 👨‍💻')
  }
})
</script>

<template>
  <div class="error container-md">
    <h1 class="error__code text-primary">
      404
    </h1>
    <h2 class="error__title">
      Опа... Такой страницы нет
    </h2>
    <UiHr />
    <p class="error__desc text-neutral-500">
      Возможно, она была. Возможно, её и не существовало.<br>
      Но ты уже зашёл далеко — возвращайся на главную, там красиво ✨
    </p>
    <NuxtLinkLocale to="/">
      <UiButton
        class="error__link"
        variant="primary"
      >
        На главную
      </UiButton>
    </NuxtLinkLocale>
  </div>

  <CommonCursor />
</template>

<style scoped lang="scss">
.error {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
}

.error__code {
  font-size: 12rem;
  margin-bottom: 1.5rem;
  font-weight: 900;
  line-height: 1;
}

.error__title {
  font-size: 2.75rem;
  font-weight: 600;
  margin: 0;
}

.error__desc {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}
</style>
