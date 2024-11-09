import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  server: {port: 4443},
  test: {environment: 'jsdom'},
  plugins: [tsconfigPaths(), vanillaExtractPlugin(), solid()],
})
