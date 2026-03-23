import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function injectLlmsTxt() {
  return {
    name: 'inject-llms-txt',
    transformIndexHtml(html) {
      const llmsPath = resolve(__dirname, 'public/llms.txt')
      const llmsContent = readFileSync(llmsPath, 'utf-8')

      const noscriptBlock = `<noscript><div id="llms-content" style="white-space:pre-wrap">${llmsContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div></noscript>`

      return html.replace('</body>', `${noscriptBlock}\n</body>`)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    injectLlmsTxt(),
  ],
})
