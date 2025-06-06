<script setup lang="ts">
const { $ScrollSmoother } = useNuxtApp()

onMounted(() => {
  $ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 3.5,
    effects: true
  })
})
</script>

<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>

  <CommonCursor />
  <CommonBackToTop />
</template>
