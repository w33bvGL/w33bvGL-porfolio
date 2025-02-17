<script setup lang="ts">
import { ref } from 'vue';

const socialNetworks = ref<
    Array<{
        id: number;
        native_name: string;
        name: string;
        icon: string;
        link: string;
    }>
>([]);

const { data } = await useAsyncData('social', () =>
    $fetch('/api/social/get-all', { method: 'GET' }),
);

socialNetworks.value = data.value;
</script>

<template>
    <div
        class="hidden xl:block fixed top-1/2 left-0 px-5 transform -translate-y-1/2 z-50 space-y-2"
    >
        <div class="flex flex-col gap-4">
            <UTooltip
                v-for="social in socialNetworks"
                :key="social.id"
                :text="social.native_name"
                :popper="{ placement: 'right' }"
            >
                <UButton
                    size="md"
                    class="rounded-lg p-2"
                    :to="social.link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <nuxtImg :src="social.icon" class="w-6 h-6" />
                </UButton>
            </UTooltip>
        </div>
    </div>
</template>

<style scoped>
/* Добавь свои стили */
</style>
