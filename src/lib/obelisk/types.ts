export const OBELISK = 'https://raw.githubusercontent.com/arkutils/Obelisk/master/data';

export type ManifestMod = {
    id: string,
    tag: string,
    title: string,
    official?: boolean,
    expansion?: boolean,
};

export type ManifestEntry = {
    version: string,
    mod: ManifestMod,
}

/** Original Obelisk manifest format */
export type Manifest = {
    format: string,
    files: { [filename: string]: ManifestEntry }
};

/** Extension of the manifest with quick indexing data */
export type IndexedManifest = Manifest & {
    baseurl: string,
    byModId: { [modid: string]: ManifestMod },
    sortedMods: ModInfo[],
};

/** Parsed mod info */
export type ModInfo = {
    id: string;
    tag: string;
    title: string;
    order: string;
};
