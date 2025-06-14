import path from 'path'
import type { H3Event } from 'h3'
import {
  eventHandler,
  sendStream,
  getQuery,
  createError,
  sendError
} from 'h3'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'

export default eventHandler(async (event: H3Event) => {
  try {
    console.log('🚀 Старт генерации/отдачи резюме PDF')

    const query = getQuery(event)
    const supportedLangs = ['en', 'ru', 'hy']
    const lang = supportedLangs.includes(<string>query.lang) ? query.lang : 'en'
    console.log('🌐 Язык:', lang)

    const fileName = `resume-${lang}.pdf`
    const filePath = path.resolve(process.cwd(), 'public/resume', fileName)

    console.log('📁 Ищем файл в dev:', filePath)

    console.log('🛠 Генерируем PDF (режим разработки)')
    await fs.ensureDir(path.dirname(filePath))

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()
    const url = `http://localhost:3000/${lang}/resume`
    console.log('🌐 Открываем страницу:', url)

    await page.goto(url, { waitUntil: 'networkidle0' })

    await page.pdf({
      path: filePath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' }
    })

    await browser.close()
    console.log('✅ PDF сгенерирован:', filePath)

    return sendPDF(event, filePath)
  } catch (error) {
    console.error('❌ Ошибка при обработке PDF:', error)
    return sendError(
      event,
      createError({ statusCode: 500, message: 'Internal Server Error' })
    )
  }
})

function sendPDF(event: H3Event, filePath: string) {
  const stream = fs.createReadStream(filePath)
  event.node.res.setHeader('Content-Type', 'application/pdf')
  event.node.res.setHeader(
    'Content-Disposition',
    `attachment; filename=${path.basename(filePath)}`
  )
  return sendStream(event, stream)
}
