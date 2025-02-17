<script setup lang="ts">
import { useI18n } from '#i18n';
const { t, locale } = useI18n();

interface Profile {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    hireable: boolean;
    bio: string | null;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

const { data: profile } = await useAsyncData<Profile>('github-profile', () =>
    $fetch('/api/user/github/profile', {
        method: 'GET',
        headers: { 'Accept-Language': locale.value },
    }),
);

const text = ref(t('greeting'));
const textArray = ref<string[]>([]);

onMounted(() => {
    textArray.value = text.value.split('');
});

const companies = computed(() => {
    return profile.value?.company
        ? profile.value.company
              .match(/@(\S+)/g)
              ?.map((name) => name.replace('@', '')) || []
        : [];
});
</script>

<template>
    <div class="flex gap-5">
        <UCard class="w-1/3 relative p-6">
            <div class="circle">
                <div
                    class="logo relative rounded-full overflow-hidden w-full h-full"
                >
                    <NuxtImg
                        v-if="profile?.avatar_url"
                        :src="profile?.avatar_url"
                        alt="User Avatar"
                        class="w-full h-full"
                    />
                    <USkeleton class="w-full h-full" />
                </div>
                <div class="text rotating">
                    <span
                        class="text-primary font-bold"
                        v-for="(char, index) in textArray"
                        :key="index"
                        :style="{
                            transform: `rotate(${index * 8.2}deg) translate(0, -80px)`,
                        }"
                    >
                        {{ char }}
                    </span>
                </div>
            </div>
        </UCard>
        <UCard class="w-2/3">
            <div>
                <div class="flex justify-between items-center">
                    <h1 class="text-3xl md:text-4xl font-bold">
                        {{ profile?.name }}
                        <span
                            class="text-xl md:text-2xl text-gray-600 dark:text-gray-400"
                        >
                            {{ '/ ' + t('name') + ' ' + t('surname') }}</span
                        >
                    </h1>
                    <p class="text-gray-500">{{ profile?.location }}</p>
                </div>
                <UButton
                    :to="profile?.html_url"
                    target="_blank"
                    variant="link"
                    :padded="false"
                    >@{{ profile?.login }}</UButton
                >

                <div class="mt-5">
                    <p class="text-gray-600 dark:text-gray-400">
                        {{ t('bio') }}
                    </p>
                    <div class="mt-5 flex gap-5" v-if="profile?.company">
                        <UButton
                            v-for="company in companies"
                            :key="company"
                            variant="link"
                            :padded="false"
                            :to="`https://github.com/${company}`"
                            target="_blank"
                            size="xl"
                        >
                            {{ company }}
                        </UButton>
                    </div>
                </div>
            </div>
        </UCard>
    </div>
</template>

<style scoped>
.circle {
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.text {
    position: absolute;
    width: 100%;
    height: 100%;
    animation: animate 10s linear infinite;
}

.rotating {
    animation: rotateText 10s linear infinite;
}

@keyframes rotateText {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.text span {
    position: absolute;
    left: 50%;
    top: 16%;
    font-size: 1em;
    text-transform: uppercase;
    transform-origin: 0 100px;
}
</style>
