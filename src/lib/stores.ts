import { localstore } from "$lib/localstore";

export const selectedModId = localstore('arkutils-modid', { default: '', dontWatchTabs: true });
export const selectedSpecies = localstore<string | null>('arkutils-species', { default: null, dontWatchTabs: true });
export const gameDifficulty = localstore('arkutils-game-difficulty', { default: 5, dontWatchTabs: true });
