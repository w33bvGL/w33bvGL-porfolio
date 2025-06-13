<script setup lang="ts">
import type { TranslatedShopItems, ShopItem } from '~/types/shop'

const locale = useI18n().locale.value
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

    <section class="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
      <div
        v-for="project in shopItems"
        :key="project.name"
        class="group border border-muted/40 bg-muted/30 hover:bg-muted/70 p-4 rounded-xl transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
      >
        wdwd
      </div>
    </section>
  </UPage>
</template>
