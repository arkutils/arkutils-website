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

export type IndexesForDropsData = {
    bpLookup: { [bp: string]: Drops };
};

export type IndexedDropsData = DropsData & IndexesForDropsData;

export type ItemsWithQty = {
    qty: MinMaxPow;
    items: ItemsWithQty[] | Item[];
};


const default_qty: MinMaxPow = { min: 1, max: 1, pow: 1 };


export function indexDropsFile(file: DropsData): IndexesForDropsData {
    const bpLookup: { [bp: string]: Drops } = {};

    for (const drop of file.drops) {
        bpLookup[drop.bp] = drop;
    }

    return { bpLookup };
}

/** Fetch a mod's drops data from Obelisk (cached and pre-processed) */
export const getWikiDropsStore = processedWikiStore<DropsData, IndexedDropsData>("drops.json", indexDropsFile);


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

export async function gatherLoot(lootbags: Lootbag[]): Promise<DropResults> {
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
        return Math.min(1, combinations / count);
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
