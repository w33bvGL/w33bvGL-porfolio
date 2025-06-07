<script setup lang="ts">
</script>

<template>
  <div>
    <UContainer class="sm:border-x border-default max-w-4xl pt-10">
      <AppHeader/>
      <slot />
      <AppFooter />
    </UContainer>
  </div>
</template>
