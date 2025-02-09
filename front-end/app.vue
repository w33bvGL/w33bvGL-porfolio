<script setup lang="ts">
import {useColorMode} from "#imports";

const colorMode =  useColorMode();

const color = computed(() =>
    colorMode.value === 'dark' ? '#18181b' : 'white',
);
</script>

<template>
    <CommonSettings/>
    <CommonSocial/>

      <UContainer>
        <NuxtLayout>
          <nuxtPage/>
        </NuxtLayout>

        <commonFooter/>
      </UContainer>

    <UModals/>
    <UNotifications/>
</template>


<style>
::-webkit-scrollbar {
  @apply w-1;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(var(--color-primary-400));
  cursor: pointer;
}


::-webkit-scrollbar-thumb:hover {
  background-color: rgb(var(--color-primary-500));
}
</style>