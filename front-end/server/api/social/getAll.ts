import {defineEventHandler, readBody} from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const response = await fetch('http://localhost:49153/api/v1/social', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            throw new Error('Ошибка при отправке сообщения')
        }

        return await response.json()
    } catch (error) {
        return { success: false, message: 'Не удалось отправить сообщение. Попробуйте позже.' }
    }
})
