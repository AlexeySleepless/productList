import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    css: {
        postcss: {
            plugins: [autoprefixer],
        },
    },
});
