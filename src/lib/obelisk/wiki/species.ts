import { processedWikiStore } from "./internal";


export type Lootbag = {
    chance?: number;
    item: string;
};

export type Death = {
    dossierId?: number;
    engrams?: string[];
    baseXP?: number;
    lootBagChance?: number;
    lootBags?: Lootbag[];
};

export type Species = {
    name: string;
    bp: string;
    variants?: string[];
    flags?: string[];
    death?: Death;
};

export type SpeciesData = {
    version: string;
    format: string;
    species: Species[];
};

export type IndexedSpeciesData = SpeciesData & {
    speciesLookup: { [bp: string]: Species };
};

function indexSpeciesFile(file: SpeciesData) {
    const speciesLookup: { [bp: string]: Species } = {};

    for (const species of file.species) {
        speciesLookup[species.bp] = species;
    }

    return { speciesLookup };
}


/** Fetch a mod's species data from Obelisk (cached and pre-processed) */
export const getWikiSpeciesStore = processedWikiStore<SpeciesData, IndexedSpeciesData>("species.json", indexSpeciesFile);

