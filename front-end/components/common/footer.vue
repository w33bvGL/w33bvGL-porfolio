<script setup lang="ts">
import { useI18n } from "#i18n";

const { t, locale } = useI18n();

const { data } = await useAsyncData("footer-message", () =>
    $fetch("/api/footer/messages/random", {
      method: 'GET',
      headers: { 'Accept-Language': locale.value },
    })
);
</script>

<template>
  <div class="my-6">
    <div class="flex justify-between items-center">
      <p class="text-sm">&copy; 2022 - {{ new Date().getFullYear() }} Vahe Sargsyan. {{ data?.translations[locale.valueOf()] || data?.translations.en }}</p>
      <div class="italic text-sm text-gray-500">
        {{ data?.translations[locale.valueOf()] || data?.translations.en }}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
