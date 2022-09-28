import { redirect } from '@sveltejs/kit';

import { LEVEL_MAX, LEVEL_MIN } from '$lib/wildstats/Page.svelte';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    // Grab the params from the URL
    const { level, stats } = params;

    try {
        const levelNum = parseInt(level, 10);
        const statsNum = parseInt(stats, 10);

        if (levelNum >= LEVEL_MIN && levelNum <= LEVEL_MAX && statsNum >= 6 && statsNum <= 8) {
            return {
                level: levelNum,
                stats: statsNum,
            };
        }
    } catch (e) {
        // Do nothing
    }

    // Not found or bad format, so redirect to the main page
    throw redirect(308, '/tools/wildstats');
};