<script setup lang="ts">
const { $gsap } = useNuxtApp()

onMounted(() => {
  $gsap.from('.rts_hero__title', {
    opacity: 0,
    y: 80,
    duration: 1.4,
    ease: 'power3.out'
  })

  // Подзаголовок
  $gsap.from('.hero__sub-title', {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: 'power2.out',
    delay: 0.4
  })

  // Кнопка "click down"
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
      toggleActions: 'play none none none',
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
      <NuxtImg src="/images/banner/11.png" class="img" alt="banner" />
    </div>

    <div class="container container-2xl">
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
            <a href="#about" class="click-down-bottom">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="41" viewBox="0 0 14 41" fill="none">
                <g clip-path="url(#clip0_353_1191)">
                  <path d="M7.13756 39.8898V39.871C7.99995 35.5997 10.4954 31.9306 13.9082 29.5974V29.3528C10.6055 31.5731 8.14674 34.9976 7.13756 39.0242L7.13756 0.0939941L6.95407 0.0939941L6.95407 38.9866C6.91738 38.8737 6.89903 38.742 6.86233 38.6291C5.85316 34.6025 3.39444 31.178 0.0916901 28.9577V29.1835C3.52288 31.5355 5.99995 35.1858 6.86233 39.457V39.4758C6.89903 39.6264 6.91738 39.7769 6.93573 39.9274C6.97242 40.0779 6.99077 40.2473 7.00912 40.3978C7.06417 40.2285 7.10086 40.0591 7.13756 39.8898Z" fill="white" stroke="white" stroke-miterlimit="10" />
                </g>
                <defs>
                  <clipPath id="clip0_353_1191">
                    <rect width="41" height="14" fill="white" transform="matrix(0 1 -1 0 14 0)" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="right">
        <IndexMarqueeVertical/>
        <IndexMarqueeVertical direction="reverse"/>
      </div>
    </div>

    <IndexSocialShare/>
    <div class="kospand">
      <IndexHorizontalMarquee text="• PHP • Nuxt.js • Laravel • JavaScript • TypeScript • Full-Stack • PHP • Nuxt.js • Laravel • JavaScript • TypeScript • Full-Stack •" :speed="50" />
    </div>
    <div class="kospand_2">
      <IndexHorizontalMarquee text="• PHP • Nuxt.js • Laravel • JavaScript • TypeScript • Full-Stack • PHP • Nuxt.js • Laravel • JavaScript • TypeScript • Full-Stack •" :speed="50" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.rts-banner-area-three-start {
  position: relative;

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
  font-size: clamp(2.5rem, 8vw, 10rem);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-weight: 700;
  line-height: 1.1;

  .title {
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      background-color: var(--color-cog-900);
      overflow: hidden;
      border-radius: 50px;
      padding: 0.5rem 1.5rem;
      font-size: clamp(0.9rem, 1.5vw, 1.5rem);
      border: 2px solid var(--color-cog-800);
      color: var(--color-primary);
      opacity: 0.8;
    }
  }
}

.hero__sub-title {
  font-size: clamp(0.9rem, 1.2vw, 2rem);
  line-height: 1.6;
  color: var(--color-neutral-500);
  margin-top: 1rem;
}

.click-down-bottom {
  display: inline-block;
  margin-top: 2rem;
  animation: bounce 2s infinite;

  svg {
    width: 1rem;
    height: auto;
  }
}

.social-share-horizental {
  position: absolute;
  bottom: 2rem;
  left: 2rem;

  ul {
    display: flex;
    gap: 1rem;

    li {
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}

.kospand, .kospand_2 {
  width: 120vw;
  max-width: none;
  position: absolute;
  padding: 0.5rem 2rem;
  z-index: 10;
  font-size: clamp(0.8rem, 1vw, 1.2rem);
}

.kospand {
  background-color: var(--color-primary);
  rotate: -10deg;
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