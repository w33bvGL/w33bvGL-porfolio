<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isActive = ref(false)
const pathLength = ref(0)
let progressPath: SVGPathElement | null = null

const updateProgress = () => {
  if (!progressPath) return
  const scroll = window.scrollY
  const height = document.body.scrollHeight - window.innerHeight
  const progress = pathLength.value - (scroll * pathLength.value) / height
  progressPath.style.strokeDashoffset = `${progress}`
}

const scrollHandler = () => {
  isActive.value = window.scrollY > 50
  updateProgress()
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  progressPath = document.querySelector('.progress-circle path')
  if (!progressPath) return

  pathLength.value = progressPath.getTotalLength()
  progressPath.style.strokeDasharray = `${pathLength.value} ${pathLength.value}`
  progressPath.style.strokeDashoffset = `${pathLength.value}`

  window.addEventListener('scroll', scrollHandler)
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
})
</script>

<template>
  <div class="progress-wrap" :class="{ 'active-progress': isActive }" @click="scrollToTop">

    <svg class="progress-circle" width="100%" height="100%" viewBox="-1 -1 102 102">
      <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
    <svg class="arrow-up" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"/>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.progress-wrap {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 46px;
  height: 46px;
  cursor: pointer;
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(15px);
  transition: all 200ms linear;

  &.active-progress {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .progress-circle {
    background: #ededed;
    border-radius: 50%;
    width: 100%;
    height: 100%;

    path {
      stroke: var(--color-primary);
      stroke-width: 4;
      fill: none;
      transition: all 200ms linear;
    }
  }

  .arrow-up {
    position: absolute;
    top: 11px;
    left: 11px;
    width: 24px;
    height: 24px;
    pointer-events: none;
    fill: var(--color-primary);
    transition: transform 0.3s ease;
  }

  &:hover .arrow-up {
    transform: translateY(-2px);
  }
}

.home-blue {
  .progress-wrap .progress-circle path {
    stroke: var(--color-primary-2);
  }

  .progress-wrap .arrow-up {
    color: var(--color-primary-2);
    filter: drop-shadow(0px 3px 20px #0742e952);
  }
}
</style>
