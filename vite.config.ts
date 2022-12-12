/// <reference types="vitest" />

import reactPlugin from '@vitejs/plugin-react'
import { UserConfig } from 'vite'

const config: UserConfig = {
  base: './',
  plugins: [reactPlugin()],
  test: {
    environment: 'jsdom'
  }
}

export default config
