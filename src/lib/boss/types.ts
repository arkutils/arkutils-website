export type Difficulty = 'gamma' | 'beta' | 'alpha';

export type AlphaBetaGamma<T> = Record<Difficulty, T>;

export type SetInfo = {
    name: string;
    description?: string;
    bosses: string[];
};

export type BossMap = {
    display: string;
    isLore?: boolean,
    icon: string;
    extraModIds?: string[];
    sets?: SetInfo[];
    note?: string;
    bosses: Record<string, SingleBoss | ABGBoss>;
    manualEngrams?: string[];
};

export type BossBase = {
    display: string;
    searchTerms?: string;
    extraModIds?: string[];
    note?: string;
    icon: string;
    gammaIconOverride?: string;
    betaIconOverride?: string;
    alphaIconOverride?: string;
    phases?: string[];
};

export interface ABGBoss extends BossBase {
    species: AlphaBetaGamma<BossDifficulty>;
}

export interface SingleBoss extends BossBase {
    species: BossDifficulty;
}

export type DifficultyData = {
    display: string;
    level: string;
};

export type BossDifficulty = {
    bp: string;
    summon?: string;
    dropsNote?: string;
    summonNote?: string;
    manualEngrams?: string[];
};

export type ItemExtra = {
    searchTerms: string;
};
