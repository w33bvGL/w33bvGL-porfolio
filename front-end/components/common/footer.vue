<script setup lang="ts">
import {useI18n} from "#i18n";

const { t, locale } = useI18n();

const { data, refresh } = await useAsyncData("footer-message", () => $fetch("/api/footer/messages/random", { method: 'GET', headers: {'Accept-Language': locale.value }, }));

watch(() => locale.value, () => {
  refresh();
});
</script>

<template>
  <div class="my-6">
    <div class="flex justify-between items-center">
      <p class="text-sm">&copy; 2022 - {{ new Date().getFullYear() }} Vahe Sargsyan. {{  data?.message }}</p>
      <div class="italic text-sm text-gray-500">
        {{  data?.randomQuote }}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
