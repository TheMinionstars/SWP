import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'url'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        { find: '@app', replacement: fileURLToPath(new URL('./src/app', import.meta.url)) },
        { find: '@components', replacement: fileURLToPath(new URL('./src/app/components', import.meta.url)) },
        { find: '@layouts', replacement: fileURLToPath(new URL('./src/app/layouts', import.meta.url)) },
        { find: '@pages', replacement: fileURLToPath(new URL('./src/app/pages', import.meta.url)) },
        { find: '@hooks', replacement: fileURLToPath(new URL('./src/app/hooks', import.meta.url)) },
        { find: '@redux', replacement: fileURLToPath(new URL('./src/app/redux', import.meta.url)) }
      ]
    },
    plugins: [react(), ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') })],
    server: {
      port: Number(env.VITE_PORT)
    }
  }
})
