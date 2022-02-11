import { dev } from "$app/env";

const OBELISK = dev ? '/data' : 'https://raw.githubusercontent.com/arkutils/Obelisk/master/data';

export type ModInfo = {
    id: string;
    tag: string;
    title: string;
    filename: string;
    order: string;
};

export type Species = {
    name: string;
    blueprintPath: string;
    variants: string[];
};

let modOrder: ModInfo[] = [];
let modMetadata: { [mod_id: string]: ModInfo } = {};
const modLoadCache: { [mod_id: string]: Species[] } = {};


/** Ensure the mod list is available */
export async function ensureManifestLoaded() {
    if (Object.keys(modMetadata).length !== 0) {
        return;
    }

    const req = await fetch(`${OBELISK}/asb/_manifest.json`);
    const data = await req.json();
    parseManifest(data);
}


/** Get the entire mod list */
export function getModList(): ModInfo[] {
    return modOrder;
}


/** Ask for a mod to be loaded */
export async function loadMod(modId: string) {
    await ensureManifestLoaded();

    const mod = modMetadata[modId];
    const filename = mod.filename;

    if (modId in modLoadCache) {
        return modLoadCache[modId];
    }

    const req = await fetch(`${OBELISK}/asb/${filename}`);
    const data = await req.json();
    const modData = parseMod(data);
    modLoadCache[modId] = modData;

    return modData;
}


/** Fetch obelisk's manifest, parse it, sort it, and store it in `modList` */
function parseManifest(data) {
    const files = Object.entries(data.files);
    const mods = files.map(entry => convertModData(entry[1], entry[0]));

    // Apply our custom ordering, bringing core mods to the top
    mods.sort((a, b) => a.order.localeCompare(b.order));

    modOrder = [];
    modMetadata = {};
    mods.forEach((info) => {
        modMetadata[info.id] = info;
        modOrder.push(info);
    });
}

/** Normalise mod info and add order information */
function convertModData(fileInfo, filename: string): ModInfo {
    const mod: ModInfo = fileInfo.mod || {
        id: '',
        tag: '',
        title: 'Core',
        filename: filename,
        order: '0'
    };
    mod.filename = filename;

    // We sort textual IDs first, then numerical IDs
    if (!mod.order) {
        const intId = parseInt(mod.id);
        if (isNaN(intId)) {
            mod.order = mod.title;
        } else {
            mod.order = `zzzzz${intId}`;
        }
    }

    return mod;
}

/** Parse a mod data info into a simple (sorted) list of species */
function parseMod(data): Species[] {
    const species: Species[] = data.species.map((entry) => ({
        name: entry.name,
        variants: entry.variants,
        blueprintPath: entry.blueprintPath
    }));

    species.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    });

    return species;
}
