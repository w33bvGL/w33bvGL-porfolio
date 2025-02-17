<script setup lang="ts">
const { t } = useI18n();
const localeRoute = useLocaleRoute();
</script>

<template>
    <UCard class="mt-5">
        <section class="text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
                {{ t('contactUs.title') }}
            </h2>

            <p class="text-gray-600 dark:text-gray-400 mb-6">
                <span v-html="t('contactUs.description')"></span>
            </p>

            <UButton
                size="xl"
                class="px-8 text-white bg-primary hover:bg-primary-dark rounded-xl"
                :to="localeRoute('/contact')"
            >
                {{ t('contactUs.contact') }}
            </UButton>
        </section>
    </UCard>
</template>

<style scoped></style>
