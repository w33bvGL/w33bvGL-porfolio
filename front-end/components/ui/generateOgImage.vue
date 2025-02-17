<script setup lang="ts">
import { useI18n } from '#i18n';
import { ref, onMounted, watch } from 'vue';

const { t, locale } = useI18n();
const canvas = ref<HTMLCanvasElement | null>(null);

interface Profile {
    login: string;
    id: number;
    avatar_url: string;
    name: string | null;
    location: string | null;
    public_repos: number;
    created_at: string;
}

const { data: profile } = await useAsyncData<Profile>(
    'github-generateProfileCard-og',
    () =>
        $fetch('/api/user/github/profile', {
            method: 'GET',
            headers: { 'Accept-Language': locale.value },
        }),
);

const { data: languages } = await useAsyncData<Record<string, number>>(
    'github-generateProfileCard-languages-og',
    () =>
        $fetch('/api/user/github/languages', {
            method: 'GET',
            headers: { 'Accept-Language': locale.value },
        }),
);

const generateOgImage = async () => {
    if (!canvas.value || !profile.value) return;
    const ctx = canvas.value.getContext('2d');
    if (!ctx) return;

    const avatar = new Image();
    avatar.crossOrigin = 'anonymous';
    avatar.src = profile.value.avatar_url;

    avatar.onload = () => {
        const canvasWidth = 1920;
        const canvasHeight = 1080;

        ctx.fillStyle = '#f4f4f4';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.drawImage(avatar, 30, 30, 150, 150);

        ctx.fillStyle = '#333';
        ctx.font = '50px Arial';
        ctx.fillText(profile.value.name || 'Имя не указано', 200, 70);

        ctx.font = '30px Arial';
        ctx.fillText(profile.value.location || 'Локация неизвестна', 200, 130);

        const totalRepos = Math.max(profile.value.public_repos, 1);
        const reposBarWidth = 400;
        ctx.fillStyle = '#ddd';
        ctx.fillRect(200, 200, reposBarWidth, 20);

        ctx.fillStyle = '#42b983';
        ctx.fillRect(
            200,
            200,
            (profile.value.public_repos / totalRepos) * reposBarWidth,
            20,
        );

        if (languages.value) {
            const languageKeys = Object.keys(languages.value);
            let yPosition = 250;
            for (const language of languageKeys) {
                const count = languages.value[language] || 0;
                ctx.fillStyle = '#333';
                ctx.font = '24px Arial';
                ctx.fillText(
                    `${language}: ${count} репозиториев`,
                    200,
                    yPosition,
                );

                const languageBarWidth = 300;
                ctx.fillStyle = '#ddd';
                ctx.fillRect(200, yPosition + 30, languageBarWidth, 15);

                ctx.fillStyle = '#42b983';
                ctx.fillRect(
                    200,
                    yPosition + 30,
                    (count / totalRepos) * languageBarWidth,
                    15,
                );

                yPosition += 60;
            }
        }

        const dataURL = canvas.value.toDataURL('image/png');
        uploadOgImage(dataURL);
    };

    avatar.onerror = () => {
        console.error('Ошибка загрузки аватара');
    };
};

const uploadOgImage = async (dataURL: string) => {
    try {
        const response = await $fetch('/api/upload-og-image', {
            method: 'POST',
            body: { image: dataURL },
        });
        console.log('Image saved:', response);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

onMounted(() => {
    generateOgImage();
});
</script>

<template>
    <div>
        <!--    <canvas ref="canvas" width="1920" height="1080"></canvas>-->
        <!--    <button @click="generateOgImage">Сгенерировать OG Image</button>-->
    </div>
</template>

<style scoped>
canvas {
    border: 1px solid #ccc;
    margin-top: 20px;
}
</style>
