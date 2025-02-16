import {defineEventHandler, readBody} from 'h3'
import path from "node:path";
import * as fs from "node:fs";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const base64Data = body.image.replace(/^data:image\/png;base64,/, '')

    const filePath = path.resolve('public', 'og-image.png')

    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
                return reject({ message: 'Failed to save image' })
            }
            resolve({ message: 'Image saved successfully', url: '/og-image.png' })
        })
    })
})
