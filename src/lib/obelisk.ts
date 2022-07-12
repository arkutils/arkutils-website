import { ReentranceLock } from './utils/asynclock';

const OBELISK = 'https://raw.githubusercontent.com/arkutils/Obelisk/master/data';

export type ModInfo = {
    id: string;
    tag: string;
    title: string;
    filename: string;
    order: string;
};

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
    speciesLookup: { [bp: string]: Species };

    colorDefinitions: ColorDef[];
    dyeDefinitions: ColorDef[];
};

let modOrder: ModInfo[] = [];
let modMetadata: { [mod_id: string]: ModInfo } = {};
const modLoadCache: { [mod_id: string]: ModData } = {};

const manifestReentranceLock = new ReentranceLock();
const loadModReentranceLock = new ReentranceLock();

/** Ensure the mod list is available */
export async function ensureManifestLoaded() {
    await manifestReentranceLock.execute(async () => {
        // Immediately return if we've completed
        if (Object.keys(modMetadata).length !== 0) {
            return;
        }

        // Ensure we don't get re-entered
        const req = await fetch(`${OBELISK}/asb/_manifest.json`);
        const data = await req.json();
        parseManifest(data);
    });
}

/** Get the entire mod list */
export function getModList(): ModInfo[] {
    return modOrder;
}

/** Ask for a mod to be loaded */
export async function loadMod(modId: string) {
    return await loadModReentranceLock.execute(async () => {
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
    });
}

/** Fetch obelisk's manifest, parse it, sort it, and store it in `modList` */
function parseManifest(data: any) {
    const files = Object.entries(data.files);
    const mods = files.map((entry) => convertModData(entry[1], entry[0]));

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
function convertModData(fileInfo: any, filename: string): ModInfo {
    const mod: ModInfo = fileInfo.mod || {
        id: '',
        tag: '',
        title: 'Core (Vanilla)',
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
            // Extend with zeros to 12 digits
            mod.order = `zzzzz${intId.toString().padStart(12, '0')}`;
        }
    }

    return mod;
}

/** Parse a mod data */
function parseMod(data: any): ModData {
    // Sort species by name and number of variants
    data.species.sort((a: any, b: any) => a.name.localeCompare(b.name) || compareVariants(a, b));

    // Create a dict for fast species blueprint lookup
    data.speciesLookup = {};
    data.species.forEach((species: any) => (data.speciesLookup[species.blueprintPath] = species));

    return data;
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
