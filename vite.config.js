import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/Perfumin/',
  build: {
    outDir: 'docs',
  },
  plugins: [vue()],
});
