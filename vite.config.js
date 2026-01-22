import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://89.23.113.61',
                changeOrigin: true,
                secure: false
            }
        }
    },
    resolve: {
        alias: {
            '@components': '/src/components',
            '@providers': '/src/providers',
            '@api': '/src/api',
            '@hooks': '/src/hooks',
            '@utils': '/src/utils',
            '@styles': '/src/styles',
            '@pages': '/src/pages'
        }
    }
});