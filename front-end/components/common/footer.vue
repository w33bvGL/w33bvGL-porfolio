<script setup lang="ts">
const { data } = await useAsyncData("footer", () => $fetch("/api/footer"));
</script>

<template>
  <div class="my-6">
    <div class="flex justify-between items-center">
      <p class="text-sm">&copy; 2022 - {{ new Date().getFullYear() }} Vahe Sargsyan. {{  data?.randomFooterMessage }}</p>
      <div class="italic text-sm text-gray-500">
        {{  data?.randomQuote }}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
