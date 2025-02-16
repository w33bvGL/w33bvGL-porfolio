<script setup>
import { ref } from 'vue'

const canvas = ref(null)

const generateOgImage = async () => {
  const ctx = canvas.value.getContext('2d')

  // Рисуем фон
  ctx.fillStyle = '#f4f4f4' // Цвет фона
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // Добавляем текст
  ctx.fillStyle = '#333' // Цвет текста
  ctx.font = '80px Arial'
  ctx.fillText('OG Image Example', 100, 500)

  // Генерируем Data URL изображения
  const dataURL = canvas.value.toDataURL('image/png')

  await uploadOgImage(dataURL)
}

const uploadOgImage = async (dataURL) => {
  try {
    const response = await $fetch('/api/upload-og-image', { image: dataURL })
    console.log('Image saved:', response)
  } catch (error) {
    console.error('Error uploading image:', error)
  }
}
</script>


<template>
  <div>
    <canvas ref="canvas" width="1920" height="1080"></canvas>
    <button @click="generateOgImage">Сгенерировать OG Image</button>
  </div>
</template>

