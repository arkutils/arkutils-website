import { boss_data } from '$lib/boss/data';
import { isSingleDifficulty } from '$lib/boss/utils';
import { redirect } from '@sveltejs/kit';

import type { PageLoad } from './$types';

/** A load function that looks up [map] and [boss] to find boss data */
export const load: PageLoad = async ({ params }) => {
    // Grab the params from the URL
    const { map, boss } = params;

    // See if we have data for this map-boss without difficulty
    try {
        const data = boss_data[map].bosses[boss];

        if (isSingleDifficulty(data)) {
            // This boss doesn't need difficulty, so we're good
            return {
                map,
                boss,
            };
        }

        // This boss has difficulties, so redirect to gamma by default
        redirect(308, `/boss/${map}/${boss}-gamma`);
    } catch {
        // ignore
    }

    // Not found, so redirect to the main boss page
    redirect(308, '/boss');
};
