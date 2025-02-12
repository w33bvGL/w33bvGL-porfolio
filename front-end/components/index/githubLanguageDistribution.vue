<script setup lang="ts">
import {useI18n} from "#i18n";
const { t, locale } = useI18n();

const { data } = await useAsyncData("github-profile", () =>
    $fetch("/api/user/github/languages", {
      method: "GET",
      headers: { "Accept-Language": locale.value },
    })
);
</script>

<template>
  <UCard>
    <h2 class="card-title">Статистика языков GitHub</h2>
    <div>
      {{ data }}
    </div>
  </UCard>
</template>

<style scoped>
.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>
