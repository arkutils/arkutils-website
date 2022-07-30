
import { asyncDerived, type Loadable } from "@square/svelte-store";
import { manifestStore, modListStore, type PathForFileFn } from "../core";
import { OBELISK } from "../types";


const BASEURL = `${OBELISK}/wiki`;

export interface WikiFileStore {
    version: string;
    format: string;
};


export const wikiManifestStore = manifestStore(BASEURL);
export const wikiModListStore = modListStore(wikiManifestStore);
export const wikiFileStores: { [modid: string]: { [filename: string]: Loadable<WikiFileStore> } } = {};


export const wikiFilePath: PathForFileFn = function (modid: string, modtag: string, filename: string) {
    if (!modid) {
        return `${BASEURL}/${filename}`;
    } else {
        return `${BASEURL}/${modid}-${modtag}/${filename}.json`;
    }
}

export function processedWikiStore<TBase extends WikiFileStore, TIndexed extends TBase>(
    leafname: string,
    process: (file: TBase) => Record<Exclude<TIndexed, TBase>, unknown>): (modid: string)
        => Loadable<TIndexed> {
    return (modid: string) => {
        let modStores = wikiFileStores[modid];
        if (!modStores) modStores = wikiFileStores[modid] = {};
        const existingStore = modStores[leafname];
        if (existingStore) return existingStore as Loadable<TIndexed>;

        const store = asyncDerived(wikiManifestStore, async ($manifest): Promise<TIndexed> => {
            const mod = $manifest.byModId[modid];
            const url = wikiFilePath(modid, mod.tag, leafname);
            const request = await fetch(url);
            const rawData = await request.json() as TBase;

            // Add indexing fields
            const indexElements = process(rawData);
            const result = { ...rawData, ...indexElements };
            return result as TIndexed;
        });

        // Record the store
        modStores[leafname] = store;
        return store;
    };
}
