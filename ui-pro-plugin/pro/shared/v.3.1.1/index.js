import { resolve, join } from 'path'
import fs from 'fs-extra'

const UI_PRO_DIR = resolve('node_modules', '@nuxt', 'ui-pro')

const LICENSE_SOURCE_PATH = resolve(
  'ui-pro-plugin',
  'pro',
  'shared',
  'v.3.1.1',
  'ui-pro.BvhO-FJN.mjs'
)

const LICENSE_DEST_PATH = join(
  UI_PRO_DIR,
  'dist',
  'shared',
  'ui-pro.BvhO-FJN.mjs'
)

async function rewriteLicenseFile() {
  try {
    if (!(await fs.pathExists(UI_PRO_DIR))) {
      console.log(`ui-pro not found in node_modules: ${UI_PRO_DIR}`)
      return
    }

    console.log(`ui-pro found. Rewriting files...`)

    const licenseContent = await fs.readFile(LICENSE_SOURCE_PATH, 'utf-8')
    await fs.outputFile(LICENSE_DEST_PATH, licenseContent)

    console.log('✅ License files successfully rewritten!')
  } catch (error) {
    console.error('❌ Error while rewriting files:', error)
  }
}

rewriteLicenseFile().then((r) => {})
