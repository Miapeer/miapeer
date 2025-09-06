import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit(), purgeCss()],
    server: {
        port: 8001
    },
    preview: {
        allowedHosts: ['www.miapeer.com', 'miapeer.com'],
    }
});
