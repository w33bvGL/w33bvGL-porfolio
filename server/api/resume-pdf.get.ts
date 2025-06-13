import path from 'path'
import type { H3Event } from 'h3'
import puppeteer from 'puppeteer'
import fs from 'fs-extra'

export default async function (event: H3Event) {
  const query = getQuery(event)
  const supportedLangs = ['en', 'ru', 'hy']
  const lang = supportedLangs.includes(<string>query.lang) ? query.lang : 'en'

  const fileName = `resume-${lang}.pdf`
  const cacheDir = path.resolve('public/resume')
  const filePath = path.resolve(cacheDir, fileName)

  if (fs.existsSync(filePath)) {
    return sendPDF(event, filePath)
  }

  await fs.ensureDir(cacheDir)

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()

  const host = 'vahe.anidzen.com'
  const protocol = host?.includes('localhost') ? 'http' : 'https'
  const url = `${protocol}://${host}/${lang}/resume?`

  await page.goto(url, { waitUntil: 'networkidle0' })

  await page.pdf({
    path: filePath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' }
  })

  await browser.close()

  return sendPDF(event, filePath)
}

function sendPDF(event: H3Event, filePath: string) {
  const stream = fs.createReadStream(filePath)
  event.node.res.setHeader('Content-Type', 'application/pdf')
  event.node.res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`)
  return sendStream(event, stream)
}
