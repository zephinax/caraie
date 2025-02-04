import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo: { name?: string }) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';

          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `public/images/[name]-[hash][extname]`;
          }

          return `piblic/[name]-[hash][extname]`;
        },
      },
    },
  },
});
