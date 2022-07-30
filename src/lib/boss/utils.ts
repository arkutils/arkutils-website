import { boss_data } from "./data";
import type { ABGBoss, BossDifficulty, Difficulty, SingleBoss } from "./types";


export function urlForBoss(mapId: string, bossId: string, boss: SingleBoss | ABGBoss): string {
    if (typeof boss.species === 'string') {
        // Boss has no difficulties, so just link to the basic page
        return `/boss/${mapId}/${bossId}`;
    }
    return `/boss/${mapId}/${bossId}-gamma`;
}

export function dataForBoss(mapId: string, bossId: string): SingleBoss | ABGBoss {
    return boss_data[mapId].bosses[bossId];
}

export function difficultyForBoss(data: SingleBoss | ABGBoss, difficulty: Difficulty | null): BossDifficulty {
    if (isSingleDifficulty(data)) {
        // Boss has no difficulties
        if (difficulty !== null) {
            throw new Error("Difficulty not supported for single-difficulty boss");
        }

        // Return the only BP
        return data.species;
    } else {
        // Boss has multiple difficulties
        if (difficulty === null) {
            throw new Error("Difficulty not specified for multi-difficulty boss");
        }

        // Return the BP for this difficulty
        return data.species[difficulty];
    }
}

export function isSingleDifficulty(data: SingleBoss | ABGBoss): data is SingleBoss {
    return 'bp' in data.species;
}
