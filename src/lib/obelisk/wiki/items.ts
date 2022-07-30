import { processedWikiStore } from "./internal";


export type CraftIngredient = {
    qty: number;
    type: string;
}

export type Crafting = {
    levelReq: number;
    recipe: CraftIngredient[];
};

export type Item = {
    name: string;
    description: string;
    bp: string;
    crafting: Crafting;
};

export type ItemsData = {
    version: string;
    format: string;
    items: Item[];
};

export type IndexedItemsData = ItemsData & {
    bpLookup: { [bp: string]: Item };
    clsLookup: { [cls: string]: Item };
};

export type MinMaxPow = {
    min: number;
    max: number;
    pow: number;
}

function indexItemsFile(file: ItemsData) {
    const bpLookup: { [bp: string]: Item } = {};
    const clsLookup: { [cls: string]: Item } = {};

    for (const species of file.items) {
        bpLookup[species.bp] = species;
        const cls = species.bp.split(".")[1];
        clsLookup[cls] = species;
    }

    return { bpLookup, clsLookup };
}


/** Fetch a mod's drops data from Obelisk (cached and pre-processed) */
export const getWikiItemsStore = processedWikiStore<ItemsData, IndexedItemsData>("items.json", indexItemsFile);
