<script setup lang="ts">
const { $gsap } = useNuxtApp()

onMounted(() => {
  $gsap.to('.box', {
    x: 100,
    duration: 1,
    ease: 'power2.out'
  })
})
</script>

<template>
  <div>
    <div class="error">
      <div class="container">
        <div class="section-inner text-center">
          <h2 class="title-elements-parent">
            <span>404</span> <br>
            Page Not Found
          </h2>
          <p class="desc">
            Sorry , the page you seems looking for, has been <br> moved, redirected or removed permanently
          </p>
          <div class="buttons-main-wrapper-elements justify-content-center">
            <a
              href="/"
              class="rts-btn btn-primary"
            >Back To Homepage</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
