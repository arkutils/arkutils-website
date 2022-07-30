import type { BossMap, DifficultyData } from './types';

export const boss_data: Record<string, BossMap> = {
    island: {
        display: 'The Island',
        bosses: {
            fakebroody: {
                display: 'Fake No-Difficulty Brookmother',
                species: {
                    bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Hard.SpiderL_Character_BP_Hard',
                    summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Spider_Easy.PrimalItem_BossTribute_Spider_Easy_C',
                },
                icon: 'Spider.webp',
            },
            broodmother: {
                display: 'Broodmother Lysrix',
                species: {
                    gamma: {
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Easy.SpiderL_Character_BP_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Spider_Easy.PrimalItem_BossTribute_Spider_Easy_C',
                    },
                    beta: {
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Medium.SpiderL_Character_BP_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Spider_Medium.PrimalItem_BossTribute_Spider_Medium_C',
                    },
                    alpha: {
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Hard.SpiderL_Character_BP_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Spider_Hard.PrimalItem_BossTribute_Spider_Hard_C',
                    },
                },
                icon: 'Spider.webp',
            },
            megapithicus: {
                display: 'Megapithicus',
                species: {
                    gamma: {
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_Easy.Gorilla_Character_BP_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Gorilla_Easy.PrimalItem_BossTribute_Gorilla_Easy_C',
                    },
                    beta: {
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_Medium.Gorilla_Character_BP_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Gorilla_Medium.PrimalItem_BossTribute_Gorilla_Medium_C',
                    },
                    alpha: {
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_Hard.Gorilla_Character_BP_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Gorilla_Hard.PrimalItem_BossTribute_Gorilla_Hard_C',
                    },
                },
                icon: 'Monkey.webp',
            },
            dragon: {
                display: 'Dragon',
                species: {
                    gamma: {
                        bp: '/Game/PrimalEarth/Dinos/Dragon/Dragon_Character_BP_Boss_Easy.Dragon_Character_BP_Boss_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Dragon_Easy.PrimalItem_BossTribute_Dragon_Easy_C'
                    },
                    beta: {
                        bp: '/Game/PrimalEarth/Dinos/Dragon/Dragon_Character_BP_Boss_Medium.Dragon_Character_BP_Boss_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Dragon_Medium.PrimalItem_BossTribute_Dragon_Medium_C'
                    },
                    alpha: {
                        bp: '/Game/PrimalEarth/Dinos/Dragon/Dragon_Character_BP_Boss_Hard.Dragon_Character_BP_Boss_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Dragon_Hard.PrimalItem_BossTribute_Dragon_Hard_C'
                    },
                },
                icon: 'Dragon.webp',
            }
        }
    },
    scorchedearth: {
        display: 'Scorched Earth',
        bosses: {
            manticore: {
                display: 'Manticore',
                species: {
                    gamma: {
                        bp: '/Game/ScorchedEarth/Dinos/Manticore/Manticore_Character_BP_Easy.Manticore_Character_BP_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Manticore_Easy.PrimalItem_BossTribute_Manticore_Easy_C',
                    },
                    beta: {
                        bp: '/Game/ScorchedEarth/Dinos/Manticore/Manticore_Character_BP_Medium.Manticore_Character_BP_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Manticore_Medium.PrimalItem_BossTribute_Manticore_Medium_C',
                    },
                    alpha: {
                        bp: '/Game/ScorchedEarth/Dinos/Manticore/Manticore_Character_BP_Hard.Manticore_Character_BP_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Manticore_Hard.PrimalItem_BossTribute_Manticore_Hard_C',
                    },
                },
                icon: 'Manticore.webp',
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
