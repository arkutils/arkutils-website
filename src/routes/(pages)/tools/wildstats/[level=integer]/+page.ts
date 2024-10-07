import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';


export const prerender = false;

export const load: PageLoad = async ({ params }) => {
    // Grab the params from the URL
    const { level } = params;

    try {
        const levelNum = parseInt(level, 10);
        if (levelNum >= 30 && levelNum <= 400) {
            return {
                level: levelNum,
            };
        }
    } catch (e) {
        // Do nothing
    }

    // Not found, so redirect to the main page
    redirect(308, '/wildstats');
};
