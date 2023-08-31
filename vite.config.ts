import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import EsLint from 'vite-plugin-linter'
import tsConfigPaths from 'vite-tsconfig-paths'
const { EsLinter, linterPlugin } = EsLint
import * as packageJson from './package.json'

export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ['./src}/**/*.{ts,tsx}'],
      linters: [new EsLinter({ configEnv })],
    }),
    dts({
      include: ['src/component/', 'src/utils/'],
    }),
  ],
  build: {
    lib: {
      entry: [resolve('src', 'utils/index.ts'), resolve('src', 'component/index.ts')],
      name: '@adaneinstein/aesthetic-ui',
      formats: ['es', 'umd'],
      fileName: (format) => `@adaneinstein-aesthetic-ui.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}))
