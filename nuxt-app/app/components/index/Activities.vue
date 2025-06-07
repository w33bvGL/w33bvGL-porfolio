<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold">{{ t('activities.title') }}</h2>
    <ul class="list-disc pl-5 text-muted text-sm space-y-1">
      <li>{{ t('activities.line1') }}</li>
      <li>{{ t('activities.line2') }}</li>
    </ul>
  </div>
</template>
