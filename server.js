const express = require('express');
const i18next = require('i18next');
const path = require('path');

// Инициализация i18next
i18next.init({
    lng: 'en', // Устанавливаем язык по умолчанию
    fallbackLng: 'en', // Язык по умолчанию, если перевод не найден
    resources: {
        en: {
            translation: {
                "greeting": "Hello, world!",
                "footer": "This is the footer text."
            }
        },
        de: {
            translation: {
                "greeting": "Hallo, Welt!",
                "footer": "Dies ist der Fußzeilentext."
            }
        }
    }
});

const app = express();

// Роут для главной страницы
app.get('/', (req, res) => {
    const lang = req.query.lang || 'en'; // Язык можно передавать через параметр URL
    i18next.changeLanguage(lang); // Меняем язык в i18next на основе запроса

    // Генерация HTML с переводом
    const html = `
        <!DOCTYPE html>
        <html lang="${lang}">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Localized Page</title>
        </head>
        <body>
            <h1>${i18next.t('greeting')}</h1>
            <footer>
                <p>${i18next.t('footer')}</p>
            </footer>
        </body>
        </html>
    `;

    // Отправляем HTML клиенту
    res.send(html);
});

// Старт сервера
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
