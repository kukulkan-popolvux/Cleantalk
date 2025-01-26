import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    
    plugins: [
        laravel({
            input: ['resources/scss/index.scss', 'resources/js/app.js'],
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public/build',
        manifest: 'manifest.json',
        rollupOptions: {
            input: ['resources/js/app.js', 'resources/scss/index.scss',]
        },
    },
});
