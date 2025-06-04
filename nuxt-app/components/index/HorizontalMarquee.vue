<script setup lang="ts">
defineProps<{
  text: string
  speed?: number
}>()
</script>

<template>
  <div class="marquee">
    <div
      class="marquee__inner"
      :style="{ animationDuration: speed + 's' }"
    >
      <span
        v-for="i in 10"
        :key="i"
      >{{ text }}</span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.5dvw 0;
  border-top: 0.1dvw solid rgba(255, 255, 255, 0.1);
  border-bottom: 0.1dvw solid rgba(255, 255, 255, 0.1);
}

.marquee__inner {
  display: inline-block;
  white-space: nowrap;
  animation: scroll-left linear infinite;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee__inner span {
  margin-right: 0.5dvw;
  font-size: 1.3dvw;
  color: white;
  font-weight: 600;
  letter-spacing: 0.05dvw;
}
</style>
