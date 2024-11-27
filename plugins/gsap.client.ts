import { gsap } from '~/assets/js/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother} from "gsap/ScrollSmoother";

export default defineNuxtPlugin((nuxtApp) => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    nuxtApp.provide('gsap', gsap);
});
