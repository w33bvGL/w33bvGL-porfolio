<script setup lang="ts">
import type { Experience, TranslatedExperiences } from '~/types/experience'
import type {Education, TranslatedEducation} from "~/types/education"

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

const { data: techs } = await useAsyncData('technologies', () =>
  $fetch('/api/technologies')
)

const combinedTechs = computed(() => {
  const frontend = techs.value?.frontend || []
  const backend = techs.value?.backend || []
  return [...frontend, ...backend]
})

const experiences = computed<Experience[]>(() => {
  if (!experienceByLang.value) return []
  if (locale in experienceByLang.value) {
    return experienceByLang.value[locale as keyof TranslatedExperiences]
  }
  return []
})

const { data: educationByLang } = await useAsyncData<TranslatedEducation>('education', () =>
  $fetch('/api/education')
)

const educations = computed<Education[]>(() => {
  if (!educationByLang.value) return []
  if (locale in educationByLang.value) {
    return educationByLang.value[locale as keyof TranslatedEducation]
  }
  return []
})
</script>

<template>
  <main>
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
                  <div class="border border-neutral-700 px-2 py-1 rounded-full text-nowrap text-xs">
                    {{ experienceString }}
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold text-xl">
                    {{ t('resume.position') }}
                  </h3>
                  <h5 class="font-semibold text-neutral-700">
                    ({{ t('resume.stack') }})
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="text-neutral-700 text-sm line-clamp-3">
            {{ $t('about.intro', { age }) }}
          </p>
        </div>
      </div>
      <div class="w-1/3 bg-neutral-200 p-3 rounded-3xl flex flex-col justify-between">
        <div>
          <h5 class="font-semibold">
            {{ $t('resume.contacts') }}
          </h5>
          <div class="text-neutral-700">
            {{ global.phone }} <br>{{ global.email }} <br> {{ global.telegram }}
          </div>
        </div>
        <div>
          <h5 class="font-semibold">
            {{ $t('resume.portfolio') }}
          </h5>
          <div class="text-neutral-700">
            vahe.anidzen.com
          </div>
        </div>
      </div>
    </header>

    <section class="mt-3 border border-neutral-700 rounded-3xl flex-1 px-3 py-6">
      <div class="flex gap-3">
        <div class="w-full flex">
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold text-xl"> {{ t('experience.title') }} — {{ experienceString }}</h4>
              <h6 class="text-neutral-700 text-sm">{{ t('experience.description') }}</h6>
            </div>
            <ul class="space-y-3">
              <li
                v-for="(exp, index) in experiences"
                :key="index"
              >
                <div class="text-sm text-neutral-700 flex flex-row justify-between mb-2 items-center gap-5">
                <span class="font-medium text-nowrap">
                  {{ exp.company }}
                </span>
                  <hr class="w-full border-neutral-200 hidden lg:block">
                  <span class="text-nowrap">
                  {{ exp.period }}
                </span>
                </div>
                <h3 class="font-semibold text-xl">
                  {{ exp.title }}
                </h3>
                <p class="text-base text-neutral-700 text-sm line-clamp-2">
                  {{ exp.description }}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-1/3 flex flex-col space-y-4">
          <h3 class="font-semibold text-xl">
            {{ $t('resume.skills') }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="tech in combinedTechs || []"
              :key="tech.name"
              class="border border-neutral-700 px-2 py-0.5 rounded-full text-nowrap text-xs"
            >
              <span class="text-xs text-neutral-700">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 border-t-1 border-neutral-200 pt-4 grid md:grid-cols-2 md:gap-5">
        <div class="space-y-4 border-r-1 border-neutral-200">
         <div>
           <h4 class="font-semibold text-xl">{{ t('education.title') }}</h4>
           <h6 class="text-neutral-700 text-sm">{{ t('education.description') }}</h6>
         </div>
          <div
            v-for="(item, index) in educations"
            :key="'edu-' + index"
            class="border-l-2 pl-3 border-neutral-700"
          >
            <h5 class="font-semibold text-base">
              {{ item.title }}
            </h5>
            <p class="text-sm text-neutral-700">
              {{ item.description }}
            </p>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <h4 class="font-semibold text-xl">{{ t('activity.title') }}</h4>
            <h6 class="text-neutral-700 text-sm">{{ t('activity.description') }}</h6>
          </div>
         <div class="space-y-2 text-neutral-700 text-sm">
           <p>
             {{ t('activity.description1') }}
           </p>
           <p>
             {{ t('activity.description2') }}
           </p>
         </div>
        </div>
      </div>
    </section>
  </main>
</template>
