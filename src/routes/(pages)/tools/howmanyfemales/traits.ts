/// Add up all of the effects of a type of trait from multiple sources
export function gatherTraitEffects(traitName: string, field: keyof TraitInfo['effects'], ...traits: string[][]) {
    const trait = traitDefinitions[traitName];
    if (!trait) throw new Error(`Unknown trait: ${traitName}`);

    const effects = trait.effects[field] || [];
    if (!effects || effects.length === 0) return 0;

    return traits.reduce((acc, trait) => {
        return acc + accumulateTraitEffects(trait, traitName, effects);
    }, 0);
}

/// Add up all of the effects of a trait
function accumulateTraitEffects(traits: string[], traitName: string, effects: number[]) {
    return traits.reduce((acc, trait) => {
        const parts = trait.match(/^(\w+)\[(\d+)\]$/);
        if (parts && parts[1] === traitName) {
            const tier = Math.min(parseInt(parts[2]) - 1, effects.length - 1);
            return acc + effects[tier];
        }
        return acc;
    }, 0);
}

/// Calculate the traits that should be blocked
export function calculateTraitsToBlock(traitList: string[]) {
    // Add up the traits of each type, ignoring tier
    const traitCounts: Record<string, number> = {};
    for (const trait of traitList) {
        const parts = trait.match(/^(\w+)/);
        if (parts) {
            traitCounts[parts[1]] = (traitCounts[parts[1]] || 0) + 1;
        }
    }

    // Return the traits that have >= their maxStacks
    const toBlock: string[] = [];
    for (const trait in traitCounts) {
        if (traitCounts[trait] >= traitDefinitions[trait].maxStacks) {
            toBlock.push(trait);
        }
    }

    return toBlock;
}

type TraitInfo = {
    maxTiers: number;
    maxStacks: number;
    name: (tier: number) => string;
    effects: {
        rollChance?: number[];
        targetStatWeight?: number[];
        otherStatWeight?: number[];
        higherPick?: number[];
    }
}

export const traitDefinitions: Record<string, TraitInfo> = {
    'MutableTarget': {
        maxTiers: 3,
        maxStacks: 3,
        name: tier => `Mutable T${tier}`,
        effects: {
            rollChance: [0.01, 0.015, 0.02],
            targetStatWeight: [0.5, 0.75, 1.0],
        },
    },
    'Robust': {
        maxTiers: 3,
        maxStacks: 3,
        name: tier => `Robust T${tier}`,
        effects: {
            higherPick: [0.015, 0.0225, 0.03],
        },
    },
    'MutableOther': {
        maxTiers: 3,
        maxStacks: 3,
        name: tier => `Mutable (off-stat) T${tier}`,
        effects: {
            rollChance: [0.01, 0.015, 0.02],
            otherStatWeight: [0.5, 0.75, 1.0],
        },
    },
}
