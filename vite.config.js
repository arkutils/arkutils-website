import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [
        sveltekit(),
    ],

    ssr: {
        noExternal: ['devalue'],
        optimizeDeps: {
            exclude: [
                'cookie-storage',
            ],
        }
    }
};

export default config;
