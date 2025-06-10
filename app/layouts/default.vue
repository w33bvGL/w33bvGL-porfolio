<script setup lang="ts">
</script>

<template>
  <div>
    <UContainer class="sm:border-x border-default max-w-4xl sm:pt-10">
      <AppHeader />
      <div class="py-10">
        <slot />
      </div>
      <AppFooter />
    </UContainer>
  </div>
</template>
