<script setup lang="ts">
const socialLinks = [
  { name: 'Telegram', href: 'https://t.me/Vahesargsyan2005', icon: 'fa-brands:telegram' },
  { name: 'GitHub', href: 'https://github.com/w33bvGL', icon: 'fa-brands:github' },
  { name: 'Email', href: 'mailto:w33bv.gl@gmail.com', icon: 'fa-solid:envelope' },
]
</script>

<template>
  <div class="social-share-horizontal scroll-down-circle">
    <ul>
      <li v-for="(social, index) in socialLinks" :key="index">
        <a :href="social.href" :aria-label="social.name" target="_blank" rel="noopener noreferrer">
          <Icon :name="social.icon" class="social-icon" />
        </a>
      </li>
    </ul>
    <p>Follow Me</p>
  </div>
</template>

<style scoped>
.social-share-horizontal {
  padding: 2dvw 1dvw;
  position: absolute; bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1dvw;
  font-family: 'Poppins', sans-serif;
}

.social-share-horizontal ul {
  display: flex;
  flex-direction: column;
  gap: 0.7dvw;
  padding: 0;
  margin: 0;
  list-style: none;
}

.social-share-horizontal li a {
  color: var(--color-primary);
  font-size: 1dvw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2dvw;
  height: 2dvw;
  border-radius: 50%;
  border: 0.2dvw solid var(--color-primary);
  transition: all 0.3s ease;
}

.social-share-horizontal li a:hover {
  background-color: var(--color-primary);
  color: #fff;
  box-shadow: 0 0 10px var(--color-primary);
}

.social-icon {
  pointer-events: none;
}

.social-share-horizontal p {
  rotate: 180deg;
  font-size: 1dvw;
  writing-mode: vertical-rl;
  transform: rotate(360deg);
  text-align: center;
  color: var(--color-neutral-500);
  margin: 0;
}
</style>
