export type Difficulty = "gamma" | "beta" | "alpha";

export type AlphaBetaGamma<T> = Record<Difficulty, T>;

export type BossMap = {
    display: string;
    bosses: Record<string, SingleBoss | ABGBoss>;
};

export type BossBase = {
    display: string;
    icon: string;
    gammaIconOverride?: string;
    betaIconOverride?: string;
    alphaIconOverride?: string;
    phases?: string[];
};

export interface ABGBoss extends BossBase {
    species: AlphaBetaGamma<BossDifficulty>;
};

export interface SingleBoss extends BossBase {
    species: BossDifficulty;
};

export type DifficultyData = {
    display: string;
    level: string;
};

export type BossDifficulty = {
    bp: string;
    summon: string;
};
