<script setup lang="ts">
const { $gsap } = useNuxtApp()

onMounted(() => {
  $gsap.from('.rts_hero__title', {
    opacity: 0,
    y: 80,
    duration: 1.4,
    ease: 'power3.out'
  })

  $gsap.from('.hero__sub-title', {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: 'power2.out',
    delay: 0.4
  })

  $gsap.from('.click-down-bottom', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power2.out',
    delay: 0.8
  })

  $gsap.from('.social-share-horizental li', {
    opacity: 0,
    y: 20,
    stagger: 0.2,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 1
  })

  $gsap.from('.rts-banner-area-three-start', {
    scrollTrigger: {
      trigger: '.rts-banner-area-three-start',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  })
})
</script>

<template>
  <div class="rts-banner-area-three-start rts-scroll-down-circle-wrapper-2 rts-scroll-down-circle-wrapper">
    <div class="banner-shape-area">
      <NuxtImg
        src="/images/banner/11.png"
        class="img"
        alt="banner"
      />
    </div>

    <div class="container container-auto">
      <div class="left">
        <div class="col-lg-6 order-xl-1 order-lg-1 order-md-2 order-sm-2 order-2">
          <div class="banner-content-wrapper-three">
            <h2 class="title rts_hero__title">
              <span class="title">
                Vahe
                <span>Full-Stack Developer</span>
              </span>
              Sargsyan
            </h2>
            <p class="about-me hero__sub-title">
              <strong>Full-Stack Developer</strong> from Armenia.
              I specialize in building scalable web platforms, high-load APIs, and complex business logic from scratch.
            </p>
            <a
              href="#about"
              class="click-down-bottom"
            >
              <Icon
                name="lucide:arrow-down"
                class="icon"
              />
              <p>About</p>
            </a>
          </div>
        </div>
      </div>
      <div class="right">
        <IndexMarqueeVertical />
        <IndexMarqueeVertical direction="reverse" />
      </div>
    </div>

    <IndexSocialShare />
    <div class="kospand_2">
      <IndexHorizontalMarquee
          text="• PHP • Nuxt.js • Laravel • JavaScript • TypeScript • Full-Stack • PHP • Nuxt.js • Laravel • JavaScript • TypeScript • Full-Stack •"
          :speed="50"
      />
    </div>
    <div class="kospand">
      <IndexHorizontalMarquee
        text="• PHP • Nuxt.js • Laravel • JavaScript • TypeScript • Full-Stack • PHP • Nuxt.js • Laravel • JavaScript • TypeScript • Full-Stack •"
        :speed="50"
      />
    </div>

  </div>
</template>

<style scoped lang="scss">
.rts-banner-area-three-start {
  position: relative;
  overflow: hidden;

  &::before, &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 1;
    pointer-events: none;
  }

  &::before {
    top: 0;
    height: 15vh;
    background: linear-gradient(to bottom, rgba(17, 17, 17, 1), transparent);
  }

  &::after {
    bottom: 0;
    height: 10vh;
    background: linear-gradient(to top, rgba(17, 17, 17, 1), transparent);
  }
}

.banner-shape-area {
  position: absolute;
  left: 0;

  img {
    height: 100vh;
    max-height: 100dvh;
    width: auto;
  }
}

.container {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;

  .left, .right {
    width: 48%;
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.rts_hero__title {
  font-size: 7.5dvw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-weight: 700;
  line-height: 0.9;

  .title {
    display: flex;
    align-items: center;
    gap: 1dvw;

    span {
      background-color: var(--color-cog-900);
      overflow: hidden;
      border-radius: 2dvw;
      padding: 0.5dvw 1.5dvw;
      font-size: 1.5dvw;
      border: 0.3dvw solid var(--color-cog-800);
      color: var(--color-primary);
      opacity: 0.8;
    }
  }
}

.hero__sub-title {
  font-size: 1.3dvw;
  margin-top: 2dvw;
  line-height: 1.6;
  color: var(--color-neutral-500);
}

.click-down-bottom {
  color: var(--color-neutral-500);
  display: flex;
  align-items: center;
  gap: 0.5dvw;
  margin-top: 1dvw;
  animation: bounce 2s infinite;

  .icon {
    width: 3dvw;
    height: 3dvw;
  }

  p {
    font-size: 1.2dvw;
  }
}

.kospand, .kospand_2 {
  width: 120vw;
  max-width: none;
  position: absolute;
  padding: 0.5dvw 2dvw;
  z-index: 10;
  font-size: 1dvw;
  pointer-events: none;
  user-select: none;
}

.kospand {
  background-color: var(--color-primary);
  rotate: -20deg;
  bottom: 15vh;
  left: -5vw;
}

.kospand_2 {
  background-color: var(--color-cog-900);
  rotate: 35deg;
  top: 35vh;
  right: -20vw;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    height: auto;
  }
  .left, .right {
    width: 100%;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .rts_hero__title {
    font-size: clamp(2rem, 8vw, 3rem);
    justify-content: center;

    .title span {
      padding: 0.3rem 1rem;
      font-size: clamp(0.7rem, 2vw, 1rem);
    }
  }
  .hero__sub-title {
    font-size: 0.9rem;
    text-align: center;
  }
  .click-down-bottom {
    margin-top: 1rem;
  }
  .social-share-horizental {
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .kospand, .kospand_2 {
    display: none;
  }
}
</style>
