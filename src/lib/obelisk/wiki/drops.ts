import { processedWikiStore, type WikiFileStore } from "./internal";
import type { IndexedItemsData, Item, MinMaxPow } from "./items";


export type ItemWeightPair = [weight: number, cls: string];

export type LootSetEntry = {
    name: string;
    weight: number;
    qty: MinMaxPow;
    quality: MinMaxPow;
    items: ItemWeightPair[];
};

export type LootSet = {
    bp: string;
    name: string;
    weight: number;
    qtyScale: MinMaxPow;
    entries: LootSetEntry[];
};

export type Drops = {
    bp: string;
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


export function gatherDrops(drops: Drops, $wikiItems: IndexedItemsData): ItemsWithQty {
    return {
        qty: default_qty, // oddly enough we need to ignore drops.qtyMult
        items: drops.sets.map((set) => _gatherSet(set, $wikiItems))
    };
}

function _gatherSet(set: LootSet, $wikiItems: IndexedItemsData): ItemsWithQty {
    return {
        qty: set.qtyScale ?? default_qty,
        items: set.entries.map((entry) => _gatherEntry(entry, $wikiItems))
    };
}

function _gatherEntry(entry: LootSetEntry, $wikiItems: IndexedItemsData): ItemsWithQty {
    return {
        qty: { min: entry.qty.min, max: entry.qty.max, pow: 1 },
        items: entry.items.map((item) => _gatherItem(item, $wikiItems))
    };
}

function _gatherItem(item: [number, string], $wikiItems: IndexedItemsData): ItemsWithQty {
    return {
        qty: { min: item[0], max: item[0], pow: 1 },
        items: [$wikiItems.clsLookup[item[1]]]
    };
}

function _combineQty(qty: MinMaxPow, qty2: MinMaxPow): MinMaxPow {
    return {
        min: qty.min * qty2.min,
        max: qty.max * qty2.max,
        pow: qty.pow * qty2.pow
    };
}

/**
 * Premultiplies deeps hierarchies of loot+quantity multipliers.
 *
 * qty + items[] = {min, max, item}[]
 */
export function flattenLoot(
    loot: ItemsWithQty[] | Item[],
    qty: MinMaxPow = { min: 1, max: 1, pow: 1 }
): { min: number; max: number; item: Item }[] {
    if (!loot) return [];

    return loot.flatMap((item) => {
        if (!item) return [];
        if ('qty' in item) {
            return flattenLoot(item.items, _combineQty(qty, item.qty));
        } else {
            return { min: qty.min, max: qty.max, item: item };
        }
    });
}
