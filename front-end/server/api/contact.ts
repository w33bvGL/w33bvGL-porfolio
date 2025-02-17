import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const acceptLanguage = event.node.req.headers['accept-language'] || 'en';

    if (!body.name || !body.email || !body.message) {
        return {
            success: false,
            message: 'Все поля обязательны для заполнения.',
        };
    }

    try {
        const response = await fetch(
            'http://localhost:49153/api/v1/contact/send',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': acceptLanguage,
                },
                body: JSON.stringify(body),
            },
        );

        if (!response.ok) {
            throw new Error('Ошибка при отправке сообщения');
        }

        return await response.json();
    } catch (error) {
        throw createError({
            statusCode: 400,
        });
    }
});
