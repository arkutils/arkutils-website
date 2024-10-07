import { redirect } from '@sveltejs/kit';

import { boss_data } from '$lib/boss/data';
import type { BossMap } from '$lib/boss/types';

import type { PageLoad } from './$types';

/** A load function that looks up and validates [map] */
export const load: PageLoad<{ mapId: string, map: BossMap }> = async ({ params }) => {
    // Grab the params from the URL
    const { map } = params;

    // See if we have data for this map-boss-difficulty
    const data = boss_data[map];
    if (!data) {
        // Not found, so redirect to the main boss page
        redirect(308, '/boss');
    }

    // Got everything, render it
    return {
        mapId: map,
        map: data,
    };
};
