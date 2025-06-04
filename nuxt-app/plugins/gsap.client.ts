import gsap from 'gsap'
import { defineNuxtPlugin } from '#app'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('gsap', gsap)
  nuxtApp.provide('ScrollTrigger', ScrollTrigger)
  nuxtApp.provide('ScrollSmoother', ScrollSmoother)
})
