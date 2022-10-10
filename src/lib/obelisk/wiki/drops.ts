import { factorial as f } from "$lib/utils/math";
import { loadAll } from "@square/svelte-store";
import { modIdFromPath } from "../core";
import { processedWikiStore, type WikiFileStore } from "./internal";
import { getItemByClass, type Item, type MinMaxPow } from "./items";
import type { Lootbag } from "./species";


export type ItemWeightPair = [weight: number, cls: string];

export type LootSetEntry = {
    name: string;
    weight: number;
    qty: MinMaxPow;
    quality: MinMaxPow;
    bpChance: number;
    items: ItemWeightPair[];
};

export type LootSet = {
    bp: string;
    name: string;
    weight: number;
    qtyScale: MinMaxPow;
    canRepeatItems: boolean;
    entries: LootSetEntry[];
};

export type Drops = {
    bp: string;
    noRepeatsInSets: boolean;
    qtyMult?: MinMaxPow;
    sets: LootSet[];
};

export type DropsData = WikiFileStore & {
    drops: Drops[];
};

export type Crate = {
    bp: string;
    levelReq: number;
    noRepeatsInSets: boolean;
    setQty?: MinMaxPow;
    sets: LootSet[];
};

export type CrateData = WikiFileStore & {
    lootCrates: Crate[];
}

export type IndexedDropsData = DropsData & IndexesForDropsData;
export type IndexesForDropsData = {
    bpLookup: { [bp: string]: Drops };
};

export type IndexedCrateData = CrateData & IndexesForCrateData;
export type IndexesForCrateData = {
    bpLookup: { [bp: string]: Crate };
};

export type ItemsWithQty = {
    qty: MinMaxPow;
    items: ItemsWithQty[] | Item[];
};


const default_qty: MinMaxPow = { min: 1, max: 1, pow: 1 };


export function indexCrateFile(file: CrateData): IndexesForCrateData {
    const bpLookup: { [bp: string]: Crate } = {};

    for (const crate of file.lootCrates) {
        bpLookup[crate.bp] = crate;
    }

    return { bpLookup };
}

export function indexDropsFile(file: DropsData): IndexesForDropsData {
    const bpLookup: { [bp: string]: Drops } = {};

    for (const drop of file.drops) {
        bpLookup[drop.bp] = drop;
    }

    return { bpLookup };
}

/** Fetch a mod's drops data from Obelisk (cached and pre-processed) */
export const getWikiDropsStore = processedWikiStore<DropsData, IndexedDropsData>("drops.json", indexDropsFile);

/** Fetch the global loot crate data from Obelisk (cached and pre-processed) */
export const getWikiCrateStore = processedWikiStore<CrateData, IndexedCrateData>("loot_crates.json", indexCrateFile);


export type ItemResult = {
    item: Item;
    min: number;
    max: number;
    bp: number;
    chance: number;
}

export type DropResults = {
    fixed: ItemResult[];
    random: ItemResult[];
}

export async function gatherLootCrate(crate: string): Promise<DropResults> {
    // Find items from the loot crate, reading from the global loot crates file
    const [cratesFile] = await loadAll([getWikiCrateStore('')]);

    const crateData = cratesFile.bpLookup[crate];
    const items = _gatherCrate(crateData, 1);

    return {
        fixed: items.filter(result => result.chance >= 1),
        random: items.filter(result => result.chance < 1),
    }
}

export async function gatherLootBags(lootbags: Lootbag[]): Promise<DropResults> {
    // Find items from each lootbag, reading from its associated wiki drops file
    const bags = await Promise.all(lootbags.map(async (lootbag) => {
        const modId = modIdFromPath(lootbag.item);
        const [dropsFile] = await loadAll([getWikiDropsStore(modId)]);
        const drops = dropsFile.bpLookup[lootbag.item + "_C"];
        return _gatherDrops(drops, lootbag.chance ?? 1);
    }));

    // Combine all the items from each lootbag into one array
    const items = bags.flat();

    return {
        fixed: items.filter(result => result.chance >= 1),
        random: items.filter(result => result.chance < 1),
    }
}

function calculateChance(options: number, count: number, allowRepeats: boolean): number {
    if (allowRepeats) {
        // Chance of failure to the power of the number chances, inverted to back success
        return 1 - Math.pow((options - 1) / options, count);
    } else {
        if (count > options) return 1;
        const combinations = f(options) / (f(count) * f(options - count));
        return Math.min(1, Number(combinations));
    }
}

function _gatherDrops(drops: Drops, outerChance: number): ItemResult[] {
    const setLen = drops.sets.length;
    if (setLen === 0) return [];

    const { min, max } = drops.qtyMult ?? default_qty;
    const avg = (min + max) / 2;
    const chance = outerChance * calculateChance(setLen, avg, !drops.noRepeatsInSets);
    const items = drops.sets.flatMap((set) => _gatherSet(set, chance));
    return items;
}

function _gatherCrate(crate: Crate, outerChance: number): ItemResult[] {
    const setLen = crate.sets.length;
    if (setLen === 0) return [];

    const { min, max } = crate.setQty ?? default_qty;
    const avg = (min + max) / 2;
    const chance = outerChance * calculateChance(setLen, avg, !crate.noRepeatsInSets);
    const items = crate.sets.flatMap((set) => _gatherSet(set, chance));
    return items;
}

function _gatherSet(set: LootSet, outerChance: number): ItemResult[] {
    const setLen = set.entries.length;
    if (setLen === 0) return [];

    const { min, max } = set.qtyScale ?? default_qty;
    const avg = (min + max) / 2;
    const chance = outerChance * calculateChance(setLen, avg, set.canRepeatItems);
    const items = set.entries.flatMap((entry) => _gatherEntry(entry, chance));
    return items;
}

function _gatherEntry(entry: LootSetEntry, outerChance: number): ItemResult[] {
    const setLen = entry.items.length;
    if (setLen === 0) return [];

    const { min, max } = entry.qty ?? default_qty;
    const avg = (min + max) / 2;
    const chance = outerChance / setLen;

    const bpChance = entry.bpChance;

    const items = entry.items.flatMap((item) => _gatherItem(item, avg, chance, bpChance));
    return items;
}

function _gatherItem(pair: [number, string], amt: number, chance: number, bpChance: number): ItemResult[] {
    const item = getItemByClass(pair[1]);
    if (!item) return [];
    return [{
        item,
        min: amt, max: amt,
        chance: chance,
        bp: bpChance,
    }];
}
