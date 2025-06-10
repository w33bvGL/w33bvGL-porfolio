<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter
    :ui="{ left: 'text-xs mt-0', container: 'px-0 md:px-0 lg:px-0 flex flex-row-reverse lg:flex-row w-full justify-between' }"
  >
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          class="hidden md:block"
          v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>

      <div>
        <CommonLanguageSwitcher />
      </div>
    </template>
  </UFooter>
</template>
