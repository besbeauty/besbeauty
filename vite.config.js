import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/Perfumin/',
  build: {
    outDir: 'docs',
  },
  plugins: [vue()],
  define: {
    __VITE_SHEET_ID__: JSON.stringify(process.env.VITE_SHEET_ID || ''),
    __VITE_GOOGLE_API_KEY__: JSON.stringify(
      process.env.VITE_GOOGLE_API_KEY || '',
    ),
  },
});
