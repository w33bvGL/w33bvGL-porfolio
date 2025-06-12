<script setup lang="ts">
import type { TranslatedProjects, Project } from '~/types/project'

const img = useImage()
const locale = useI18n().locale.value

const { data: projectsByLang } = await useFetch<TranslatedProjects>('/api/projects')

const projects = computed<Project[]>(() => {
  if (!projectsByLang.value) return []
  if (locale in projectsByLang.value) {
    return projectsByLang.value[locale as keyof TranslatedProjects]
  }
  return []
})
</script>

<template>
  <UPage>
    <UiPageHeader
      :title="$t('projects.title')"
      :description="$t('projects.description')"
      class="mb-5"
    />

    <section class="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
      <div
        v-for="project in projects"
        :key="project.name"
        class="group border border-muted/40 bg-muted/30 hover:bg-muted/70 p-4 rounded-xl transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
      >
        <div class="aspect-video border border-muted mb-3 rounded-lg bg-muted/80">
          <NuxtImg
            :src="project.image"
            width="380"
            :alt="project.name"
            format="webp"
            class=" aspect-video object-cover"
            :placeholder="img(project.image, { h: 10, f: 'png', blur: 0.3, q: 50 })"
          />
        </div>
        <h3 class="text-xl font-semibold mb-1">
          {{ project.name }}
        </h3>
        <p class="text-muted text-sm mb-1">
          {{ project.description }}
        </p>
        <ULink
          v-if="project.url"
          :href="project.url"
          target="_blank"
          class="text-primary hover:underline"
        >
          {{ project.url }}
        </ULink>
      </div>
    </section>

    <section class="mt-10 p-6 border border-muted/40 bg-muted/20 rounded-xl text-center shadow-sm">
      <h2 class="text-2xl font-bold mb-3">
        {{ $t('projects.haveIdea') }}
      </h2>
      <p class="text-muted text-base mb-5 max-w-xl mx-auto">
        {{ $t('projects.whatIOffer') }}
      </p>
      <ULink
        href="https://t.me/Vahesargsyan2005"
        target="_blank"
        class="inline-block bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primary/90 transition"
      >
        {{ $t('projects.contactTelegram') }}
      </ULink>
    </section>
  </UPage>
</template>
