import { resolve as _resolve, dirname } from 'path'
import { spawn } from 'child_process'
import http from 'http'
import { launch } from 'puppeteer'
import fs from 'fs-extra'

const langs = ['en', 'ru', 'hy']
const baseUrl = 'http://localhost:3000'

function waitForServerReady(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const start = Date.now()

    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200) resolve()
        else retry()
      }).on('error', retry)
    }

    const retry = () => {
      if (Date.now() - start > timeout) reject(new Error('Сервер не поднялся за 10 секунд'))
      else setTimeout(check, 500)
    }

    check()
  })
}

async function generatePDFs() {
  const serve = spawn('npx', ['serve', '.output/public', '-l', '3000'], {
    stdio: 'inherit',
    shell: true
  })

  await waitForServerReady(`${baseUrl}/en/resume`)

  const browser = await launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()

  for (const lang of langs) {
    const url = `${baseUrl}/${lang}/resume`
    const filename = `resume-${lang}.pdf`

    const localPath = _resolve('public/resume', filename)
    const outputPath = _resolve('.output/public/resume', filename)

    await page.goto(url, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' }
    })

    await fs.ensureDir(dirname(localPath))
    await fs.ensureDir(dirname(outputPath))

    await fs.writeFile(localPath, pdfBuffer)
    await fs.writeFile(outputPath, pdfBuffer)

    console.log(`✅ PDF для [${lang}] сохранён в:\n - ${localPath}\n - ${outputPath}`)
  }

  await browser.close()
  serve.kill()
}

generatePDFs().catch((err) => {
  console.error('❌ Ошибка при генерации PDF:', err)
  process.exit(1)
})
