import type { BossMap, DifficultyData } from './types';

export const boss_data: Record<string, BossMap> = {
    island: {
        display: 'The Island',
        bosses: {
            broodmother: {
                display: 'Broodmother Lysrix',
                species: {
                    gamma: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Easy.SpiderL_Character_BP_Easy',
                    beta: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Medium.SpiderL_Character_BP_Medium',
                    alpha: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Hard.SpiderL_Character_BP_Hard'
                }
            },
            megapithicus: {
                display: 'Megapithicus',
                species: {
                    gamma: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_Easy.Gorilla_Character_BP_Easy',
                    beta: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_Medium.Gorilla_Character_BP_Medium',
                    alpha: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_Hard.Gorilla_Character_BP_Hard'
                }
            },
            dragon: {
                display: 'Dragon',
                species: {
                    gamma: '/Game/PrimalEarth/Dinos/Dragon/Dragon_Character_BP_Boss_Easy.Dragon_Character_BP_Boss_Easy',
                    beta: '/Game/PrimalEarth/Dinos/Dragon/Dragon_Character_BP_Boss_Medium.Dragon_Character_BP_Boss_Medium',
                    alpha: '/Game/PrimalEarth/Dinos/Dragon/Dragon_Character_BP_Boss_Hard.Dragon_Character_BP_Boss_Hard'
                }
            }
        }
    },
    scorchedearth: {
        display: 'Scorched Earth',
        bosses: {
            manticore: {
                display: 'Manticore',
                species: {
                    gamma: '/Game/ScorchedEarth/Dinos/Manticore/Manticore_Character_BP_Easy.Manticore_Character_BP_Easy',
                    beta: '/Game/ScorchedEarth/Dinos/Manticore/Manticore_Character_BP_Medium.Manticore_Character_BP_Medium',
                    alpha: '/Game/ScorchedEarth/Dinos/Manticore/Manticore_Character_BP_Hard.Manticore_Character_BP_Hard'
                }
            }
        }
    }
};

export const difficulties: Record<string, DifficultyData> = {
    'gamma': {
        display: 'Gamma',
        level: 'Easy',
    },
    'beta': {
        display: 'Beta',
        level: 'Medium',
    },
    'alpha': {
        display: 'Alpha',
        level: 'Hard',
    },
};
