<script setup lang="ts">
</script>

<template>
    <CommonSettings/>

      <UContainer>
        <NuxtLayout>
          <nuxtPage/>
        </NuxtLayout>

        <commonFooter/>
      </UContainer>

    <UModals/>
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