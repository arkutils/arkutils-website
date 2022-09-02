import { loadAll } from "@square/svelte-store";

import { getItemByClass, getWikiItemsStore, type Item } from "$lib/obelisk/wiki/items";
import { getSpecies, getWikiSpeciesStore } from "$lib/obelisk/wiki/species";

import { boss_data, item_data } from "./data";
import type { Difficulty } from "./types";
import { bossDifficulties } from "./utils";


export type SearchResult = MapResult | BossResult | ItemResult;

export type MapResult = {
    type: 'map',
    map: string,
};

export type BossResult = {
    type: 'boss',
    map: string,
    boss: string,
    difficulty: Difficulty | undefined,
};

export type ItemResult = {
    type: 'item',
    map: string,
    boss: string,
    difficulty: Difficulty | undefined,
    item: Item,
};

const FIND_LIMIT = 50;


export class AbortTriggered extends Error {
    constructor(msg = "Abort triggered") {
        super(msg);
        Object.setPrototypeOf(this, AbortTriggered.prototype);
    }
}

export function shouldPerformSearch(query: string) {
    return query && query.length > 2;
}

export type AbortToken = {
    triggered: boolean;
};

export async function* performSearch(query: string, abort: { triggered: boolean } | undefined = undefined): AsyncGenerator<SearchResult> {
    const terms = prepareTerms(query);

    let found = 0;

    // Check all maps, then all bosses in each map, then all engrams for each boss
    for (const [mapId, map] of Object.entries(boss_data)) {
        // Check our abort trigger
        if (abort?.triggered) throw new AbortTriggered();

        // Start loading all relevant mod files
        // (we check they're loaded later before using them)
        const speciesModIds = ['', ...map.extraSpeciesModIds ?? []];
        const itemsModIds = ['', ...map.extraItemsModIds ?? []];
        /* unawaited */ loadAll([
            ...speciesModIds.map(id => getWikiSpeciesStore(id)),
            ...itemsModIds.map(id => getWikiItemsStore(id)),
        ]);

        // Check for matching map names
        const mapMatch = termsMatchValue(terms, map.display);
        if (mapMatch) {
            yield { type: 'map', map: mapId };
            if (found++ > FIND_LIMIT) return;
        }

        // Step through every map, boss, difficulty and engram
        for (const [bossId, boss] of Object.entries(map.bosses)) {
            for (const [difficulty, difficultyData] of bossDifficulties(boss)) {
                // Check our abort trigger
                if (abort?.triggered) throw new AbortTriggered();

                // Check for a match across difficulty, boss name and map name
                const bossMatch = termsMatchValue(terms, difficulty, boss.display, boss.searchTerms, map.display);
                if (bossMatch) {
                    yield { type: 'boss', map: mapId, boss: bossId, difficulty };
                    if (found++ > FIND_LIMIT) return;
                }

                // If we matched at the map level, don't descend into engrams
                if (mapMatch || bossMatch) continue;

                // Look up the species (in its particular mod's data file)
                await loadAll(speciesModIds.map(id => getWikiSpeciesStore(id)));
                const species = await getSpecies(difficultyData.bp + '_C');

                // Engrams are a combination of data from the species plus manually added engrams
                const engrams = [...species?.death?.engrams ?? [], ...difficultyData.manualEngrams ?? []];
                if (!engrams || !engrams.length) continue;

                // Before we go through looking at them, ensure the relevant item files are fully loaded
                await loadAll(itemsModIds.map(id => getWikiItemsStore(id)));

                // For each engram, ensure the relevant items are loaded then look it up by class
                for (const engramCls of engrams) {
                    // Check our abort trigger
                    if (abort?.triggered) throw new AbortTriggered();

                    // Look up them item by class
                    const item = getItemByClass(engramCls);

                    // Check for matching item name
                    if (termsMatchValue(terms, item?.name, item_data[engramCls]?.searchTerms, difficulty, boss.display, map.display)) {
                        yield { type: 'item', item: item, difficulty, boss: bossId, map: mapId };
                        if (found++ > FIND_LIMIT) return;
                    }
                }
            }
        }
    }
}


function prepareTerms(query: string): string[] {
    const terms = query.split(/\s+/).map(term => term.toLowerCase());
    return terms;
}

function termsMatchValue(terms: string[], ...queryParts: Array<string | undefined>): boolean {
    if (!queryParts || !queryParts.length) return false;

    const query = queryParts.map(v => v?.toLowerCase() ?? '').join(' ');

    // Bail if any terms don't match
    for (const term of terms) {
        if (term.startsWith('-')) {
            // Terms starting - are negative matches
            if (query.includes(term.substring(1))) return false;
        } else {
            // Terms not starting - are positive matches
            if (query.indexOf(term) === -1) return false;
        }
    }

    // Everything matched
    return true;
}
