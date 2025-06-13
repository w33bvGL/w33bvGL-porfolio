<script setup lang="ts">
import type { Experience, TranslatedExperiences } from '~/types/experience'

definePageMeta({
  layout: 'resume'
})

const { global } = useAppConfig()
const { t } = useI18n()
const img = useImage()
const age = useAge()
const locale = useI18n().locale.value

const isAvailable = global.available

const { experienceString } = useExperienceString()

const { data: experienceByLang } = await useAsyncData<TranslatedExperiences>('experiences', () =>
  $fetch('/api/experiences')
)

const experiences = computed<Experience[]>(() => {
  if (!experienceByLang.value) return []
  if (locale in experienceByLang.value) {
    return experienceByLang.value[locale as keyof TranslatedExperiences]
  }
  return []
})
</script>

<template>
  <main>
    <!-- HEADER  -->
    <header class="flex justify-between gap-3">
      <div class="w-full bg-neutral-200 p-3 rounded-3xl">
        <div class="w-full">
          <div>
            <div class="flex items-start mb-5 gap-3">
              <div class="relative">
                <NuxtImg
                  class="rounded-3xl pointer-events-none select-none min-w-[100px] min-h-[100px]"
                  width="100"
                  height="100"
                  format="webp"
                  :src="global.picture.src"
                  :alt="global.picture.alt"
                  :placeholder="img(global.picture.src, { h: 10, f: 'png', blur: 0.3, q: 50 })"
                />
                <div class="absolute -bottom-2 -right-4">
                  <div
                    class="inline-flex items-center gap-2 text-sm font-medium transition-all"
                    :class="isAvailable ? 'text-green-500' : 'text-red-500'"
                  >
                    <span
                      class="relative flex h-4 w-4"
                      :class="isAvailable ? 'text-green-500' : 'text-red-500'"
                    >
                      <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        :class="isAvailable ? 'bg-green-400' : 'bg-red-400'"
                      />
                      <span
                        class="relative inline-flex rounded-full h-4 w-4"
                        :class="isAvailable ? 'bg-green-500 shadow-green-500/60' : 'bg-red-500 shadow-red-500/60'"
                        style="box-shadow: 0 0 8px currentColor;"
                      />
                    </span>

                    <span />
                  </div>
                </div>
              </div>
              <div class="w-full flex flex-col gap-1">
                <div class="flex items-center w-full justify-between">
                  <h1 class="font-bold text-2xl">
                    {{ t('resume.name') }} {{ t('resume.surname') }}
                  </h1>
                  <div class="border border-neutral-500 px-2 py-1 rounded-full text-nowrap text-xs">
                    {{ experienceString }}
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold text-xl">
                    {{ t('resume.position') }}
                  </h3>
                  <h5 class="font-semibold text-neutral-500">
                    ({{ t('resume.stack') }})
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="text-neutral-700 text-sm">
            {{ $t('about.intro', { age }) }}
          </p>
        </div>
      </div>
      <div class="w-1/3 bg-neutral-200 p-3 rounded-3xl flex flex-col justify-between">
        <div>
          <h5 class="font-semibold">
            {{ $t('resume.contacts') }}
          </h5>
          <div class="text-neutral-500">
            {{ global.phone }} <br>{{ global.email }} <br> {{ global.telegram }}
          </div>
        </div>
        <div>
          <h5 class="font-semibold">
            {{ $t('resume.portfolio') }}
          </h5>
          <div class="text-neutral-500">
            vahe.anidzen.com
          </div>
        </div>
      </div>
    </header>

    <!--  MAIN  -->
    <section class="flex justify-between gap-3 mt-3 border border-neutral-500 rounded-3xl flex-1 p-3">
      <div class="w-full">
        <div>
          <h3 class="font-semibold text-xl">
            {{ $t('experience.title') }}
          </h3>
          <!--          -->

          <ul class="space-y-5">
            <li
              v-for="(exp, index) in experiences"
              :key="index"
              class="border-l-3 border-muted pl-4"
            >
              <div class="text-sm text-muted flex flex-row justify-between mb-2 items-center gap-5">
                <span class="font-medium text-black dark:text-white text-nowrap">
                  {{ exp.company }}
                </span>
                <hr class="w-full opacity-50 hidden lg:block">
                <span class="text-muted text-nowrap hidden md:block">
                  {{ exp.period }}
                </span>
                <span class="text-muted text-nowrap md:hidden">
                  {{ exp.year }}
                </span>
              </div>
              <h3 class="text-xl font-semibold">
                {{ exp.title }}
              </h3>
              <p class="text-base text-muted text-sm line-clamp-2">
                {{ exp.description }}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-1/3 flex flex-col justify-between" />
    </section>
  </main>
</template>

<style scoped>

</style>
