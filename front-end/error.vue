<script setup>
const colorMode = useColorMode();
const { locale, t } = useI18n();
const localeRoute = useLocaleRoute();

const color = computed(() =>
    colorMode.value === 'dark' ? '#18181b' : 'white',
);

useHead({
    title: t('siteName') + ' 404 ' + t('error.pageNotFound'),
    meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { key: 'theme-color', name: 'theme-color', content: color },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: locale.value },
    ],
    htmlAttrs: {
        lang: locale.value,
    },
});
</script>

<template>
    <UCard class="h-dvh flex flex-col justify-center items-center text-center">
        <h1 class="font-bold text-9xl lg:text-[200px]">404</h1>
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-center">
            {{ t('error.pageNotFound') }} 😱
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl">
            {{ t('error.pageNotFoundDescription') }}
        </p>
        <UButton size="lg" :to="localeRoute('/')" class="mt-5">
            {{ t('error.goBackHome') }}
        </UButton>
    </UCard>
</template>
