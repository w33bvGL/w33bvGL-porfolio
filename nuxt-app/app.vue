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
  <div class="box w-20 h-20 bg-red-500">
    цвцв
  </div>
</template>
