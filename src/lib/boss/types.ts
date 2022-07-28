export type AlpaBetaGamma<T> = {
    gamma: T;
    beta: T;
    alpha: T;
};

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
};

export interface ABGBoss extends BossBase {
    species: AlpaBetaGamma<string>;
};

export interface SingleBoss extends BossBase {
    species: string;
};

export type DifficultyData = {
    display: string;
    level: string;
};
