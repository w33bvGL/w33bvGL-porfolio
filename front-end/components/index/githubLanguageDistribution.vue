<script setup lang="ts">
import {useI18n} from "#i18n";
const { t, locale } = useI18n();

const { data } = await useAsyncData("github-profile-languages", () =>
    $fetch("/api/user/github/languages", {
      method: "GET",
      headers: { "Accept-Language": locale.value },
    })
);

const colors = [
  "#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40",
  "#f67019", "#70d6ff", "#ffd670", "#ff7070", "#c0c0c0", "#8b0000",
  "#228b22", "#4682b4", "#da70d6", "#32cd32"
];

const drawChart = () => {
  const canvas = document.getElementById("githubChart") as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;

  let startAngle = 0;
  const total = Object.values(data.value).reduce((acc, val) => acc + val, 0);

  Object.entries(data.value).forEach(([lang, percent], index) => {
    const sliceAngle = (percent / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();

    const textAngle = startAngle + sliceAngle / 2;
    const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
    const textY = centerY + Math.sin(textAngle) * (radius * 0.7);

    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(lang, textX, textY);

    startAngle += sliceAngle;
  });
};

onMounted(() => {
  drawChart();
});
</script>

<template>
  <UCard class="w-2/3">
    <div>
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">Статистика языков</h2>
<!--      <canvas id="githubChart" width="300" height="300"></canvas>-->
      <div>
        <div class="grid grid-cols-4 gap-5">
          <div class="flex items-center gap-1" v-for="(percent, lang, index) in data" :key="lang">
            <span class="min-w-4 h-4 inline-block rounded-sm" :style="{ backgroundColor: colors[index % colors.length] }"></span>
            <span class="text-nowrap w-full">{{ lang }} - {{ percent }}%</span>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>