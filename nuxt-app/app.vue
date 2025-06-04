<script setup lang="ts">
const { $gsap } = useNuxtApp()

onMounted(() => {
  $gsap.to('.box', {
    x: 100,
    duration: 1,
    ease: 'power2.out'
  })
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <CommonBackToTop/>
</template>
