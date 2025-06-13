<script setup lang="ts">

</script>

<template>
  <section class="mt-10 p-6 border border-muted/40 bg-muted/20 rounded-xl text-center shadow-sm">
    <h2 class="text-2xl font-bold mb-3">
      {{ $t('projects.haveIdea') }}
    </h2>
    <p class="text-muted text-base mb-5 max-w-xl mx-auto">
      {{ $t('projects.whatIOffer') }}
    </p>
    <UButton
      href="https://t.me/Vahesargsyan2005"
      target="_blank"
      size="lg"
      color="neutral"
    >
      {{ $t('projects.contactTelegram') }}
    </UButton>
  </section>
</template>
