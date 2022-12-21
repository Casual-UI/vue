import { resolve } from 'path'
import { defineConfig } from 'vite'

const CWD_PATH = process.cwd()

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: 'dist',
    lib: {
      entry: resolve(CWD_PATH, './src/import-style.ts'),
      name: 'CasualUIVue',
      fileName: format => `import-style.${format}.js`,
    },
  },
})
