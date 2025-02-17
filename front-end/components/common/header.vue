<script setup lang="ts">
const localeRoute = useLocaleRoute();
const { t, locale } = useI18n();

let menuItems = [
    { label: t('menu.home'), to: '/' },
    { label: t('menu.contact'), to: '/contact' },
];

watch(
    () => locale.value,
    () => {
        menuItems = [
            { label: t('menu.home'), to: '/' },
            { label: t('menu.contact'), to: '/contact' },
        ];
    },
);
</script>

<template>
    <UCard class="mt-10">
        <div class="flex justify-between items-center">
            <div>
                <ULink :to="localeRoute('/')">
                    <div class="flex gap-2 items-center">
                        <UiLogo />
                        <div>
                            <h1 class="text-2xl font-bold uppercase">
                                {{ t('site.brand') }}.<span
                                    class="text-primary"
                                    >{{ t('site.domain') }}</span
                                >
                            </h1>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                {{ t('name') + ' ' + t('surname') }}
                            </p>
                        </div>
                    </div>
                </ULink>
            </div>

            <nav class="flex gap-4 items-center">
                <ULink
                    v-for="item in menuItems"
                    :key="item.label"
                    :to="localeRoute(item.to)"
                    class="transition-colors"
                    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    active-class="text-primary"
                >
                    {{ item.label }}
                </ULink>
                <UTooltip
                    :text="t('menu.tooltipText') + '⭐'"
                    :popper="{ arrow: true }"
                >
                    <ULink
                        to="https://github.com/w33bvGL/w33bvGL-porfolio"
                        target="_blank"
                        class="flex"
                    >
                        <UIcon
                            class="w-6 h-6"
                            name="octicon:mark-github"
                        ></UIcon>
                    </ULink>
                </UTooltip>
            </nav>
        </div>
    </UCard>
</template>
