import { defineEventHandler, readBody } from 'h3'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.name || !body.email || !body.message) {
        return { success: false, message: 'Все поля обязательны для заполнения.' }
    }

    try {
        const response = await fetch('https://твой-бэкенд.com/api/v1/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw new Error('Ошибка при отправке сообщения')
        }

        return { success: true, message: 'Сообщение успешно отправлено!' }
    } catch (error) {
        return { success: false, message: 'Не удалось отправить сообщение. Попробуйте позже.' }
    }
})
