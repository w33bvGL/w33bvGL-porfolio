<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCookie } from 'nuxt/app';

const isSettingsOpen = ref(false);

const selectedPrimary = ref(useCookie('selectedPrimary').value || 'lime');
const selectedGray = ref(useCookie('selectedGray').value || 'neutral');

const themeOptions = [
  { name: 'Системная', value: 'system' },
  { name: 'Светлая', value: 'light' },
  { name: 'Тёмная', value: 'dark' }
];

const primaryColors = [
  { name: 'Лайм', value: 'lime' },
  { name: 'Синий', value: 'blue' },
  { name: 'Красный', value: 'red' },
  { name: 'Пурпурный', value: 'purple' }
];

const grayColors = [
  { name: 'Нейтральный', value: 'neutral' },
  { name: 'Каменный', value: 'stone', disabled: true },
  { name: 'Холодный серый', value: 'coolGray', disabled: true }
];

watch([selectedPrimary, selectedGray], () => {
  useCookie('selectedPrimary').value = selectedPrimary.value;
  useCookie('selectedGray').value = selectedGray.value;

  useAppConfig().ui.primary = selectedPrimary.value;
  useAppConfig().ui.gray = selectedGray.value;
});

</script>

<template>
  <div class="fixed top-1/2 right-0 px-5 transform -translate-y-1/2 z-50">
    <UButton
        size="md"
        class="rounded-lg p-2"
        @click="isSettingsOpen = true"
    >
      <UIcon name="i-heroicons-cog-6-tooth" class="w-6 h-6" />
    </UButton>
  </div>

  <UModal v-model="isSettingsOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6">
            Настройки
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isSettingsOpen = false" />
        </div>
      </template>
      <template #default>
        <div class="mb-4">
          <div class="mb-2 text-sm font-medium">Выберите тему</div>
          <ColorScheme>
            <USelect v-model="$colorMode.preference" :options="themeOptions" option-attribute="name" />
          </ColorScheme>
        </div>

        <div class="mb-4">
          <div class="mb-2 text-sm font-medium">Выберите основной цвет</div>
          <USelect v-model="selectedPrimary" :options="primaryColors" option-attribute="name" />
        </div>

        <div class="mb-4">
          <div class="mb-2 text-sm font-medium">Выберите цветовую палитру</div>
          <USelect v-model="selectedGray" :options="grayColors" option-attribute="name" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style scoped>
</style>
