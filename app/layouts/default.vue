<script setup lang="ts">
</script>

<template>
  <div>
    <UContainer class="sm:border-x border-default max-w-4xl sm:pt-10 relative">
      <AppHeader />
      <div class="py-10">
        <slot />
      </div>
      <AppFooter />
      <div class="absolute top-0 -translate-x-19 fixed pt-4">
        <UTooltip text="Open in Github">
          <UButton icon="i-simple-icons-github" color="neutral" target="_blank" to="https://github.com/w33bvGL/w33bvGL-porfolio" />
        </UTooltip>
      </div>
    </UContainer>
  </div>
</template>
