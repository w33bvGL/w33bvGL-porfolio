<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const handleSubmit = () => {
  if (name.value && email.value && message.value) {
    alert('Сообщение отправлено!')
  } else {
    alert('Пожалуйста, заполните все поля!')
  }
}
</script>

<template>
    <UCard class="mt-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div class="flex flex-col items-start">
          <h2 class="text-4xl font-bold mb-4">Связаться со мной</h2>
          <p class="text-gray-600 dark:text-gray-400">Я всегда открыт для новых проектов, идей и возможностей для сотрудничества. Если у вас есть интересный проект или задача, которую нужно решить, не стесняйтесь обращаться! Я с радостью помогу вам воплотить ваши идеи в реальность</p>
          <ul class="mt-4 space-y-2">
            <li><strong class="font-medium">Telegram:</strong> <UButton variant="link" :padded="false" to="https://t.me/Vahesargsyan2005">@Vahesargsyan2005</UButton></li>
            <li><strong  class="font-medium">Номер телефона:</strong>  <UButton variant="link" :padded="false" to="tel:+1234567890">+374(94) 161-331</UButton></li>
            <li><strong  class="font-medium">Электронная почта:</strong>  <UButton variant="link" :padded="false" to="mailto:w33bv.gl@gmail.com">w33bv.gl@gmail.com</UButton></li>
          </ul>
        </div>

        <div class="flex flex-col">
          <h2 class="text-4xl font-bold mb-4">Напишите мне</h2>
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label for="name" class="block font-medium mb-1">Ваше имя</label>
              <UInput
                  v-model="name"
                  size="xl"
                  placeholder="Введите ваше имя"
                  class="mt-2 w-full"
                  required
              />
            </div>

            <div class="mb-4">
              <label for="email" class="block font-medium mb-1">Ваш email</label>
              <UInput
                  v-model="email"
                  size="xl"
                  placeholder="Введите ваш email"
                  class="mt-2 w-full "
                  required
              />
            </div>

            <div class="mb-4">
              <label for="message" class="block font-medium mb-1">Ваше сообщение</label>
              <UTextarea
                  v-model="message"
                  id="message"
                  size="xl"
                  placeholder="Напишите ваше сообщение"
                  required
              ></UTextarea>
            </div>

            <UButton type="submit" size="xl" class="px-8 bg-primary text-white rounded-xl hover:bg-primary-dark">
              Отправить сообщение
            </UButton>
          </form>
        </div>
      </div>
    </UCard>
</template>

<style scoped>
</style>
