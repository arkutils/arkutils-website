import { asyncDerived, asyncReadable, derived, type Loadable } from '@square/svelte-store';

import type { IndexedManifest, Manifest, ManifestMod, ModInfo } from './types';


export type PathForFileFn = (modid: string, modtag: string, filename: string) => string;


/** Svelte store with a fetched Obelisk manifest */
export function manifestStore(baseurl: string) {
    const url = `${baseurl}/_manifest.json`;
    return asyncReadable<IndexedManifest>({ format: '', files: {}, baseurl: '', byModId: {}, sortedMods: [] }, async () => {
        const request = await fetch(url);
        const rawManifest = await request.json() as Manifest;
        const indexElements = indexManifest(rawManifest);
        return { baseurl, ...rawManifest, ...indexElements };
    });
}

/** Svelte store contianing a list of mods obtained from an Obelisk manifest */
export function modListStore(manifest: Loadable<IndexedManifest>) {
    return derived(manifest, ($manifest) => $manifest.sortedMods);
}

/** Svelte store with a particular file from an Obelisk manifest */
export function manifestFileStore<T>(baseurl: string, manifest: Loadable<Manifest>, filename: string): Loadable<T | null> {
    return asyncDerived(manifest, async ($manifest) => {
        if (!$manifest.files[filename]) throw new Error('No such file in this manifest');
        const url = `${baseurl}/${filename}`;
        const request = await fetch(url);
        return await request.json();
    });
}

function indexManifest(manifest: Manifest) {
    // Index by modid
    const byModId: { [modid: string]: ModInfo } = {};
    for (const entry of Object.values(manifest.files)) {
        const mod = entry.mod ?? {
            id: '',
            tag: '',
            title: 'Core (Vanilla)',
        };
        byModId[mod.id] = { ...mod, order: sortableNameForMod(mod) }
    }

    // Sort by modid, with named entries first
    const sortedMods = sortedModList(byModId);

    return { byModId, sortedMods };
}


function sortedModList(mods: { [modid: string]: ManifestMod }): ModInfo[] {
    // Collect mod info
    const infos: ModInfo[] = Object.entries(mods).map(([modid, mod]) => ({
        id: modid,
        tag: mod.tag,
        title: mod.title,
        order: sortableNameForMod(mod),
    }));

    // Sort by order
    infos.sort((a, b) => a.order.localeCompare(b.order));

    return infos;
}

function sortableNameForMod(mod: ManifestMod) {
    // Core mod is special and always first
    if (!mod.id) return '0';

    const intId = parseInt(mod.id);
    if (isNaN(intId)) {
        // Named mods come next
        return mod.title;
    } else {
        // Then numeric mods
        return `zzzzz${intId.toString().padStart(12, '0')}`;
    }
}