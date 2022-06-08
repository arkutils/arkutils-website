import { localstore } from "$lib/localstore";

export const selectedModId = localstore('arkutils-modid', { default: '', dontWatchTabs: true });
export const selectedSpecies = localstore<string>('arkutils-species', { default: null, dontWatchTabs: true });
