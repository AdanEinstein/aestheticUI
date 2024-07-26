import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import * as EsLint from 'vite-plugin-linter'
import tsConfigPaths from 'vite-tsconfig-paths'
const { EsLinter, linterPlugin } = EsLint
import * as packageJson from './package.json'

export default defineConfig((configEnv) => ({
  resolve: {
    alias: {
      "@adaneinstein/aesthetic-ui": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ['./src}/**/*.{ts,tsx}'],
      linters: [new EsLinter({ configEnv })],
    }),
    dts({
      include: [
        // 'src/components/BasicModal',
        // 'src/components/DataGrid',
        // 'src/components/FilterCard',
        // 'src/components/Forms',
        // 'src/components/Layout/Card',
        // 'src/components/Layout/Nav',
        // 'src/components/Layout/Navbar',
        // 'src/components',
        // 'src/utils',
        'src/'
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve('src', 'index.ts'),
      // {
      //   components: resolve('src', 'components/index.ts'),
      //   utils: resolve('src', 'utils/index.ts'),
      //   BasicModal: resolve('src', 'components/BasicModal/index.tsx'),
      //   DataGrid: resolve('src', 'components/DataGrid/index.tsx'),
      //   FilterCard: resolve('src', 'components/FilterCard/index.tsx'),
      //   Forms: resolve('src', 'components/Forms/index.ts'),
      //   Card: resolve('src', 'components/Layout/Card/index.tsx'),
      //   Nav: resolve('src', 'components/Layout/Nav/index.tsx'),
      //   Navbar: resolve('src', 'components/Layout/Navbar/index.tsx'),
      // },
      name: '@adaneinstein/aesthetic-ui',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
  
}))
