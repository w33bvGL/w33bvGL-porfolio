import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        const response = await fetch(
            'http://localhost:49153/api/v1/footer/qoutes',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            },
        );

        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }

        return await response.json();
    } catch (error) {
        return {
            success: false,
            message: 'Не удалось получить данные. Попробуйте позже.',
        };
    }
});
