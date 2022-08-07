import type { BossMap, DifficultyData, ItemExtra } from './types';


export const boss_data: Record<string, BossMap> = {
    island: {
        display: 'The Island',
        isLore: true,
        icon: 'island.webp',
        bosses: {
            broodmother: {
                display: 'Broodmother Lysrix',
                searchTerms: 'spider',
                species: {
                    gamma: {
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Easy.SpiderL_Character_BP_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Spider_Easy.PrimalItem_BossTribute_Spider_Easy_C'
                    },
                    beta: {
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Medium.SpiderL_Character_BP_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Spider_Medium.PrimalItem_BossTribute_Spider_Medium_C'
                    },
                    alpha: {
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Hard.SpiderL_Character_BP_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Spider_Hard.PrimalItem_BossTribute_Spider_Hard_C'
                    }
                },
                icon: 'Spider.webp'
            },
            megapithicus: {
                display: 'Megapithicus',
                searchTerms: 'monkey gorilla',
                species: {
                    gamma: {
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_Easy.Gorilla_Character_BP_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Gorilla_Easy.PrimalItem_BossTribute_Gorilla_Easy_C'
                    },
                    beta: {
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_Medium.Gorilla_Character_BP_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Gorilla_Medium.PrimalItem_BossTribute_Gorilla_Medium_C'
                    },
                    alpha: {
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_Hard.Gorilla_Character_BP_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Gorilla_Hard.PrimalItem_BossTribute_Gorilla_Hard_C'
                    }
                },
                icon: 'Monkey.webp'
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
                    }
                },
                icon: 'Dragon.webp'
            },
            overseer: {
                display: 'Overseer',
                species: {
                    gamma: {
                        bp: '/Game/EndGame/Dinos/Endboss/EndBoss_Character_Easy.EndBoss_Character_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_DungeonEntrance_TekCave_Easy.PrimalItem_DungeonEntrance_TekCave_Easy_C'
                    },
                    beta: {
                        bp: '/Game/EndGame/Dinos/Endboss/EndBoss_Character_Medium.EndBoss_Character_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_DungeonEntrance_TekCave_Medium.PrimalItem_DungeonEntrance_TekCave_Medium_C'
                    },
                    alpha: {
                        bp: '/Game/EndGame/Dinos/Endboss/EndBoss_Character_Hard.EndBoss_Character_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_DungeonEntrance_TekCave_Hard.PrimalItem_DungeonEntrance_TekCave_Hard_C'
                    }
                },
                icon: 'Overseer.webp'
            }
        }
    },
    thecenter: {
        display: 'The Center',
        isLore: false,
        icon: 'map.webp',
        bosses: {
            megapithecus: {
                display: 'Megapithecus',
                searchTerms: 'monkey',
                note: 'Both Center bosses are spawned together.',
                species: {
                    gamma: {
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_TheCenter.Gorilla_Character_BP_TheCenter',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_TheCenter.PrimalItem_BossTribute_TheCenter_C'
                    },
                    beta: {
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_TheCenter_Medium.Gorilla_Character_BP_TheCenter_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_TheCenter_Medium.PrimalItem_BossTribute_TheCenter_Medium_C'
                    },
                    alpha: {
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_TheCenter_Hard.Gorilla_Character_BP_TheCenter_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_TheCenter_Hard.PrimalItem_BossTribute_TheCenter_Hard_C'
                    }
                },
                icon: 'Monkey.webp'
            },
            broodmother: {
                display: 'Broodmother Lysrix',
                searchTerms: 'spider',
                note: 'Both Center bosses are spawned together.',
                species: {
                    gamma: {
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_TheCenter.SpiderL_Character_BP_TheCenter',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_TheCenter.PrimalItem_BossTribute_TheCenter_C'
                    },
                    beta: {
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_TheCenterMedium.SpiderL_Character_BP_TheCenterMedium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_TheCenter_Medium.PrimalItem_BossTribute_TheCenter_Medium_C'
                    },
                    alpha: {
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_TheCenterHard.SpiderL_Character_BP_TheCenterHard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_TheCenter_Hard.PrimalItem_BossTribute_TheCenter_Hard_C'
                    }
                },
                icon: 'Spider.webp'
            }
        }
    },
    scorchedearth: {
        display: 'Scorched Earth',
        isLore: true,
        icon: 'scorched.webp',
        bosses: {
            manticore: {
                display: 'Manticore',
                species: {
                    gamma: {
                        bp: '/Game/ScorchedEarth/Dinos/Manticore/Manticore_Character_BP_Easy.Manticore_Character_BP_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Manticore_Easy.PrimalItem_BossTribute_Manticore_Easy_C'
                    },
                    beta: {
                        bp: '/Game/ScorchedEarth/Dinos/Manticore/Manticore_Character_BP_Medium.Manticore_Character_BP_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Manticore_Medium.PrimalItem_BossTribute_Manticore_Medium_C'
                    },
                    alpha: {
                        bp: '/Game/ScorchedEarth/Dinos/Manticore/Manticore_Character_BP_Hard.Manticore_Character_BP_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Manticore_Hard.PrimalItem_BossTribute_Manticore_Hard_C'
                    }
                },
                icon: 'Manticore.webp'
            }
        }
    },
    ragnarok: {
        display: 'Ragnarok',
        isLore: false,
        icon: 'map.webp',
        sets: [
            {
                name: "World Bosses",
                bosses: ['icewormqueen', 'lavagolem'],
            },
            {
                name: "Summoned Bosses",
                bosses: ['dragon', 'manticore'],
            },
        ],
        bosses: {
            icewormqueen: {
                display: 'Iceworm Queen',
                note: '',
                icon: 'IceWormQueen.webp',
                species: {
                    bp: '/Game/Mods/Ragnarok/Custom_Assets/JacksonL/Iceworm/Iceworm_Queen_Character_BP.Iceworm_Queen_Character_BP',
                    summonNote: 'Appears as soon as you enter the right part of the ice cave.'
                }
            },
            lavagolem: {
                display: 'Lava Elemental',
                searchTerms: 'golem',
                icon: 'LavaElemental.webp',
                species: {
                    bp: '/Game/Mods/Ragnarok/Custom_Assets/JacksonL/LavaGolem/LavaGolem_Character_BP.LavaGolem_Character_BP',
                    summonNote: 'Appears as soon as you enter the right part of the lava cave.'
                }
            },
            dragon: {
                display: 'Dragon',
                note: 'Killing both bosses unlocks the Tek Light as well',
                species: {
                    gamma: {
                        manualEngrams: ['PrimalItemStructure_TekLight_C'],
                        bp: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/Dragon_Character_BP_Boss_Easy_Ragnarok.Dragon_Character_BP_Boss_Easy_Ragnarok',
                        summon: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/PrimalItem_BossTribute_Ragnarok.PrimalItem_BossTribute_Ragnarok_C'
                    },
                    beta: {
                        manualEngrams: ['PrimalItemStructure_TekLight_C'],
                        bp: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/Dragon_Character_BP_Boss_Medium_Ragnarok.Dragon_Character_BP_Boss_Medium_Ragnarok',
                        summon: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/PrimalItem_BossTribute_Ragnarok_Medium.PrimalItem_BossTribute_Ragnarok_Medium_C'
                    },
                    alpha: {
                        manualEngrams: ['PrimalItemStructure_TekLight_C'],
                        bp: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/Dragon_Character_BP_Boss_Hard_Ragnarok.Dragon_Character_BP_Boss_Hard_Ragnarok',
                        summon: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/PrimalItem_BossTribute_Ragnarok_Hard.PrimalItem_BossTribute_Ragnarok_Hard_C'
                    }
                },
                icon: 'Dragon.webp'
            },
            manticore: {
                display: 'Manticore',
                note: 'Killing both bosses unlocks the Tek Light as well',
                species: {
                    gamma: {
                        manualEngrams: ['PrimalItemStructure_TekLight_C'],
                        bp: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/Manticore_Character_BP_Easy_Ragnarok.Manticore_Character_BP_Easy_Ragnarok',
                        summon: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/PrimalItem_BossTribute_Ragnarok.PrimalItem_BossTribute_Ragnarok_C'
                    },
                    beta: {
                        manualEngrams: ['PrimalItemStructure_TekLight_C'],
                        bp: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/Manticore_Character_BP_Medium_Ragnarok.Manticore_Character_BP_Medium_Ragnarok',
                        summon: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/PrimalItem_BossTribute_Ragnarok_Medium.PrimalItem_BossTribute_Ragnarok_Medium_C'
                    },
                    alpha: {
                        manualEngrams: ['PrimalItemStructure_TekLight_C'],
                        bp: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/Manticore_Character_BP_Hard_Ragnarok.Manticore_Character_BP_Hard_Ragnarok',
                        summon: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/PrimalItem_BossTribute_Ragnarok_Hard.PrimalItem_BossTribute_Ragnarok_Hard_C'
                    }
                },
                icon: 'Manticore.webp'
            }
        }
    },
    aberration: {
        display: 'Aberration',
        isLore: true,
        icon: 'aberration.webp',
        bosses: {
            rockwell: {
                display: 'Rockwell',
                species: {
                    gamma: {
                        bp: '/Game/Aberration/Boss/Rockwell/Rockwell_Character_BP_Easy.Rockwell_Character_BP_Easy',
                        summon: '/Game/Aberration/CoreBlueprints/Items/PrimalItem_BossTribute_Aberration_Easy.PrimalItem_BossTribute_Aberration_Easy_C'
                    },
                    beta: {
                        bp: '/Game/Aberration/Boss/Rockwell/Rockwell_Character_BP_Medium.Rockwell_Character_BP_Medium',
                        summon: '/Game/Aberration/CoreBlueprints/Items/PrimalItem_BossTribute_Aberration_Medium.PrimalItem_BossTribute_Aberration_Medium_C'
                    },
                    alpha: {
                        bp: '/Game/Aberration/Boss/Rockwell/Rockwell_Character_BP_Hard.Rockwell_Character_BP_Hard',
                        summon: '/Game/Aberration/CoreBlueprints/Items/PrimalItem_BossTribute_Aberration_Hard.PrimalItem_BossTribute_Aberration_Hard_C'
                    }
                },
                icon: 'Rockwell.webp'
            }
        }
    },
    extinction: {
        display: 'Extinction',
        isLore: true,
        icon: 'extinction.webp',
        bosses: {
            deserttitan: {
                display: 'Desert Titan',
                species: {
                    bp: '/Game/Extinction/Dinos/DesertKaiju/DesertKaiju_Character_BP.DesertKaiju_Character_BP',
                    summon: '/Game/Extinction/CoreBlueprints/Items/Tribute/PrimalItem_BossTribute_DesertKaiju.PrimalItem_BossTribute_DesertKaiju_C'
                },
                icon: 'DesertTitan.webp'
            },
            icetitan: {
                display: 'Ice Titan',
                species: {
                    bp: '/Game/Extinction/Dinos/IceKaiju/IceKaiju_Character_BP.IceKaiju_Character_BP',
                    summon: '/Game/Extinction/CoreBlueprints/Items/Tribute/PrimalItem_BossTribute_IceKaiju.PrimalItem_BossTribute_IceKaiju_C'
                },
                icon: 'IceTitan.webp'
            },
            foresttitan: {
                display: 'Forest Titan',
                species: {
                    bp: '/Game/Extinction/Dinos/ForestKaiju/ForestKaiju_Character_BP.ForestKaiju_Character_BP',
                    summon: '/Game/Extinction/CoreBlueprints/Items/Tribute/PrimalItem_BossTribute_ForestKaiju.PrimalItem_BossTribute_ForestKaiju_C'
                },
                icon: 'ForestTitan.webp'
            },
            kingtitan: {
                display: 'King Titan',
                searchTerms: 'mek',
                species: {
                    gamma: {
                        bp: '/Game/Extinction/Dinos/KingKaiju/KingKaiju_Character_BP.KingKaiju_Character_BP',
                        summon: '/Game/Extinction/CoreBlueprints/Items/Tribute/PrimalItem_BossTribute_KingKaijuEasy.PrimalItem_BossTribute_KingKaijuEasy_C'
                    },
                    beta: {
                        bp: '/Game/Extinction/Dinos/KingKaiju/KingKaiju_Character_BP_Beta.KingKaiju_Character_BP_Beta',
                        summon: '/Game/Extinction/CoreBlueprints/Items/Tribute/PrimalItem_BossTribute_KingKaijuMedium.PrimalItem_BossTribute_KingKaijuMedium_C'
                    },
                    alpha: {
                        bp: '/Game/Extinction/Dinos/KingKaiju/KingKaiju_Character_BP_Alpha.KingKaiju_Character_BP_Alpha',
                        summon: '/Game/Extinction/CoreBlueprints/Items/Tribute/PrimalItem_BossTribute_KingKaijuHard.PrimalItem_BossTribute_KingKaijuHard_C'
                    }
                },
                icon: 'KingTitan.webp',
                alphaIconOverride: 'KingTitanMech.webp'
            }
        }
    },
    valguero: {
        display: 'Valguero',
        isLore: false,
        icon: 'map.webp',
        sets: [
            {
                name: "World Bosses",
                bosses: ['broodmother'],
            },
            {
                name: "Summoned Bosses",
                bosses: ['dragon', 'manticore', 'megapithecus'],
            },
        ],
        bosses: {
            dragon: {
                display: 'Dragon',
                species: {
                    gamma: {
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Dragon_Character_BP_Boss_Easy.Dragon_Character_BP_Boss_Easy',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Easy.PrimalItem_BossTribute_ValThreeBoss_Easy_C'
                    },
                    beta: {
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Dragon_Character_BP_Boss_Medium.Dragon_Character_BP_Boss_Medium',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Medium.PrimalItem_BossTribute_ValThreeBoss_Medium_C'
                    },
                    alpha: {
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Dragon_Character_BP_Boss_Hard.Dragon_Character_BP_Boss_Hard',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Hard.PrimalItem_BossTribute_ValThreeBoss_Hard_C'
                    }
                },
                icon: 'Dragon.webp'
            },
            manticore: {
                display: 'Manticore',
                species: {
                    gamma: {
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Manticore_Character_BP_Easy.Manticore_Character_BP_Easy',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Easy.PrimalItem_BossTribute_ValThreeBoss_Easy_C'
                    },
                    beta: {
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Manticore_Character_BP_Medium.Manticore_Character_BP_Medium',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Medium.PrimalItem_BossTribute_ValThreeBoss_Medium_C'
                    },
                    alpha: {
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Manticore_Character_BP_Hard.Manticore_Character_BP_Hard',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Hard.PrimalItem_BossTribute_ValThreeBoss_Hard_C'
                    }
                },
                icon: 'Manticore.webp'
            },
            megapithecus: {
                display: 'Megapithecus',
                searchTerms: 'monkey',
                species: {
                    gamma: {
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Gorilla_Character_BP_Easy.Gorilla_Character_BP_Easy',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Easy.PrimalItem_BossTribute_ValThreeBoss_Easy_C'
                    },
                    beta: {
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Gorilla_Character_BP_Medium.Gorilla_Character_BP_Medium',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Medium.PrimalItem_BossTribute_ValThreeBoss_Medium_C'
                    },
                    alpha: {
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Gorilla_Character_BP_Hard.Gorilla_Character_BP_Hard',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Hard.PrimalItem_BossTribute_ValThreeBoss_Hard_C'
                    }
                },
                icon: 'Monkey.webp'
            },
            broodmother: {
                display: 'Broodmother',
                searchTerms: 'spider',
                species: {

                    bp: '/Game/Mods/Valguero/Assets/Dinos/SpiderL/SpiderL_VAL_Character_BP.SpiderL_VAL_Character_BP',
                    summonNote: 'Sits in a trench in the redwood forest. Sometimes even several.'
                },
                icon: 'Spider.webp'
            }
        }
    },
    genesis1: {
        display: 'Genesis: Part 1',
        isLore: true,
        icon: 'genesis1.webp',
        note: 'Big ass map',
        bosses: {
            moeder: {
                display: 'Moeder',
                searchTerms: 'fish',
                note: 'Big ass fish',
                species: {
                    gamma: {
                        bp: '/Game/Genesis/Dinos/EelBoss/EelBoss_Character_BP_Easy.EelBoss_Character_BP_Easy',
                        dropsNote: 'Moeder drops various items, but we\'re currently not able to provide a list of them.',
                    },
                    beta: {
                        bp: '/Game/Genesis/Dinos/EelBoss/EelBoss_Character_BP_Medium.EelBoss_Character_BP_Medium',
                        dropsNote: 'Moeder drops various items, but we\'re currently not able to provide a list of them.',
                    },
                    alpha: {
                        bp: '/Game/Genesis/Dinos/EelBoss/EelBoss_Character_BP_Hard.EelBoss_Character_BP_Hard',
                        dropsNote: 'Moeder drops various items, but we\'re currently not able to provide a list of them.',
                    }
                },
                icon: 'Moeder.webp'
            },
            mastercontroller: {
                display: 'Corrupted Master Controller',
                searchTerms: 'vr',
                note: '',
                species: {
                    gamma: {
                        bp: '/Game/Genesis/Dinos/VRMainBoss/VRMainBoss_Character_Easy.VRMainBoss_Character_Easy',
                        summonNote: 'Minimum missions to start: 58',
                    },
                    beta: {
                        bp: '/Game/Genesis/Dinos/VRMainBoss/VRMainBoss_Character_Medium.VRMainBoss_Character_Medium',
                        summonNote: 'Minimum missions to start: 116',
                    },
                    alpha: {
                        bp: '/Game/Genesis/Dinos/VRMainBoss/VRMainBoss_Character_Hard.VRMainBoss_Character_Hard',
                        summonNote: 'Minimum missions to start: 168',
                    }
                },
                icon: 'VRBoss.webp'
            }
        }
    },
    crystalisles: {
        display: 'Crystal Isles',
        isLore: false,
        icon: 'map.webp',
        extraModIds: ['CrystalIsles'],
        bosses: {
            crystalwyvernqueen: {
                display: 'Crystal Wyvern Queen',
                species: {
                    gamma: {
                        bp: '/Game/Mods/CrystalIsles/Assets/Dinos/CIBoss/CrystalWyvern_Character_BP_Boss_Easy.CrystalWyvern_Character_BP_Boss_Easy',
                        summon: '/Game/Mods/CrystalIsles/Assets/Dinos/CIBoss/Arena/PrimalItem_BossTribute_CIBoss_Easy.PrimalItem_BossTribute_CIBoss_Easy_C'
                    },
                    beta: {
                        bp: '/Game/Mods/CrystalIsles/Assets/Dinos/CIBoss/CrystalWyvern_Character_BP_Boss_Medium.CrystalWyvern_Character_BP_Boss_Medium',
                        summon: '/Game/Mods/CrystalIsles/Assets/Dinos/CIBoss/Arena/PrimalItem_BossTribute_CIBoss_Medium.PrimalItem_BossTribute_CIBoss_Medium_C'
                    },
                    alpha: {
                        bp: '/Game/Mods/CrystalIsles/Assets/Dinos/CIBoss/CrystalWyvern_Character_BP_Boss_Hard.CrystalWyvern_Character_BP_Boss_Hard',
                        summon: '/Game/Mods/CrystalIsles/Assets/Dinos/CIBoss/Arena/PrimalItem_BossTribute_CIBoss_Hard.PrimalItem_BossTribute_CIBoss_Hard_C'
                    }
                },
                icon: 'WyvernQueen.webp'
            }
        }
    },
    genesis2: {
        display: 'Genesis: Part 2',
        isLore: true,
        icon: 'genesis2.webp',
        bosses: {
            rockwellprime: {
                display: 'Rockwell Prime',
                species: {
                    gamma: {
                        bp: '/Game/Genesis2/Missions/ModularMission/FinalBattleAlt/Difficulties/Gamma/RockwellNode_Character_BP_Boss_Gamma.RockwellNode_Character_BP_Boss_Gamma',
                        summonNote: 'Need all Gamma missions to enter the fight',
                    },
                    beta: {
                        bp: '/Game/Genesis2/Missions/ModularMission/FinalBattleAlt/Difficulties/Beta/RockwellNode_Character_BP_Boss_Beta.RockwellNode_Character_BP_Boss_Beta',
                        summonNote: 'Need all Beta missions to enter the fight',
                    },
                    alpha: {
                        bp: '/Game/Genesis2/Missions/ModularMission/FinalBattleAlt/Difficulties/Alpha/RockwellNode_Character_BP_Boss_Alpha.RockwellNode_Character_BP_Boss_Alpha',
                        summonNote: 'Need all Alpha missions to enter the fight',
                    }
                },
                icon: 'RockwellFinalForm.webp'
            }
        }
    },
    lostisland: {
        display: 'Lost Island',
        isLore: false,
        icon: 'map.webp',
        bosses: {
            dinopithecusking: {
                display: 'Dinopithecus King',
                searchTerms: 'monkey',
                species: {
                    gamma: {
                        bp: '/Game/LostIsland/Boss/BossDinopithecus_Character_BP_Easy.BossDinopithecus_Character_BP_Easy',
                        summon: '/Game/LostIsland/Boss/Arena/PrimalItem_BossTribute_LostIsland_Easy.PrimalItem_BossTribute_LostIsland_Easy_C',
                    },
                    beta: {
                        bp: '/Game/LostIsland/Boss/BossDinopithecus_Character_BP_Medium.BossDinopithecus_Character_BP_Medium',
                        summon: '/Game/LostIsland/Boss/Arena/PrimalItem_BossTribute_LostIsland_Medium.PrimalItem_BossTribute_LostIsland_Medium_C',
                    },
                    alpha: {
                        bp: '/Game/LostIsland/Boss/BossDinopithecus_Character_BP_Hard.BossDinopithecus_Character_BP_Hard',
                        summon: '/Game/LostIsland/Boss/Arena/PrimalItem_BossTribute_LostIsland_Hard.PrimalItem_BossTribute_LostIsland_Hard_C',
                    }
                },
                icon: 'Dinopithecus.webp'
            }
        }
    },
    fjordur: {
        display: 'Fjordur',
        isLore: false,
        icon: 'map.webp',
        sets: [
            {
                name: "World Bosses",
                description: "World bosses on Fjordur are the first tier.",
                bosses: ['beyla', 'hati', 'skoll', 'steinbjorn']
            },
            {
                name: "Island Bosses",
                description: "Island bosses are the second tier.",
                bosses: ['broodmother', 'megapithicus', 'dragon']
            },
            {
                name: "Fenrisúlfr",
                description: "Fenrisúlfr is the ultimate boss on Fjordur.",
                bosses: ['fenris']
            },
        ],
        bosses: {
            beyla: {
                display: 'Beyla',
                searchTerms: 'bee',
                species: {
                    bp: '/Game/Fjordur/Dinos/Beyla/Beyla_Character_BP.Beyla_Character_BP',
                    summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_Beyla.PrimalItem_BossTribute_Beyla_C',
                },
                icon: 'Beyla.webp'
            },
            hati: {
                display: 'Hati',
                searchTerms: 'wolf',
                species: {
                    bp: '/Game/Fjordur/Dinos/HatiSkoll/Fenrir_Character_BP_MiniBoss_Hati.Fenrir_Character_BP_MiniBoss_Hati',
                    summonNote: 'Hati & Sköll are summoned together',
                    summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_HatiAndSkoll.PrimalItem_BossTribute_HatiAndSkoll_C',
                },

                icon: 'Hati.webp'
            },
            skoll: {
                display: 'Sköll',
                searchTerms: 'wolf',
                species: {
                    bp: '/Game/Fjordur/Dinos/HatiSkoll/Fenrir_Character_BP_MiniBoss_Skoll.Fenrir_Character_BP_MiniBoss_Skoll',
                    summonNote: 'Hati & Sköll are summoned together',
                    summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_HatiAndSkoll.PrimalItem_BossTribute_HatiAndSkoll_C',
                },

                icon: 'Skoll.webp'
            },
            steinbjorn: {
                display: 'Steinbjörn',
                searchTerms: 'bear',
                species: {
                    bp: '/Game/Fjordur/Dinos/Steinbjorn/Steinbjorn_Character_BP.Steinbjorn_Character_BP',
                    summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_Steinbjorn.PrimalItem_BossTribute_Steinbjorn_C',
                },

                icon: 'Steinbjorn.webp'
            },
            broodmother: {
                display: 'Broodmother Lysrix',
                searchTerms: 'spider',
                species: {
                    gamma: {
                        bp: '/Game/Fjordur/Dinos/IslandBosses/SpiderL_Character_BP_Easy_FJ.SpiderL_Character_BP_Easy_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Spider_Easy.PrimalItem_BossTribute_FJ_Spider_Easy_C'
                    },
                    beta: {
                        bp: '/Game/Fjordur/Dinos/IslandBosses/SpiderL_Character_BP_Medium_FJ.SpiderL_Character_BP_Medium_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Spider_Med.PrimalItem_BossTribute_FJ_Spider_Med_C'
                    },
                    alpha: {
                        bp: '/Game/Fjordur/Dinos/IslandBosses/SpiderL_Character_BP_Hard_FJ.SpiderL_Character_BP_Hard_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Spider_Hard.PrimalItem_BossTribute_FJ_Spider_Hard_C'
                    }
                },
                icon: 'Spider.webp'
            },
            megapithicus: {
                display: 'Megapithicus',
                searchTerms: 'monkey gorilla',
                species: {
                    gamma: {
                        bp: '/Game/Fjordur/Dinos/IslandBosses/Gorilla_Character_BP_Easy_FJ.Gorilla_Character_BP_Easy_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Gorilla_Easy.PrimalItem_BossTribute_FJ_Gorilla_Easy_C'
                    },
                    beta: {
                        bp: '/Game/Fjordur/Dinos/IslandBosses/Gorilla_Character_BP_Medium_FJ.Gorilla_Character_BP_Medium_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Gorilla_Med.PrimalItem_BossTribute_FJ_Gorilla_Med_C'
                    },
                    alpha: {
                        bp: '/Game/Fjordur/Dinos/IslandBosses/Gorilla_Character_BP_Hard_FJ.Gorilla_Character_BP_Hard_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Gorilla_Hard.PrimalItem_BossTribute_FJ_Gorilla_Hard_C'
                    }
                },
                icon: 'Monkey.webp'
            },
            dragon: {
                display: 'Dragon',
                species: {
                    gamma: {
                        bp: '/Game/Fjordur/Dinos/IslandBosses/Dragon_Character_BP_Boss_Easy_FJ.Dragon_Character_BP_Boss_Easy_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Dragon_Easy.PrimalItem_BossTribute_FJ_Dragon_Easy_C'
                    },
                    beta: {
                        bp: '/Game/Fjordur/Dinos/IslandBosses/Dragon_Character_BP_Boss_Medium_FJ.Dragon_Character_BP_Boss_Medium_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Dragon_Med.PrimalItem_BossTribute_FJ_Dragon_Med_C'
                    },
                    alpha: {
                        bp: '/Game/Fjordur/Dinos/IslandBosses/Dragon_Character_BP_Boss_Easy_FJ.Dragon_Character_BP_Boss_Easy_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Dragon_Hard.PrimalItem_BossTribute_FJ_Dragon_Hard_C'
                    }
                },
                icon: 'Dragon.webp'
            },
            fenris: {
                display: 'Fenrisúlfr',
                searchTerms: 'wolf',
                species: {
                    gamma: {
                        bp: '/Game/Fjordur/Boss/Fenrir_Character_BP_Boss_Easy.Fenrir_Character_BP_Boss_Easy',
                        summon: '/Game/Fjordur/Boss/Arena/PrimalItem_BossTribute_FenrirBoss_Easy.PrimalItem_BossTribute_FenrirBoss_Easy_C',
                        dropsNote: '1 x Cryopod Fenrir Lvl 150'
                    },
                    beta: {
                        bp: '/Game/Fjordur/Boss/Fenrir_Character_BP_Boss_Medium.Fenrir_Character_BP_Boss_Medium',
                        summon: '/Game/Fjordur/Boss/Arena/PrimalItem_BossTribute_FenrirBoss_Medium.PrimalItem_BossTribute_FenrirBoss_Medium_C',
                        dropsNote: '1 x Cryopod Fenrir Lvl 19'
                    },
                    alpha: {
                        bp: '/Game/Fjordur/Boss/Fenrir_Character_BP_Boss_Hard.Fenrir_Character_BP_Boss_Hard',
                        summon: '/Game/Fjordur/Boss/Arena/PrimalItem_BossTribute_FenrirBoss_Hard.PrimalItem_BossTribute_FenrirBoss_Hard_C',
                        dropsNote: '1 x Cryopod Fenrir Lvl 225'
                    },
                },
                icon: 'Fenris.webp'
            }
        }
    }
};

export const difficulties: Record<string, DifficultyData> = {
    gamma: {
        display: 'Gamma',
        level: 'Easy'
    },
    beta: {
        display: 'Beta',
        level: 'Medium'
    },
    alpha: {
        display: 'Alpha',
        level: 'Hard'
    }
};

export const item_data: Record<string, ItemExtra> = {
    'PrimalItemStructure_TekLight_C': {
        searchTerms: 'lamp',
    },

    'PrimalItemStructure_TekCloningChamber_C': {
        searchTerms: 'clone cloner',
    },
}
