<template>
  <div class="bg-gray">
    <NuxtLoadingIndicator/>
    <CommonSettings/>

      <UContainer>
        <NuxtLayout>
          <nuxtPage/>
        </NuxtLayout>
      </UContainer>

    <UModals/>
  </div>
</template>
<script setup lang="ts">
</script>