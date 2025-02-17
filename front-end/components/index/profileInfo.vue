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

const { data: profile } = await useAsyncData<Profile>(
    'github-generateProfileCard',
    () =>
        $fetch('/api/user/github/profile', {
            method: 'GET',
            headers: { 'Accept-Language': locale.value },
        }),
);
</script>

<template>
    <UCard class="w-1/3">
        <IndexProfileInfoItem
            v-if="profile?.followers"
            icon="👥"
            :label="t('profileInfo.followers')"
            :value="profile.followers"
        />
        <IndexProfileInfoItem
            v-if="profile?.following"
            icon="🔄"
            :label="t('profileInfo.following')"
            :value="profile.following"
        />
        <IndexProfileInfoItem
            v-if="profile?.location"
            icon="🌍"
            :label="t('profileInfo.location')"
            :value="profile.location"
        />
        <IndexProfileInfoItem
            v-if="profile?.public_repos"
            icon="📦"
            :label="t('profileInfo.repositories')"
            :value="profile.public_repos"
        />
        <IndexProfileInfoItem
            v-if="profile?.public_gists"
            icon="🌟"
            :label="t('profileInfo.gists')"
            :value="profile.public_gists"
        />
    </UCard>
</template>
