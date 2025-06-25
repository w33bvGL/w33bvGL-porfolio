<script setup lang="ts">
const { global } = useAppConfig()
</script>

<template>
  <div class="absolute top-0 lg:-translate-x-19 fixed pt-4">
    <UTooltip :text="$t('openInGithub')">
      <UButton icon="i-simple-icons-github" color="neutral" target="_blank" :to="global.projectRepository" />
    </UTooltip>
  </div>
</template>

<style scoped>

</style>
