<script setup lang="ts">
const menuItems = [
  { label: 'Главная', to: '/' },
  { label: 'Контакты', to: '/contact' }
]
</script>

<template>
  <UCard class="mt-10">
    <div class="flex justify-between items-center">

      <div>
        <h1 class="text-2xl font-bold uppercase">
          w33bv.<span class="text-primary">gl</span>
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Vahe Sargsyan</p>
      </div>

      <nav class="flex gap-4">
        <ULink
            v-for="item in menuItems"
            :key="item.label"
            :to="item.to"
            class="transition-colors"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            active-class="text-primary"
        >
          {{ item.label }}
        </ULink>
      </nav>

    </div>
  </UCard>
</template>

<style scoped>
</style>
