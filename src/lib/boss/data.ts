import type { BossMap, DifficultyData, ItemExtra } from './types';


export const boss_data: Record<string, BossMap> = {
    island: {
        display: 'The Island',
        isLore: true,
        icon: 'island.webp',
        bosses: {
            broodmother: {
                display: 'Broodmother Lysrix',
                note: 'The Broodmother regularly spawns little spiders around her that web the player and their tames. Megatheriums can get a damage buff from killing those minions which makes them a viable option for defeating Broodmother on all difficulties.',
                searchTerms: 'spider',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Spider_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Easy.SpiderL_Character_BP_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Spider_Easy.PrimalItem_BossTribute_Spider_Easy_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Spider_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Medium.SpiderL_Character_BP_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Spider_Medium.PrimalItem_BossTribute_Spider_Medium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Spider_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_Hard.SpiderL_Character_BP_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Spider_Hard.PrimalItem_BossTribute_Spider_Hard_C'
                    }
                },
                icon: 'Spider.webp'
            },
            megapithecus: {
                display: 'Megapithecus',
                note: 'The Megapithecus has several strong attacks. It also spawns Gigantopithecus and Mesopithecus as minions that attack the player and their tames.',
                searchTerms: 'monkey gorilla',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Gorilla_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_Easy.Gorilla_Character_BP_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Gorilla_Easy.PrimalItem_BossTribute_Gorilla_Easy_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Gorilla_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_Medium.Gorilla_Character_BP_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Gorilla_Medium.PrimalItem_BossTribute_Gorilla_Medium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Gorilla_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_Hard.Gorilla_Character_BP_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Gorilla_Hard.PrimalItem_BossTribute_Gorilla_Hard_C'
                    }
                },
                icon: 'Monkey.webp'
            },
            dragon: {
                display: 'Dragon',
                note: 'The Dragon does percentage based fire damage that ignores armour. It regularly spawns Dimorphodons that attack the player directly and Pteranodons as minions.',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Dragon_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Dragon/Dragon_Character_BP_Boss_Easy.Dragon_Character_BP_Boss_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Dragon_Easy.PrimalItem_BossTribute_Dragon_Easy_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Dragon_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Dragon/Dragon_Character_BP_Boss_Medium.Dragon_Character_BP_Boss_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Dragon_Medium.PrimalItem_BossTribute_Dragon_Medium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Dragon_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Dragon/Dragon_Character_BP_Boss_Hard.Dragon_Character_BP_Boss_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Dragon_Hard.PrimalItem_BossTribute_Dragon_Hard_C'
                    }
                },
                icon: 'Dragon.webp'
            },
            overseer: {
                display: 'Overseer',
                note: 'This is a bossfight over many phases in which the Overseer turns into a VR version of one of the Island Bosses. Drones and Defence Units will attack as minions.',
                species: {
                    gamma: {
                        dropsNote: "Gamma Ascension Implant",
                        ascLevels: 5,
                        bp: '/Game/EndGame/Dinos/Endboss/EndBoss_Character_Easy.EndBoss_Character_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_DungeonEntrance_TekCave_Easy.PrimalItem_DungeonEntrance_TekCave_Easy_C'
                    },
                    beta: {
                        dropsNote: "Beta Ascension Implant",
                        ascLevels: 5,
                        bp: '/Game/EndGame/Dinos/Endboss/EndBoss_Character_Medium.EndBoss_Character_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_DungeonEntrance_TekCave_Medium.PrimalItem_DungeonEntrance_TekCave_Medium_C'
                    },
                    alpha: {
                        dropsNote: "Alpha Ascension Implant",
                        ascLevels: 5,
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
                note: 'Both Center bosses are spawned together. The Megapithecus has several strong attacks.',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Gorilla_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_TheCenter.Gorilla_Character_BP_TheCenter',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_TheCenter.PrimalItem_BossTribute_TheCenter_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Gorilla_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_TheCenter_Medium.Gorilla_Character_BP_TheCenter_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_TheCenter_Medium.PrimalItem_BossTribute_TheCenter_Medium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Gorilla_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Gorilla/Gorilla_Character_BP_TheCenter_Hard.Gorilla_Character_BP_TheCenter_Hard',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_TheCenter_Hard.PrimalItem_BossTribute_TheCenter_Hard_C'
                    }
                },
                icon: 'Monkey.webp'
            },
            broodmother: {
                display: 'Broodmother Lysrix',
                searchTerms: 'spider',
                note: 'Both Center bosses are spawned together. The Broodmother regularly spawns little spiders around her that web the player and their tames. ',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Spider_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_TheCenter.SpiderL_Character_BP_TheCenter',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_TheCenter.PrimalItem_BossTribute_TheCenter_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Spider_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/PrimalEarth/Dinos/Spider-Large/SpiderL_Character_BP_TheCenterMedium.SpiderL_Character_BP_TheCenterMedium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_TheCenter_Medium.PrimalItem_BossTribute_TheCenter_Medium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Spider_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
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
                note: 'The Manticore is mainly in the air but will come down eventually. It has a poison attack that torpors players and their tames. Deathworms and Rock Elemental are in the arena as minions. ',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemSkin_ManticoreBoots_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ManticoreShield_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Manticore_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/ScorchedEarth/Dinos/Manticore/Manticore_Character_BP_Easy.Manticore_Character_BP_Easy',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Manticore_Easy.PrimalItem_BossTribute_Manticore_Easy_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemSkin_ManticoreGloves_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ManticoreShirt_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ManticoreShield_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Manticore_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/ScorchedEarth/Dinos/Manticore/Manticore_Character_BP_Medium.Manticore_Character_BP_Medium',
                        summon: '/Game/PrimalEarth/CoreBlueprints/Items/Armor/Cloth/PrimalItem_BossTribute_Manticore_Medium.PrimalItem_BossTribute_Manticore_Medium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemSkin_ManticorePants_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ManticoreShield_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Manticore_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
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
                note: 'The Iceworm Queen is within an ice cave. She is visually a big and stronger icy Deathworm. She only spawns when the player drops into the waterfall in front of her arena without riding a dinosaur.',
                icon: 'IceWormQueen.webp',
                species: {
                    manualDrops: [
                        { item: "PrimalItemSkin_ManticoreHelmet_C", min: 1, max: 1, chance: 1, bp: 0 },
                    ],
                    bp: '/Game/Mods/Ragnarok/Custom_Assets/JacksonL/Iceworm/Iceworm_Queen_Character_BP.Iceworm_Queen_Character_BP',
                    summonNote: 'Appears as soon as you enter the right part of the ice cave.'
                }
            },
            lavagolem: {
                display: 'Lava Elemental',
                note: 'The Lava Elemental will spawn once the player is close enough to the arena. It is twice the size of a Rock Elemental.',
                searchTerms: 'golem',
                icon: 'LavaElemental.webp',
                species: {
                    bp: '/Game/Mods/Ragnarok/Custom_Assets/JacksonL/LavaGolem/LavaGolem_Character_BP.LavaGolem_Character_BP',
                    summonNote: 'Appears as soon as you enter the right part of the lava cave.'
                }
            },
            dragon: {
                display: 'Dragon',
                note: 'Killing both bosses unlocks the Tek Light as well. The Dragon does percentage based fire damage that ignores armour.',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Dragon_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        manualEngrams: ['PrimalItemStructure_TekLight_C'],
                        bp: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/Dragon_Character_BP_Boss_Easy_Ragnarok.Dragon_Character_BP_Boss_Easy_Ragnarok',
                        summon: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/PrimalItem_BossTribute_Ragnarok.PrimalItem_BossTribute_Ragnarok_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Dragon_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        manualEngrams: ['PrimalItemStructure_TekLight_C'],
                        bp: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/Dragon_Character_BP_Boss_Medium_Ragnarok.Dragon_Character_BP_Boss_Medium_Ragnarok',
                        summon: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/PrimalItem_BossTribute_Ragnarok_Medium.PrimalItem_BossTribute_Ragnarok_Medium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Dragon_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        manualEngrams: ['PrimalItemStructure_TekLight_C'],
                        bp: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/Dragon_Character_BP_Boss_Hard_Ragnarok.Dragon_Character_BP_Boss_Hard_Ragnarok',
                        summon: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/PrimalItem_BossTribute_Ragnarok_Hard.PrimalItem_BossTribute_Ragnarok_Hard_C'
                    }
                },
                icon: 'Dragon.webp'
            },
            manticore: {
                display: 'Manticore',
                note: 'Killing both bosses unlocks the Tek Light as well. The Manticore is mainly in the air but will come down eventually. It has a poison attack that torpors players and their tames.',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemSkin_ManticoreBoots_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ManticoreShield_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Manticore_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        manualEngrams: ['PrimalItemStructure_TekLight_C'],
                        bp: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/Manticore_Character_BP_Easy_Ragnarok.Manticore_Character_BP_Easy_Ragnarok',
                        summon: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/PrimalItem_BossTribute_Ragnarok.PrimalItem_BossTribute_Ragnarok_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemSkin_ManticoreGloves_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ManticoreShirt_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ManticoreShield_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Manticore_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        manualEngrams: ['PrimalItemStructure_TekLight_C'],
                        bp: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/Manticore_Character_BP_Medium_Ragnarok.Manticore_Character_BP_Medium_Ragnarok',
                        summon: '/Game/Mods/Ragnarok/Custom_Assets/Bosses/PrimalItem_BossTribute_Ragnarok_Medium.PrimalItem_BossTribute_Ragnarok_Medium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemSkin_ManticorePants_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ManticoreShield_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Manticore_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
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
                note: 'Rockwell becomes vulnerable once all tentacles are destroyed. After a short while he will sink into the Element pool he sits in and regrow the tentacles. Reapers and Nameless spawn as minions.',
                species: {
                    gamma: {
                        dropsNote: "Gamma Aberrant Implant",
                        manualDrops: [
                            { item: "PrimalItemSkin_DinoCute_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_OtterMask_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Rockwell_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Aberration/Boss/Rockwell/Rockwell_Character_BP_Easy.Rockwell_Character_BP_Easy',
                        summon: '/Game/Aberration/CoreBlueprints/Items/PrimalItem_BossTribute_Aberration_Easy.PrimalItem_BossTribute_Aberration_Easy_C'
                    },
                    beta: {
                        dropsNote: "Beta Aberrant Implant",
                        manualDrops: [
                            { item: "PrimalItemSkin_Chili_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_DinoCute_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_OtterMask_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Rockwell_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Aberration/Boss/Rockwell/Rockwell_Character_BP_Medium.Rockwell_Character_BP_Medium',
                        summon: '/Game/Aberration/CoreBlueprints/Items/PrimalItem_BossTribute_Aberration_Medium.PrimalItem_BossTribute_Aberration_Medium_C'
                    },
                    alpha: {
                        dropsNote: "Alpha Aberrant Implant",
                        manualDrops: [
                            { item: "PrimalItemSkin_Chili_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_DinoCute_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_OtterMask_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ScarySkull_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Rockwell_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
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
                note: 'In order to tame the Desert Titan, you have to destroy the corrupted nodes on his body. If you want to defeat him, you just have to kill him.',
                species: {
                    bp: '/Game/Extinction/Dinos/DesertKaiju/DesertKaiju_Character_BP.DesertKaiju_Character_BP',
                    summon: '/Game/Extinction/CoreBlueprints/Items/Tribute/PrimalItem_BossTribute_DesertKaiju.PrimalItem_BossTribute_DesertKaiju_C'
                },
                icon: 'DesertTitan.webp'
            },
            icetitan: {
                display: 'Ice Titan',
                note: 'In order to tame the Ice Titan, you have to destroy the corrupted nodes on his body. If you want to defeat him, you just have to kill him. ',
                species: {
                    bp: '/Game/Extinction/Dinos/IceKaiju/IceKaiju_Character_BP.IceKaiju_Character_BP',
                    summon: '/Game/Extinction/CoreBlueprints/Items/Tribute/PrimalItem_BossTribute_IceKaiju.PrimalItem_BossTribute_IceKaiju_C'
                },
                icon: 'IceTitan.webp'
            },
            foresttitan: {
                display: 'Forest Titan',
                note: 'In order to tame the Forest Titan, you have to destroy the corrupted nodes on his body. If you want to defeat him, you just have to kill him. ',
                species: {
                    bp: '/Game/Extinction/Dinos/ForestKaiju/ForestKaiju_Character_BP.ForestKaiju_Character_BP',
                    summon: '/Game/Extinction/CoreBlueprints/Items/Tribute/PrimalItem_BossTribute_ForestKaiju.PrimalItem_BossTribute_ForestKaiju_C'
                },
                icon: 'ForestTitan.webp'
            },
            kingtitan: {
                display: 'King Titan',
                note: 'The King Titan has several strong attacks. It cannnot be dragged outside of the arena because it will be pushed back into the middle regaining all its lost health.',
                searchTerms: 'mek',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_KingKaiju_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Extinction/Dinos/KingKaiju/KingKaiju_Character_BP.KingKaiju_Character_BP',
                        summon: '/Game/Extinction/CoreBlueprints/Items/Tribute/PrimalItem_BossTribute_KingKaijuEasy.PrimalItem_BossTribute_KingKaijuEasy_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_KingKaiju_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Extinction/Dinos/KingKaiju/KingKaiju_Character_BP_Beta.KingKaiju_Character_BP_Beta',
                        summon: '/Game/Extinction/CoreBlueprints/Items/Tribute/PrimalItem_BossTribute_KingKaijuMedium.PrimalItem_BossTribute_KingKaijuMedium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_KingKaijuMecha_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
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
                note: 'All three bosses spawn together on Valguero. The Dragon does percentage based fire damage that ignores armour.',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Dragon_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Dragon_Character_BP_Boss_Easy.Dragon_Character_BP_Boss_Easy',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Easy.PrimalItem_BossTribute_ValThreeBoss_Easy_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Dragon_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Dragon_Character_BP_Boss_Medium.Dragon_Character_BP_Boss_Medium',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Medium.PrimalItem_BossTribute_ValThreeBoss_Medium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Dragon_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Dragon_Character_BP_Boss_Hard.Dragon_Character_BP_Boss_Hard',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Hard.PrimalItem_BossTribute_ValThreeBoss_Hard_C'
                    }
                },
                icon: 'Dragon.webp'
            },
            manticore: {
                display: 'Manticore',
                note: 'All three bosses spawn together on Valguero. The Manticore is mainly in the air but will come down eventually. It has a poison attack that torpors players and their tames.',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemSkin_ManticoreBoots_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ManticoreShield_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Manticore_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Manticore_Character_BP_Easy.Manticore_Character_BP_Easy',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Easy.PrimalItem_BossTribute_ValThreeBoss_Easy_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemSkin_ManticoreGloves_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ManticoreShirt_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ManticoreShield_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Manticore_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Manticore_Character_BP_Medium.Manticore_Character_BP_Medium',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Medium.PrimalItem_BossTribute_ValThreeBoss_Medium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemSkin_ManticorePants_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemSkin_ManticoreShield_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Manticore_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Manticore_Character_BP_Hard.Manticore_Character_BP_Hard',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Hard.PrimalItem_BossTribute_ValThreeBoss_Hard_C'
                    }
                },
                icon: 'Manticore.webp'
            },
            megapithecus: {
                display: 'Megapithecus',
                note: 'All three bosses spawn together on Valguero. The Megapithecus has several strong attacks. It also spawns Gigantopithecus and Mesopithecus as minions that attack the player and their tames.',
                searchTerms: 'monkey',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Gorilla_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Gorilla_Character_BP_Easy.Gorilla_Character_BP_Easy',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Easy.PrimalItem_BossTribute_ValThreeBoss_Easy_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Gorilla_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Gorilla_Character_BP_Medium.Gorilla_Character_BP_Medium',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Medium.PrimalItem_BossTribute_ValThreeBoss_Medium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Gorilla_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/Gorilla_Character_BP_Hard.Gorilla_Character_BP_Hard',
                        summon: '/Game/Mods/Valguero/Assets/CoreBlueprints/Boss/PrimalItem_BossTribute_ValThreeBoss_Hard.PrimalItem_BossTribute_ValThreeBoss_Hard_C'
                    }
                },
                icon: 'Monkey.webp'
            },
            broodmother: {
                display: 'Broodmother',
                note: 'The Broodmother regularly spawns little spiders around her that web the player and their tames.',
                searchTerms: 'spider',
                species: {
                    manualDrops: [
                        { item: "PrimalItemStructure_Flag_Spider_C", min: 1, max: 1, chance: 1, bp: 0 },
                    ],
                    bp: '/Game/Mods/Valguero/Assets/Dinos/SpiderL/SpiderL_VAL_Character_BP.SpiderL_VAL_Character_BP',
                    summonNote: 'Sits in a trench in the redwood forest. Sometimes even several.'
                },
                icon: 'Spider.webp'
            }
        }
    },
    genesis1: {
        display: 'Genesis: Part 1',
        isLore: true,
        icon: 'genesis1.webp',
        bosses: {
            moeder: {
                display: 'Moeder',
                searchTerms: 'fish',
                note: 'Moeder is an underwater boss. She will spawn eels as minions and becomes vulnerable once all eels are killed.',
                species: {
                    gamma: {
                        summonNote: "Boss arena is entered through an underwater mission terminal.",
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_EelBoss_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Genesis/Dinos/EelBoss/EelBoss_Character_BP_Easy.EelBoss_Character_BP_Easy',
                        dropsNote: 'Moeder drops various items, but we\'re currently not able to provide a list of them.',
                    },
                    beta: {
                        summonNote: "Boss arena is entered through an underwater mission terminal.",
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_EelBoss_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Genesis/Dinos/EelBoss/EelBoss_Character_BP_Medium.EelBoss_Character_BP_Medium',
                        dropsNote: 'Moeder drops various items, but we\'re currently not able to provide a list of them.',
                    },
                    alpha: {
                        summonNote: "Boss arena is entered through an underwater mission terminal.",
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_EelBoss_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Genesis/Dinos/EelBoss/EelBoss_Character_BP_Hard.EelBoss_Character_BP_Hard',
                        dropsNote: 'Moeder drops various items, but we\'re currently not able to provide a list of them.',
                    }
                },
                icon: 'Moeder.webp'
            },
            mastercontroller: {
                display: 'Corrupted Master Controller',
                searchTerms: 'vr',
                note: 'The Corrupted Master Controller is a complex boss fight with several stages. Players collect keys on the ground and hand them in to progress. The Master Controller will regularly send out laser beams that dismount the player. Seek shelter beforehand under one of the structures within the arena.',
                species: {
                    gamma: {
                        ascLevels: 5,
                        dropsNote: "Gamma Terran Ascension Implant",
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_VRBoss_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Genesis/Dinos/VRMainBoss/VRMainBoss_Character_Easy.VRMainBoss_Character_Easy',
                        summonNote: 'Minimum missions to start: 58',
                    },
                    beta: {
                        ascLevels: 5,
                        dropsNote: "Beta Terran Ascension Implant",
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_VRBoss_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Genesis/Dinos/VRMainBoss/VRMainBoss_Character_Medium.VRMainBoss_Character_Medium',
                        summonNote: 'Minimum missions to start: 116',
                    },
                    alpha: {
                        ascLevels: 5,
                        dropsNote: "Alpha Terran Ascension Implant",
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_VRBoss_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
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
        extraSpeciesModIds: ['CrystalIsles'],
        extraItemsModIds: ['CrystalIsles'],
        extraDropsModIds: ['CrystalIsles'],
        bosses: {
            crystalwyvernqueen: {
                display: 'Crystal Wyvern Queen',
                note: 'The Crystal Wyvern Queen fight will be in the air and on the ground with the final phase being in the air. She spawns Crystal Wyverns and their babies to attack the player and their tames.',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_CIBoss_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Mods/CrystalIsles/Assets/Dinos/CIBoss/CrystalWyvern_Character_BP_Boss_Easy.CrystalWyvern_Character_BP_Boss_Easy',
                        summon: '/Game/Mods/CrystalIsles/Assets/Dinos/CIBoss/Arena/PrimalItem_BossTribute_CIBoss_Easy.PrimalItem_BossTribute_CIBoss_Easy_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_CIBoss_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Mods/CrystalIsles/Assets/Dinos/CIBoss/CrystalWyvern_Character_BP_Boss_Medium.CrystalWyvern_Character_BP_Boss_Medium',
                        summon: '/Game/Mods/CrystalIsles/Assets/Dinos/CIBoss/Arena/PrimalItem_BossTribute_CIBoss_Medium.PrimalItem_BossTribute_CIBoss_Medium_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_CIBoss_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Mods/CrystalIsles/Assets/Dinos/CIBoss/CrystalWyvern_Character_BP_Boss_Hard.CrystalWyvern_Character_BP_Boss_Hard',
                        summon: '/Game/Mods/CrystalIsles/Assets/Dinos/CIBoss/Arena/PrimalItem_BossTribute_CIBoss_Hard.PrimalItem_BossTribute_CIBoss_Hard_C'
                    }
                },
                icon: 'WyvernQueen.webp'
            }
        }
    },
    genesis2: {
        display: 'Genesis: Part 2',
        isLore: true,
        icon: 'genesis2.webp',
        bosses: {
            rockwellprime: {
                display: 'Rockwell Prime',
                note: 'Rockwell Prime is a bossfight over several stages in which you fight tentacles, minions and Rockwell himself last.',
                species: {
                    gamma: {
                        ascLevels: 5,
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_RockwellGen2_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Genesis2/Missions/ModularMission/FinalBattleAlt/Difficulties/Gamma/RockwellNode_Character_BP_Boss_Gamma.RockwellNode_Character_BP_Boss_Gamma',
                        summonNote: 'Need all Gamma missions to enter the fight',
                    },
                    beta: {
                        ascLevels: 5,
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_RockwellGen2_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Genesis2/Missions/ModularMission/FinalBattleAlt/Difficulties/Beta/RockwellNode_Character_BP_Boss_Beta.RockwellNode_Character_BP_Boss_Beta',
                        summonNote: 'Need all Beta missions to enter the fight',
                    },
                    alpha: {
                        ascLevels: 5,
                        manualDrops: [
                            { item: "PrimalItemSkin_Costume_MutatedSurvivor_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_RockwellGen2_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
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
                note: 'The Dinopithecus King can unmount you in this boss fight. It will spawn Dinopithecus carried by Sinomacrops and Dinopithecus riding Amargasaurus as minions.',
                searchTerms: 'monkey',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_BossDinopithecus_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/LostIsland/Boss/BossDinopithecus_Character_BP_Easy.BossDinopithecus_Character_BP_Easy',
                        summon: '/Game/LostIsland/Boss/Arena/PrimalItem_BossTribute_LostIsland_Easy.PrimalItem_BossTribute_LostIsland_Easy_C',
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_BossDinopithecus_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/LostIsland/Boss/BossDinopithecus_Character_BP_Medium.BossDinopithecus_Character_BP_Medium',
                        summon: '/Game/LostIsland/Boss/Arena/PrimalItem_BossTribute_LostIsland_Medium.PrimalItem_BossTribute_LostIsland_Medium_C',
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemSkin_Costume_Dinopithecus_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_BossDinopithecus_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
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
        extraItemsModIds: ['FjordurOfficial'],
        sets: [
            {
                name: "World Bosses",
                description: "World bosses on Fjordur are the first tier.",
                bosses: ['beyla', 'hati', 'skoll', 'steinbjorn']
            },
            {
                name: "Island Bosses",
                description: "Island bosses are the second tier.",
                bosses: ['broodmother', 'megapithecus', 'dragon']
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
                note: 'Beyla is a fairly easy boss that can be defeated by decent Megatheriums with good saddles and imprint.',
                searchTerms: 'bee',
                species: {
                    bp: '/Game/Fjordur/Dinos/Beyla/Beyla_Character_BP.Beyla_Character_BP',
                    summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_Beyla.PrimalItem_BossTribute_Beyla_C',
                },
                icon: 'Beyla.webp'
            },
            hati: {
                display: 'Hati',
                note: 'Hati and Sköll spawn together and can be defeated with any animal that does enough damage and can take some damage.',
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
                note: 'Hati and Sköll spawn together and can be defeated with any animal that does enough damage and can take some damage.',
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
                note: 'Steinbjörn has a strong armour that not many animals can bypass. The Giganotosaurus is the best choice as a tame for the fight.',
                searchTerms: 'bear',
                species: {
                    bp: '/Game/Fjordur/Dinos/Steinbjorn/Steinbjorn_Character_BP.Steinbjorn_Character_BP',
                    summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_Steinbjorn.PrimalItem_BossTribute_Steinbjorn_C',
                },

                icon: 'Steinbjorn.webp'
            },
            broodmother: {
                display: 'Broodmother Lysrix',
                note: 'The Broodmother regularly spawns little spiders around her that web the player and their tames. Megatheriums can get a damage buff from killing those minions which makes them a viable option for defeating Broodmother on all difficulties. ',
                searchTerms: 'spider',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Spider_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Fjordur/Dinos/IslandBosses/SpiderL_Character_BP_Easy_FJ.SpiderL_Character_BP_Easy_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Spider_Easy.PrimalItem_BossTribute_FJ_Spider_Easy_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Spider_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Fjordur/Dinos/IslandBosses/SpiderL_Character_BP_Medium_FJ.SpiderL_Character_BP_Medium_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Spider_Med.PrimalItem_BossTribute_FJ_Spider_Med_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Spider_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Fjordur/Dinos/IslandBosses/SpiderL_Character_BP_Hard_FJ.SpiderL_Character_BP_Hard_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Spider_Hard.PrimalItem_BossTribute_FJ_Spider_Hard_C'
                    }
                },
                icon: 'Spider.webp'
            },
            megapithecus: {
                display: 'Megapithecus',
                note: 'The Megapithecus has several strong attacks. It also spawns Gigantopithecus and Mesopithecus as minions that attack the player and their tames.',
                searchTerms: 'monkey gorilla',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Gorilla_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Fjordur/Dinos/IslandBosses/Gorilla_Character_BP_Easy_FJ.Gorilla_Character_BP_Easy_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Gorilla_Easy.PrimalItem_BossTribute_FJ_Gorilla_Easy_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Gorilla_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Fjordur/Dinos/IslandBosses/Gorilla_Character_BP_Medium_FJ.Gorilla_Character_BP_Medium_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Gorilla_Med.PrimalItem_BossTribute_FJ_Gorilla_Med_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Gorilla_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Fjordur/Dinos/IslandBosses/Gorilla_Character_BP_Hard_FJ.Gorilla_Character_BP_Hard_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Gorilla_Hard.PrimalItem_BossTribute_FJ_Gorilla_Hard_C'
                    }
                },
                icon: 'Monkey.webp'
            },
            dragon: {
                display: 'Dragon',
                note: 'The Dragon does percentage based fire damage that ignores armour. It regularly spawns Dimorphodons that attack the player directly and Pteranodons as minions.',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Dragon_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Fjordur/Dinos/IslandBosses/Dragon_Character_BP_Boss_Easy_FJ.Dragon_Character_BP_Boss_Easy_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Dragon_Easy.PrimalItem_BossTribute_FJ_Dragon_Easy_C'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Dragon_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Fjordur/Dinos/IslandBosses/Dragon_Character_BP_Boss_Medium_FJ.Dragon_Character_BP_Boss_Medium_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Dragon_Med.PrimalItem_BossTribute_FJ_Dragon_Med_C'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Dragon_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Fjordur/Dinos/IslandBosses/Dragon_Character_BP_Boss_Hard_FJ.Dragon_Character_BP_Boss_Hard_FJ',
                        summon: '/Game/Mods/FjordurOfficial/Assets/Teleports/BossTributes/PrimalItem_BossTribute_FJ_Dragon_Hard.PrimalItem_BossTribute_FJ_Dragon_Hard_C'
                    }
                },
                icon: 'Dragon.webp'
            },
            fenris: {
                display: 'Fenrisúlfr',
                note: 'Fenrisúlfr can dismount you, freeze you and deals great damage when close to it. Bring animals that block it off so it can not get too close to you.',
                searchTerms: 'wolf',
                species: {
                    gamma: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Fjordur_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Fjordur/Boss/Fenrir_Character_BP_Boss_Easy.Fenrir_Character_BP_Boss_Easy',
                        summon: '/Game/Fjordur/Boss/Arena/PrimalItem_BossTribute_FenrirBoss_Easy.PrimalItem_BossTribute_FenrirBoss_Easy_C',
                        dropsNote: '1 x Cryopod Fenrir Lvl 150'
                    },
                    beta: {
                        manualDrops: [
                            { item: "PrimalItemStructure_Flag_Fjordur_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
                        bp: '/Game/Fjordur/Boss/Fenrir_Character_BP_Boss_Medium.Fenrir_Character_BP_Boss_Medium',
                        summon: '/Game/Fjordur/Boss/Arena/PrimalItem_BossTribute_FenrirBoss_Medium.PrimalItem_BossTribute_FenrirBoss_Medium_C',
                        dropsNote: '1 x Cryopod Fenrir Lvl 190'
                    },
                    alpha: {
                        manualDrops: [
                            { item: "PrimalItem_WeaponTekSword_Mjolnir_C", min: 1, max: 1, chance: 1, bp: 0 },
                            { item: "PrimalItemStructure_Flag_Fjordur_C", min: 1, max: 1, chance: 1, bp: 0 },
                        ],
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
