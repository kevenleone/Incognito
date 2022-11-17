import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './lib/incognito.ts',
      name: 'Incognito',
      fileName: 'incognito',
    },
  },
});
