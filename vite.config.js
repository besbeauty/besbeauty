import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/besbeauty/',
  build: {
    outDir: 'docs',
  },
  plugins: [vue()],
  define: {
    __VITE_PRIMARY_SHEET_ID__: JSON.stringify(
      process.env.VITE_PRIMARY_SHEET_ID || '',
    ),
    __VITE_PRIMARY_GOOGLE_API_KEY__: JSON.stringify(
      process.env.VITE_PRIMARY_GOOGLE_API_KEY || '',
    ),
    __VITE_FALLBACK_SHEET_ID__: JSON.stringify(
      process.env.VITE_FALLBACK_SHEET_ID || '',
    ),
    __VITE_FALLBACK_GOOGLE_API_KEY__: JSON.stringify(
      process.env.VITE_FALLBACK_GOOGLE_API_KEY || '',
    ),
  },
});
