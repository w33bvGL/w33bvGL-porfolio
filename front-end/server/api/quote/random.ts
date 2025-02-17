import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const acceptLanguage = event.node.req.headers['accept-language'] || 'en';

    try {
        const response = await fetch(
            'http://localhost:49153/api/v1/quote/random',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': acceptLanguage,
                },
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
