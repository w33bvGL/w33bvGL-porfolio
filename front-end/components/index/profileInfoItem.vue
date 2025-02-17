<script setup lang="ts">
defineProps<{ icon: string; label: string; value: string | number }>();
</script>

<template>
    <div class="flex mt-2 items-center">
        <b class="text-xl mr-2">{{ icon }}</b>
        <div class="flex gap-2">
            <strong class="font-medium">{{ label }}:</strong>
            <p>{{ value }}</p>
        </div>
    </div>
</template>
