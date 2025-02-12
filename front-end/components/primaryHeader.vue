<script setup lang="ts">
import { useI18n } from "#i18n";
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

const { data: profile } = await useAsyncData<Profile>("github-profile", () =>
    $fetch("/api/user/github/profile", {
      method: "GET",
      headers: { "Accept-Language": locale.value },
    })
);

const text = ref("Kristen Johnson - Creative UX/UI Designer - ");
const textArray = ref<string[]>([]);

onMounted(() => {
  textArray.value = text.value.split("");
});
</script>

<template>
  <div>
    <UCard class="relative p-6">
      <div class="circle">
        <div class="logo">
          <NuxtImg
              :src="profile?.avatar_url"
              alt="User Avatar"
              class="avatar"
          />
        </div>
        <div class="text rotating">
          <span
              v-for="(char, index) in textArray"
              :key="index"
              :style="{
              transform: `rotate(${index * 8.2}deg) translate(0, -100px)`,
            }"
          >
            {{ char }}
          </span>
        </div>
      </div>

      <div class="profile-text">
        <h2 class="text-2xl font-bold">{{ profile?.name }}</h2>
        <p class="text-gray-500">@{{ profile?.login }}</p>
        <p class="text-gray-700">{{ profile?.bio }}</p>
        <p class="text-gray-600">{{ profile?.company }}</p>
        <p class="text-gray-500">{{ profile?.location }}</p>
        <p class="text-blue-500">
          <a :href="profile?.html_url" target="_blank">{{ profile?.html_url }}</a>
        </p>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
.circle {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ccc;
}

.logo {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Анимация вращения */
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
  font-size: 1.2em;
  text-transform: uppercase;
  transform-origin: 0 100px;
}
</style>