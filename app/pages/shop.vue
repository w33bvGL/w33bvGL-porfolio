<script setup lang="ts">
import type { TranslatedShopItems, ShopItem } from '~/types/shop'

const locale = useI18n().locale.value
const img = useImage()
const { t } = useI18n()

const { data: shopItemsByLang } = await useFetch<TranslatedShopItems>('/api/shop')

const shopItems = computed<ShopItem[]>(() => {
  if (!shopItemsByLang.value) return []
  if (locale in shopItemsByLang.value) {
    return shopItemsByLang.value[locale as keyof TranslatedShopItems]
  }
  return []
})

const title = t('shop.title')
const description = t('shop.description')

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,

  twitterTitle: title,
  twitterDescription: description
})
</script>

<template>
  <UPage>
    <UiPageHeader
      :title="$t('shop.title')"
      :description="$t('shop.description')"
      class="mb-5"
    />

    <section class="grid gap-5">
      <div
        v-for="project in shopItems"
        :key="project.name"
        class="group border border-muted/40 bg-muted/30 hover:bg-muted/70 p-4 rounded-xl transition-all relative overflow-hidden shadow-sm hover:shadow-md backdrop-blur-sm flex gap-5"
      >
        <div
          v-if="project.discount"
          class="px-10 text-center absolute py-1 bg-error -rotate-50 -left-10 top-7 text-xs"
        >
          {{ $t('shop.discount') }} / {{ project.discount }}%
        </div>
        <div class="w-1/3 aspect-video border border-muted mb-3 rounded-lg bg-muted/80 overflow-hidden">
          <NuxtImg
            :src="project.image"
            width="380"
            :alt="project.name"
            format="webp"
            class="w-full h-full object-cover"
            :placeholder="img(project.image, { h: 10, f: 'png', blur: 0.3, q: 50 })"
          />
        </div>
        <div class="w-1/2">
          <h3 class="text-xl font-semibold mb-1">
            {{ project.name }}
          </h3>
          <p class="text-muted text-sm mb-1">
            {{ project.description }}
          </p>
          <div class="flex items-center gap-4 mt-3">
            <div>
              <span
                v-if="project.price === 0"
                class="text-success font-semibold italic underline"
              >Бесплатно</span>
              <span
                v-else
                class="font-semibold"
              >
                <span v-if="project.discount">$ {{ project.price * (1 - (project.discount / 100)).toFixed(1) }} / <span class="text-xs text-muted italic underline">$ {{ project.price }}</span></span>
                <span v-else>$ {{ project.price }}</span>
              </span>
            </div>
            <UButton
              v-if="project.url"
              :href="project.url"
              target="_blank"
              color="neutral"
            >
              Смотреть
            </UButton>

            <UButton
              v-if="project.repository"
              :href="project.repository"
              target="_blank"
              icon="i-simple-icons-github"
              color="neutral"
            >
              скачать
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </UPage>
</template>
