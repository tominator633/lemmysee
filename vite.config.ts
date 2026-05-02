import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';



export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Lemmysee',
        short_name: 'Lemmysee',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: "#005792",
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
  }
});