<script lang="ts">
	import { onMount } from 'svelte';

	import { loadMod, type ModData } from '$lib/obelisk';

	import SpeciesSelector from '$lib/SpeciesSelector.svelte';

	type WildTamedBred = 'wild' | 'tamed' | 'bred';

	const STAT_NAMES = [
		'Health',
		'Stamina',
		'Torpidity',
		'Oxygen',
		'Food',
		'Water',
		'Temperature',
		'Weight',
		'Melee',
		'Speed',
		'Fortitude',
		'Crafting'
	];

	const defaultStatMults = [
		[1, 0.2, 0.14, 0.44],
		[1, 1, 1, 1],
		[1, 1, 1, 1],
		[1, 1, 1, 1],
		[1, 1, 1, 1],
		[1, 1, 1, 1],
		[1, 1, 1, 1],
		[1, 1, 1, 1],
		[1, 0.17, 0.14, 0.44],
		[1, 1, 1, 1],
		[1, 1, 1, 1],
		[1, 1, 1, 1]
	];

	const defaultIBM = 1;

	let loaded = false;
	let modData: ModData = null;
	let loadedModId: string = null;
	let selectedModId: string = null;
	let selectedSpecies: string = '';
	let selectedStat = 0;
	let statData: {
		base: number;
		wildLevel: number;
		tameLevel: number;
		tameAdd: number;
		tameAff: number;
	} = null;
	let tbhm = 1;

	let wtb: WildTamedBred = 'wild';
	let wildLevels = 0;
	let tameLevels = 0;
	let imprint = 0;
	let te = 0;

	$: if (loaded) selectMod(selectedModId);
	$: if (loaded) fetchStatData(modData, selectedSpecies, selectedStat);

	onMount(async () => {
		// Load core
		modData = await loadMod('');
		selectedModId = loadedModId = '';
		loaded = true;
	});

	async function selectMod(modId) {
		if (modId === loadedModId) return;
		modData = await loadMod(modId);
	}

	function fetchStatData(data: ModData, species: string, stat: number) {
		const speciesData = data.speciesLookup[species];
		if (!speciesData) return null;
		const fullStatsRaw = speciesData.fullStatsRaw[stat];
		if (!fullStatsRaw) return;
		statData = {
			//  [B, Iw, Id, Ta, Tm]
			base: fullStatsRaw[0],
			wildLevel: fullStatsRaw[1],
			tameLevel: fullStatsRaw[2],
			tameAdd: fullStatsRaw[3],
			tameAff: fullStatsRaw[4]
		};
		tbhm = speciesData.TamedBaseHealthMultiplier || 1;
	}

	function calculate(
		wtb: WildTamedBred,
		wildLevels: number,
		tameLevels: number,
		imprint: number,
		te: number
	) {}
</script>

<main class="flex flex-col gap-8">
	<!-- Species selection -->
	<section class="flex flex-col gap-4">
		<h2>Select species</h2>
		<SpeciesSelector bind:selectedSpecies />
	</section>

	<input type="range" min="0" max="11" bind:value={selectedStat} />
	<span>{STAT_NAMES[selectedStat]}</span>

	{#if statData}
		<section>
			<div>Base: <span>{statData.base}</span></div>
			<div>WildLevel: <span>{statData.wildLevel}</span></div>
			<div>TameLevel: <span>{statData.tameLevel}</span></div>
			<div>TameAdd: <span>{statData.tameAdd}</span></div>
			<div>TameAff: <span>{statData.tameAff}</span></div>
		</section>
	{/if}

	<section class="flex flex-col gap-1">
		<label>
			Wild Levels:
			<input type="number" class="bg-gray-700" bind:value={wildLevels} />
		</label>
		<label>
			Tame Effectiveness
			<input type="number" class="bg-gray-700" bind:value={te} />
		</label>
		<label>
			Tame Levels:
			<input type="number" class="bg-gray-700" bind:value={tameLevels} />
		</label>
		<label>
			Imprint
			<input type="number" class="bg-gray-700" bind:value={imprint} />
		</label>
	</section>

	<section>
		Server mults:
		<div>PerLevelStatsMultiplier_DinoWild = {defaultStatMults[selectedStat][0]} (IwM)</div>
		<div>PerLevelStatsMultiplier_DinoTamed = {defaultStatMults[selectedStat][1]} (IdM)</div>
		<div>PerLevelStatsMultiplier_DinoTamed_Add = {defaultStatMults[selectedStat][2]} (TaM)</div>
		<div>
			PerLevelStatsMultiplier_DinoTamed_Affinity = {defaultStatMults[selectedStat][3]} (TmM)
		</div>
	</section>

	<div class="flex justify-between gap-12">
		<section>
			<div>Vwild = B × (1 + Lw × Iw × IwM)</div>
			<div>Vtame = (Vwild × TBHM + Ta * TaM)</div>
		</section>

		<section>
			<pre>V = (B × (1 + Lw × Iw × IwM)
       × TBHM × (1 + IB × 0.2 × IBM)
       + Ta × TaM)
    × (1 + TE × Tm × TmM)
    × (1 + Ld × Id × IdM)</pre>
		</section>

		{#if statData}
			<section>
				<pre>V = ({statData.base} × (1 + {wildLevels} × {statData.wildLevel} × {defaultStatMults[
						selectedStat
					][0]})
       × {tbhm} × (1 + {imprint} × 0.2 × {defaultIBM})
       + {statData.tameLevel} × {defaultStatMults[selectedStat][1]})
    × (1 + {te} × {statData.tameAff} × {defaultStatMults[selectedStat][3]})
    × (1 + {tameLevels} × {statData.tameLevel} × {defaultStatMults[selectedStat][2]})</pre>
			</section>
		{/if}
	</div>

	{#if statData}
		<section>
			{(statData.base *
				(1 + wildLevels * statData.wildLevel * defaultStatMults[selectedStat][0]) *
				tbhm *
				(1 + imprint * 0.2 * defaultIBM) +
				statData.tameLevel * defaultStatMults[selectedStat][1]) *
				(1 + te * statData.tameAff * defaultStatMults[selectedStat][3]) *
				(1 + tameLevels * statData.tameLevel * defaultStatMults[selectedStat][2])}
		</section>
	{/if}
</main>
