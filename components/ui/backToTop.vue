<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';

const isActive = ref(false);

const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
};

onMounted(() => {
    const progressPath = document.querySelector('.progress-wrap path') as SVGPathElement;

    if (!progressPath) {
        console.error('Элемент .progress-wrap path не найден!');
        return;
    }

    const pathLength = progressPath.getTotalLength();

    // Настройка пути SVG
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = `${pathLength}`;

    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = pathLength - (scrollTop * pathLength) / docHeight;
        progressPath.style.strokeDashoffset = `${progress}`;

        // Условие для отображения кнопки
        isActive.value = scrollTop > 50;
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    onUnmounted(() => {
        window.removeEventListener('scroll', updateProgress);
    });
});
</script>

<template>
    <div class="progress-wrap"
         :class="{ 'active-progress': isActive }"
         @click="scrollToTop"
    >
        <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
        </svg>
    </div>
</template>

<style scoped lang="scss">
.progress-wrap {
    position: fixed;
    right: 30px;
    bottom: 30px;
    height: 46px;
    width: 46px;
    cursor: pointer;
    display: block;
    border-radius: 50px;
    z-index: 10000;
    opacity: 1;
    visibility: hidden;
    transform: translateY(15px);
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
    mix-blend-mode: exclusion;
}

.progress-wrap.active-progress {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.progress-wrap::after {
    position: absolute;
    content: '➜';
    transform: rotate(-90deg);
    text-align: center;
    line-height: 46px;
    font-size: 24px;
    color: var(--color-primary);
    left: 0;
    top: 0;
    height: 46px;
    width: 46px;
    cursor: pointer;
    display: block;
    z-index: 1;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
    border: 0px solid var(--color-primary);
    box-shadow: none;
    border-radius: 50% !important;
    border-radius: 5px;
}

.progress-wrap:hover::after {
    opacity: 1;
    content: '➜';
    border: 0 solid var(--color-primary);
}

.progress-wrap::before {
    position: absolute;
    content: '➜';
    text-align: center;
    line-height: 46px;
    font-size: 24px;
    opacity: 0;
    background: var(--color-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    left: 0;
    top: 0;
    height: 46px;
    width: 46px;
    cursor: pointer;
    display: block;
    z-index: 2;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
    mix-blend-mode: exclusion;
}

.progress-wrap:hover::before {
    opacity: 0;
}

.progress-wrap svg path {
    fill: none;
}

.progress-wrap svg {
    color: var(--color-primary);
    border-radius: 50%;
    background: #ededed;
    mix-blend-mode: exclusion;
}

.progress-wrap svg.progress-circle path {
    stroke: var(--color-primary);
    stroke-width: 0;
    box-sizing: border-box;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}

.home-blue {
    .progress-wrap svg.progress-circle path {
        stroke: var(--color-primary-2);
    }

    .progress-wrap::after {
        border-color: var(--color-primary-2);
        box-shadow: 0px 3px 20px 6px #0742e952;
        color: var(--color-primary-2);
    }
}
</style>
