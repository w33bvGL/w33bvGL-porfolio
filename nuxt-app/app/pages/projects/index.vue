<script setup lang="ts">
const projects = [
  {
    name: "Hentai Voice",
    image: "/projects/hentai-voice.png",
    description: "В свободное время я разрабатываю быстрые и производительные приложения в рамках Anidzen: sora.ql, ota-ku, aira и микросервисы на Laravel. Проектирую REST и GraphQL API."
  },
  {
    name: "ota-ku",
    image: "/projects/ota-ku.png",
    description: "Разработка внутренних систем: API, админки, интеграции со сторонними сервисами. Работа с платёжными шлюзами: Stripe, BTC, LTC. Отвечаю за фронт-бэк интеграцию.",
    url: "https://ota-ku.am"
  },
  {
    name: "aira",
    image: "/projects/anidzen-aira.png",
    description: "AI-сервис Anidzen для генерации изображений и моделей. Комбинация нейросетей, кастомных пресетов и UI для художников и разработчиков.",
    url: "https://aira.anidzen.com"
  },
  {
    name: "Anidzen ecosystems",
    image: "/projects/anidzen-ecosystems.png",
    description: "Единая экосистема проектов под брендом Anidzen — от микросервисов до визуальных редакторов и p2e-инфраструктур.",
    url: "https://anidzen.com"
  },
  {
    name: "sora",
    image: "/projects/anidzen-sora.png",
    description: "Sora — fast API-бекенд, написанный на Laravel для стриминга и AI. Система мультиязычности, поддержка GraphQL, масштабируемость.",
    url: "https://sora.anidzen.com"
  },
  {
    name: "Drive Fit",
    image: "/projects/drive-fit.png",
    description: "Фитнес-приложение с элементами геймификации. Отвечал за фронтенд, API, систему уровней и статистику прогресса."
  },
  {
    name: "Mari Karkas",
    image: "/projects/mari-karkas.png",
    description: "Проект по дизайну и архитектуре в интерьерах. Разработан сайт-портфолио и внутренняя CRM."
  },
  {
    name: "TG Quick Click",
    image: "/projects/tg-quick-click.png",
    description: "Telegram-бот и админка для создания кастомных кнопок, аналитики и настройки рассылок."
  },
  {
    name: "UDP Logistics",
    image: "/projects/udp-logistics.png",
    description: "Логистическая система с трекингом, документами и API-интеграцией с B2B-платформами."
  }
]
</script>

<template>
  <UPage>
    <UiPageHeader
      title="Что я создаю и развиваю"
      description="Авторские проекты и коммерческие кейсы в AI, логистике, Telegram-ботах и других сферах."
      class="mb-5"
    />

    <section class="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
      <div
        v-for="project in projects"
        :key="project.name"
        class="group border border-muted/40 bg-muted/30 hover:bg-muted/70 p-4 rounded-xl transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
      >
        <NuxtImg
          :src="project.image"
          :alt="project.name"
          class="rounded-lg aspect-video object-cover border border-muted mb-3"
        />
        <h3 class="text-xl font-semibold mb-1">
              {{ project.name }}
        </h3>
        <p class="text-muted text-sm mb-1">{{ project.description }}</p>
        <ULink
          v-if="project.url"
          :href="project.url"
          target="_blank"
          class="text-primary hover:underline"
        >{{ project.url}}</ULink>
      </div>
    </section>
  </UPage>
</template>
