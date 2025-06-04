<script setup lang="ts">
interface Project {
  title: string;
  image: string;
}

const props = defineProps({
  direction: {
    type: String as () => 'normal' | 'reverse',
    default: 'normal',
  },
});

const { data: projectsData } = await useAsyncData<Project[]>(
    'projects',
    () => $fetch('/api/projects')
);

const repeatedProjects = computed(() => {
  return [...(projectsData.value || []), ...(projectsData.value || [])];
});

const directionClass = computed(() => {
  return props.direction === 'reverse' ? 'reverse' : '';
});
</script>

<template>
  <div class="marquee-vertical-wrapper">
    <div :class="['marquee-vertical', directionClass]">
      <ul>
        <li v-for="(project, index) in repeatedProjects" :key="index" class="project-item">
          <img :src="project.image" :alt="project.title" />
          <span>{{ project.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.marquee-vertical-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  opacity: 0.7;
  padding: 0.4dvw;
}

.marquee-vertical {
  display: inline-block;
  width: 100%;
  animation: marquee-vertical 10s linear infinite;
}

.marquee-vertical.reverse {
  animation: marquee-vertical-reverse 10s linear infinite;
}

.marquee-vertical ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.project-item {
  display: flex;
  align-items: center;
  border-radius: 0.5dvw;
  border: 0.2dvw solid var(--color-cog-900);
  margin-bottom: 0.8dvw;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.project-item:hover {
  background-color: #333;

  img {
    scale: 1.1;
  }

  span {
    color: var(--color-primary);
  }
}

.project-item img {
  width: 100%;
  aspect-ratio: 1/0.6;
  object-fit: cover;
  transition-duration: 0.3s;
}

.project-item span {
  flex: 1;
  width: 100%;
  font-size: 1.1dvw;
  position: absolute;
  transition-duration: 0.3s;
  white-space: nowrap;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.6);
  bottom: 0;
  padding: 0.6dvw 1dvw;
  font-weight: bold;
  text-overflow: ellipsis;
}

@keyframes marquee-vertical {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes marquee-vertical-reverse {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
