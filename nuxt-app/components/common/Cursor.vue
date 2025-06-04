<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const cursorInner = document.querySelector('.cursor-inner') as HTMLElement | null
  const cursorOuter = document.querySelector('.cursor-outer') as HTMLElement | null
  const body = document.body

  if (!cursorInner || !cursorOuter || !body) return

  const interactiveElements = [
    'a',
    'button',
    '.progress-wrap',
    '.active-progress',
    '.search-click',
    '.action-menu',
    '.swiper-button-next',
    '.swiper-button-prev',
  ].join(',')

  const elementsToRemoveCursor = [
    '.learn-more-btn',
    '.swiper-slider-main-main-wrapper-portfolio .thumbnail',
    '.single-portfolio-style-five a',
    '.mySwiper_portfolio-5-scale-none a',
  ].join(',')

  let mouseX = 0
  let mouseY = 0
  let isStatic = false

  window.addEventListener('mousemove', (e) => {
    if (!isStatic) {
      cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }
    cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    mouseX = e.clientX
    mouseY = e.clientY
  })

  document.querySelectorAll(interactiveElements).forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorInner.classList.add('cursor-hover')
      cursorOuter.classList.add('cursor-hover')
    })
    el.addEventListener('mouseleave', () => {
      cursorInner.classList.remove('cursor-hover')
      cursorOuter.classList.remove('cursor-hover')
    })
  })

  document.querySelectorAll(elementsToRemoveCursor).forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorInner.classList.add('cursor-remove')
      cursorOuter.classList.add('cursor-remove')
    })
    el.addEventListener('mouseleave', () => {
      cursorInner.classList.remove('cursor-remove')
      cursorOuter.classList.remove('cursor-remove')
    })
  })

  cursorInner.style.visibility = 'visible'
  cursorOuter.style.visibility = 'visible'

})
</script>

<template>
  <div class="rts-cursor cursor-outer" data-default="yes" data-link="yes" data-slider="no">
    <span class="fn-cursor"></span>
  </div>
  <div class="rts-cursor cursor-inner" data-default="yes" data-link="yes" data-slider="no">
    <span class="fn-cursor">
      <span class="fn-left"></span>
      <span class="fn-right"></span>
    </span>
  </div>
</template>

<style scoped lang="scss">

.rts-cursor[data-default=no] {
  opacity: 0;
}

.rts-cursor[data-default=no].cursor-inner {
  -webkit-transition: opacity 0.3s ease;
  -o-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}

.rts-cursor[data-default=no].cursor-inner.cursor-hover,
.rts-cursor[data-default=no].cursor-inner.cusror-remove {
  opacity: 1;
}

.rts-cursor[data-link=no].cursor-inner.cursor-hover {
  opacity: 0;
}

.rts-cursor[data-slider=no].cursor-inner.cusror-remove {
  opacity: 0;
}

.rts-cursor {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  visibility: hidden;
  mix-blend-mode: exclusion;
}

.rts-cursor.mouse-down .fn-cursor {
  -webkit-transform: scale(0.9);
  -ms-transform: scale(0.9);
  transform: scale(0.9);
}

@media (max-width: 1040px) {
  .rts-cursor {
    display: none;
  }
}
.cursor-link {
  width: 30px;
  height: 30px;
  margin-left: -5px;
  margin-top: -15px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  z-index: 10000000;
  -webkit-transition: all 0.08s ease-out;
  -o-transition: all 0.08s ease-out;
  transition: all 0.08s ease-out;
}

.cursor-outer {
  z-index: 10000000;
  -webkit-transition: transform 0.08s ease-out, opacity 1s ease;
  -webkit-transition: opacity 1s ease, -webkit-transform 0.08s ease-out;
  transition: opacity 1s ease, -webkit-transform 0.08s ease-out;
  -o-transition: transform 0.08s ease-out, opacity 1s ease;
  transition: transform 0.08s ease-out, opacity 1s ease;
  transition: transform 0.08s ease-out, opacity 1s ease, -webkit-transform 0.08s ease-out;
}

.cursor-outer .fn-cursor {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px dashed white;
  animation: scroll-pulse 2.5s linear infinite;
}

@keyframes scroll-pulse {
  0% {
    transform: scale(1) rotate(0deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}

.cursor-inner .fn-cursor {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -3px 0 0 -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: white;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.cursor-outer.cursor-hover {
  opacity: 0;
  -webkit-transition: transform 0.08s ease-out, opacity 0.2s ease;
  -webkit-transition: opacity 0.2s ease, -webkit-transform 0.08s ease-out;
  transition: opacity 0.2s ease, -webkit-transform 0.08s ease-out;
  -o-transition: transform 0.08s ease-out, opacity 0.2s ease;
  transition: transform 0.08s ease-out, opacity 0.2s ease;
  transition: transform 0.08s ease-out, opacity 0.2s ease, -webkit-transform 0.08s ease-out;
}

.cursor-inner {
  z-index: 10000001;
}

.cursor-inner.cursor-hover .fn-cursor {
  margin: -30px 0 0 -30px;
  width: 80px;
  height: 80px;
  background-color: white;
  opacity: 50;
}

.cursor-inner.cursor-remove.cursor-hover .fn-cursor {
  display: none;
}

.cursor-outer.cursor-remove {
  display: none;
}

.cursor-inner.cursor-slider:not(.cursor-hover) .fn-cursor {
  margin-left: -30px;
  margin-top: -30px;
  width: 60px;
  height: 60px;
  background-color: transparent;
  border: 5px solid #000;
}

.cursor-inner .fn-left,
.cursor-inner .fn-right {
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.cursor-inner .fn-left:after {
  content: "";
  position: absolute;
  width: 2px;
  height: 12px;
  -webkit-transform: rotate(50deg);
  -ms-transform: rotate(50deg);
  transform: rotate(50deg);
  left: -20px;
  top: 50%;
  margin-top: -10px;
  background-color: #000;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.cursor-inner .fn-left:before {
  content: "";
  position: absolute;
  width: 2px;
  height: 12px;
  -webkit-transform: rotate(130deg);
  -ms-transform: rotate(130deg);
  transform: rotate(130deg);
  left: -20px;
  top: 50%;
  margin-top: -2px;
  background-color: #000;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.cursor-inner .fn-right:after {
  content: "";
  position: absolute;
  width: 2px;
  height: 12px;
  -webkit-transform: rotate(50deg);
  -ms-transform: rotate(50deg);
  transform: rotate(50deg);
  right: -20px;
  top: 50%;
  margin-top: -2px;
  background-color: #000;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.cursor-inner .fn-right:before {
  content: "";
  position: absolute;
  width: 2px;
  height: 12px;
  -webkit-transform: rotate(130deg);
  -ms-transform: rotate(130deg);
  transform: rotate(130deg);
  right: -20px;
  top: 50%;
  margin-top: -10px;
  background-color: var(--titleColor);
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.cursor-outer.cursor-remove {
  opacity: 0;
  -webkit-transition: transform 0.08s ease-out, opacity 0.2s ease;
  -webkit-transition: opacity 0.2s ease, -webkit-transform 0.08s ease-out;
  transition: opacity 0.2s ease, -webkit-transform 0.08s ease-out;
  -o-transition: transform 0.08s ease-out, opacity 0.2s ease;
  transition: transform 0.08s ease-out, opacity 0.2s ease;
  transition: transform 0.08s ease-out, opacity 0.2s ease, -webkit-transform 0.08s ease-out;
}
</style>