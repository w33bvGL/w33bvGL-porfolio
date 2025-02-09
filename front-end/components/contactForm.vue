<script setup lang="ts">
import { z } from 'zod';

const schema = z.object({
  name: z.string()
      .min(2, 'Имя должно содержать минимум 2 символа')
      .max(50, 'Имя не должно превышать 50 символов')
      .regex(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Имя должно содержать только буквы'),
  email: z.string()
      .email('Введите корректный email')
      .max(100, 'Email не должен превышать 100 символов'),
  message: z.string()
      .min(100, 'Сообщение должно содержать минимум 100 символов')
      .max(1000, 'Сообщение не должно превышать 1000 символов')
})

const state = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = async () => {
  try {
    const res = await $fetch('/api/contact', {
      method: 'POST',
      body: state,
    })

    if (res.success) {
      alert('Сообщение успешно отправлено!')
    } else {
      alert('Ошибка: ' + res.message)
    }
  } catch (error) {
    alert('Произошла ошибка при отправке сообщения.')
  }
}
</script>

<template>
  <UCard class="mt-5">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex flex-col">
        <h2 class="text-4xl font-bold mb-4 text-center md:text-left">Связаться со мной</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Я всегда открыт для новых проектов, идей и возможностей для сотрудничества. Если у вас есть интересный проект или задача, которую нужно решить, не стесняйтесь обращаться! Я с радостью помогу вам воплотить ваши идеи в реальность
        </p>
        <ul class="mt-4 space-y-2">
          <li><strong class="font-medium">Telegram:</strong> <UButton variant="link" :padded="false" to="https://t.me/Vahesargsyan2005">@Vahesargsyan2005</UButton></li>
          <li><strong class="font-medium">Номер телефона:</strong> <UButton variant="link" :padded="false" to="tel:+37494161331">+374(94) 161-331</UButton></li>
          <li><strong class="font-medium">Электронная почта:</strong> <UButton variant="link" :padded="false" to="mailto:w33bv.gl@gmail.com">w33bv.gl@gmail.com</UButton></li>
        </ul>
      </div>
      <div class="flex flex-col">
        <h2 class="text-4xl font-bold mb-4 text-center md:text-left">Напишите мне</h2>
        <UForm @submit.prevent="handleSubmit" :schema="schema" :state="state">
          <UFormGroup label="Ваше имя" name="name" size="xl">
            <UInput v-model="state.name" size="xl" placeholder="Введите ваше имя" required />
          </UFormGroup>
          <UFormGroup label="Ваш email" name="email" class="mt-4" size="xl">
            <UInput v-model="state.email" size="xl" placeholder="Введите ваш email" required />
          </UFormGroup>
          <UFormGroup label="Ваше сообщение" name="message" class="mt-4" size="xl">
            <UTextarea v-model="state.message" size="xl" placeholder="Напишите ваше сообщение" required />
          </UFormGroup>
          <UButton type="submit" size="xl" class="mt-4 px-8 bg-primary text-white rounded-xl hover:bg-primary-dark">
            Отправить сообщение
          </UButton>
        </UForm>
      </div>
    </div>
  </UCard>
</template>
