<script setup lang="ts">
import { onMounted } from 'vue';
import { useNuxtApp } from '#app';

onMounted(() => {
    const { $gsap } = useNuxtApp();

    $gsap.ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5,
        effects: true,
    });
});
</script>

<template>
    <div>
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <slot/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
