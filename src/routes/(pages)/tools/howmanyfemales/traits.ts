
/// Add up all of the effects of a trait
export function accumulateTraitEffects(traits: string[], traitName: string, effects: number[]) {
    return traits.reduce((acc, trait) => {
        const parts = trait.match(/^(\w+)\[(\d+)\]$/);
        if (parts && parts[1] === traitName) {
            const tier = Math.min(parseInt(parts[2]) - 1, effects.length - 1);
            return acc + effects[tier];
        }
        return acc;
    }, 0);
}
