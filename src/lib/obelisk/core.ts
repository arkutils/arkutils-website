import { browser } from '$app/environment';
import { asyncDerived, asyncReadable, derived, type Loadable } from '@square/svelte-store';

import type { IndexedManifest, Manifest, ManifestMod, ModInfo } from './types';


export type PathForFileFn = (modid: string, modtag: string, filename: string) => string;


/** Svelte store with a fetched Obelisk manifest */
export function manifestStore(baseurl: string) {
    const url = `${baseurl}/_manifest.json`;
    return asyncReadable<IndexedManifest>({ format: '', files: {}, baseurl: '', byModId: {}, sortedMods: [] }, async () => {
        if (!browser) throw new Error('Should not be fetching manifestStore on server');
        console.log('fetching manifestStore', url);
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
        if (!browser) throw new Error('Should not be fetching manifestFileStore on server');
        if (!$manifest.files[filename]) throw new Error('No such file in this manifest');
        const url = `${baseurl}/${filename}`;
        console.log('fetching manifestFileStore', url);
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
            title: 'Ark: Survival Evolved',
            official: true,
        };
        byModId[mod.id] = { ...mod, order: sortableNameForMod(mod) }
        if (mod.official) {
            byModId[mod.id].title += ' (Official)';
        }
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
    // ASA is special and always second
    if (mod.id === 'ASA') return '1';

    const intId = parseInt(mod.id);
    if (isNaN(intId)) {
        // Named mods come next
        return `aaaaa${mod.title}`;
    } else {
        // Then numeric mods
        return `zzzzz${intId.toString().padStart(12, '0')}`;
    }
}

const builtInMods = {
    'Valguero': true,
    'Ragnarok': true,
}

export function modIdFromPath(path: string | undefined) {
    if (!path) return '';

    // Pick mod name out if path starts /Game/Mods/<modid>/...
    const match = path.match(/^\/Game\/Mods\/([^/]+)\/.*$/);
    if (!match) return '';
    const modId = match[1];

    // Exclude Rag, Val, etc
    if (modId in builtInMods) return '';

    return modId;
}
