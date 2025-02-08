<script setup lang="ts">
import { ref } from 'vue'

// Состояние для открытия/закрытия модального окна
const isModalOpen = ref(false)

// Функция для открытия модального окна
const openModal = () => {
  isModalOpen.value = true
}

// Функция для закрытия модального окна
const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
  <!-- Абсолютно позиционированный блок в левом верхнем углу -->
  <div class="fixed top-1/2 left-0 transform -translate-y-1/2 z-50">
    <!-- Кнопка, которая открывает модальное окно -->
    <UButton
        class="bg-primary text-white hover:bg-primary-dark p-3 rounded-full shadow-lg"
        @click="openModal"
    >
      🌙
    </UButton>
  </div>

  <UModal v-model:show="isModalOpen" @close="closeModal">
    <template #header>
      <h2 class="text-lg font-semibold">Выберите тему сайта</h2>
    </template>
    <template #default>
      <ColorScheme>
        <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
      </ColorScheme>
    </template>
    <template #footer>
      <UButton @click="closeModal" class="bg-secondary text-white hover:bg-secondary-dark">
        Закрыть
      </UButton>
    </template>
  </UModal>
</template>

<style scoped>
/* Стиль для кнопки и модального окна */
.fixed {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
}
</style>
