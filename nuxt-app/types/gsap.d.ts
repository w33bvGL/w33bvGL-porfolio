import type gsap from 'gsap'
import type { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ScrollSmoother } from 'gsap/ScrollSmoother'

declare module '#app' {
  interface NuxtApp {
    $gsap: typeof gsap
    $ScrollTrigger: typeof ScrollTrigger
    $ScrollSmoother: typeof ScrollSmoother
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $gsap: typeof gsap
    $ScrollTrigger: typeof ScrollTrigger
    $ScrollSmoother: typeof ScrollSmoother
  }
}
