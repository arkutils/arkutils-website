import { asyncDerived, type Loadable } from "@square/svelte-store";

import { manifestStore, modListStore, type PathForFileFn } from "./core";
import { OBELISK } from "./types";


const BASEURL = `${OBELISK}/asb`;

export type ColorDef = [name: string, rgba: [number, number, number, number]];

export type SpeciesStatMults = [number, number, number, number, number] | null;

export type Species = {
    name: string;
    blueprintPath: string;
    variants: string[];
    fullStatsRaw: SpeciesStatMults[];
    TamedBaseHealthMultiplier: number;
    statImprintMult: number[];
    displayedStats: number;
    breeding?: { eggTempMin?: number; eggTempMax?: number };
};

export type ModData = {
    version: string;
    format: string;
    species: Species[];
    colorDefinitions: ColorDef[];
    dyeDefinitions: ColorDef[];
};

export type IndexedModData = ModData & {
    speciesLookup: { [bp: string]: Species };
};


const asbManifestStore = manifestStore(`${OBELISK}/asb`);
const asbModListStore = modListStore(asbManifestStore);
const asbModStores: { [modid: string]: Loadable<IndexedModData> } = {};

function indexSpeciesFile(file: ModData) {
    const speciesLookup: { [bp: string]: Species } = {};

    for (const species of file.species) {
        speciesLookup[species.blueprintPath] = species;
    }

    return { speciesLookup };
}

const asbFilePath: PathForFileFn = function (modid: string, modtag: string, leafname: string) {
    if (!modid) {
        return `${BASEURL}/${leafname}`;
    } else {
        return `${BASEURL}/${modid}-${modtag}.json`;
    }
}


/** Fetch a mod's species data from Obelisk (cached and pre-processed) */
export function getModDataStore(modid: string) {
    return asbModStores[modid] ?? (asbModStores[modid] = getAsbSpeciesStoreForMod(modid));
}

export function getModListStore() {
    return asbModListStore;
}


/** Get an async store containing a mod's ASB species data (once loaded) */
function getAsbSpeciesStoreForMod(modid: string): Loadable<IndexedModData> {
    const existingStore = asbModStores[modid];
    if (existingStore) return existingStore;

    const store = asyncDerived(asbManifestStore, async ($manifest): Promise<IndexedModData> => {
        const mod = $manifest.byModId[modid];

        const url = asbFilePath(modid, mod.tag, 'values.json');
        const request = await fetch(url);
        const rawData = await request.json() as ModData;

        // Sort by name, and put less variants first
        rawData.species.sort((a: Species, b: Species) => a.name.localeCompare(b.name) || compareVariants(a, b));

        // Add indexing fields
        const indexElements = indexSpeciesFile(rawData);
        return { ...rawData, ...indexElements };
    });
    asbModStores[modid] = store;
    return store;
}


function compareVariants(a: Species, b: Species): number {
    const aLen = a.variants ? a.variants.length : 0;
    const bLen = b.variants ? b.variants.length : 0;
    return aLen - bLen;
}

export function isSpeciesUseful(species: Species): boolean {
    const variants = species.variants;
    if (!variants) return true;
    if (variants.includes('Cave')) return false;
    if (variants.includes('Mission')) return false;
    if (variants.includes('Minion')) return false;
    if (variants.includes('Corrupted')) return false;
    if (variants.includes('Summoned')) return false;
    if (variants.includes('Unused')) return false;
    if (variants.includes('Boss')) return false;
    if (variants.includes('Mega')) return false;
    if (variants.includes('Ghost')) return false;
    if (variants.includes('Skeletal')) return false;
    return true;
}
