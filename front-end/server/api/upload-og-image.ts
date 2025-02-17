import { defineEventHandler, readBody } from 'h3';
import path from 'node:path';
import * as fs from 'node:fs';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const base64Data = body.image.replace(/^data:image\/png;base64,/, '');

        const filePath = path.resolve('public', 'og-image.png');

        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
                console.error('Ошибка при сохранении изображения:', err);
                return { message: 'Failed to save image' };
            }
            console.log('Изображение успешно сохранено');
            return { message: 'Image saved successfully' };
        });
    } catch (error) {
        console.error('Ошибка:', error);
        return { message: 'Error processing the image' };
    }
});
