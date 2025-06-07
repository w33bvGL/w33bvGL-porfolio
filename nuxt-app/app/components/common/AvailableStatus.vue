<script setup lang="ts">
const { global } = useAppConfig()
const { t } = useI18n()
const isAvailable = global.available
</script>

<template>
  <div
    class="inline-flex items-center gap-2 text-sm font-medium transition-all text-muted">
    <span
      class="relative flex h-3 w-3"
      :class="isAvailable ? 'text-green-500' : 'text-red-500'"
    >
      <span
        class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        :class="isAvailable ? 'bg-green-400' : 'bg-red-400'"
      ></span>
      <span
        class="relative inline-flex rounded-full h-3 w-3"
        :class="isAvailable ? 'bg-green-500 shadow-green-500/60' : 'bg-red-500 shadow-red-500/60'"
        style="box-shadow: 0 0 8px currentColor;"
      ></span>
    </span>

    <span>
      {{ isAvailable ? t('availability.available') : t('availability.unavailable') }}
    </span>
  </div>
</template>
