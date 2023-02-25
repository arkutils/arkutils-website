// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        preprocess({
            postcss: true
        })
    ],

    kit: {
        adapter: adapter({
            // fallback: 'index.html',
        }),
        prerender: {
            crawl: true,
            origin: "https://arkutils.netlify.app",
            entries: [
                "*", // all non-parameterized pages
                "/tools/wildstats/150/6", // we prerender the common wildstats pages
                "/tools/wildstats/150/7",
                "/tools/wildstats/150/8",
                "/tools/wildstats/217/6",
                "/tools/wildstats/217/7",
                "/tools/wildstats/217/8",
                "/tools/wildstats/224/6",
                "/tools/wildstats/224/7",
                "/tools/wildstats/224/8",
            ]
        }
    }
};

export default config;
