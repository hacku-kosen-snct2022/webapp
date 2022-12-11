import reactPlugin from '@vitejs/plugin-react'
import { UserConfig } from 'vite'

const config: UserConfig = {
  base: './',
  plugins: [reactPlugin()]
}

export default config
