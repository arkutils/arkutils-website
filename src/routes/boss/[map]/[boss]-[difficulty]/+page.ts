import { redirect } from '@sveltejs/kit';

import { boss_data } from '$lib/boss/data';
import type { Difficulty } from '$lib/boss/types';
import { isSingleDifficulty } from '$lib/boss/utils';

import type { PageLoad } from './$types';

/** A load function that looks up [map] and [boss] to find boss data */
export const load: PageLoad = async ({ params }) => {
    // Grab the params from the URL
    const { map, boss, difficulty } = params;

    // See if we have data for this map-boss-difficulty
    const data = boss_data[map]?.bosses[boss];
    if (!data) {
        // Not found, so redirect to the main boss page
        throw redirect(308, '/boss');
    }

    if (isSingleDifficulty(data) || !(difficulty in data.species)) {
        // This boss doesn't have difficulties
        throw redirect(308, `/boss/${map}/${boss}`);
    }

    // Got everything, render it
    return {
        map,
        boss,
        difficulty: difficulty as Difficulty,
    };
};
