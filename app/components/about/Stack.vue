<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const { data: techs } = await useAsyncData('technologies', () =>
  $fetch('/api/technologies')
)

const tabs = [
  { label: 'Фронтенд', slot: 'frontend', icon: 'i-lucide-monitor' },
  { label: 'Бэкенд', slot: 'backend', icon: 'i-lucide-server' },
  { label: 'Инструменты', slot: 'tools', icon: 'i-lucide-wrench' }
] satisfies TabsItem[]
</script>

<template>
  <section class="mb-10">
    <UTabs
      :items="tabs"
      class="w-full"
      color="neutral"
      size="sm"
    >
      <template #frontend>
        <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 bg-neutral-800/5 dark:bg-neutral-800/70 py-4 rounded-xl grid-rows-4 sm:grid-rows-3 md:grid-rows-2">
          <div
            v-for="tech in techs?.frontend || []"
            :key="tech.name"
            class="flex flex-col items-center gap-2 text-center"
          >
            <img
              :src="tech.icon"
              :alt="tech.name"
              class="w-[50px] h-[50px]"
            >
            <span class="text-xs text-muted">{{ tech.name }}</span>
          </div>
        </div>
      </template>

      <template #backend>
        <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 bg-neutral-800/5 dark:bg-neutral-800/70 py-4 rounded-xl grid-rows-4 sm:grid-rows-3 md:grid-rows-2">
          <div
            v-for="tech in techs?.backend || []"
            :key="tech.name"
            class="flex flex-col items-center gap-2 text-center"
          >
            <img
              :src="tech.icon"
              :alt="tech.name"
              class="w-[50px] h-[50px]"
            >
            <span class="text-xs text-muted">{{ tech.name }}</span>
          </div>
        </div>
      </template>

      <template #tools>
        <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 bg-neutral-800/5 dark:bg-neutral-800/70 py-4 rounded-xl grid-rows-4 sm:grid-rows-3 md:grid-rows-2">
          <div
            v-for="tool in techs?.tools || []"
            :key="tool.name"
            class="flex flex-col items-center gap-2 text-center"
          >
            <img
              :src="tool.icon"
              :alt="tool.name"
              class="w-[50px] h-[50px]"
            >
            <span class="text-xs text-muted">{{ tool.name }}</span>
          </div>
        </div>
      </template>
    </UTabs>
  </section>
</template>
