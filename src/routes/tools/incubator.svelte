<script lang="ts">
	import { onMount } from 'svelte';

	import { isSpeciesUseful, loadMod, type ModData, type Species } from '$lib/obelisk';
	import { selectedModId, selectedSpecies } from '$lib/stores';

	import SpeciesSelector from '$lib/SpeciesSelector.svelte';
	import Health from '$lib/imgs/stats/Health.svelte';
	import Stamina from '$lib/imgs/stats/Stamina.svelte';
	import Oxygen from '$lib/imgs/stats/Oxygen.svelte';
	import Food from '$lib/imgs/stats/Food.svelte';
	import Weight from '$lib/imgs/stats/Weight.svelte';
	import Damage from '$lib/imgs/stats/Damage.svelte';
	import Speed from '$lib/imgs/stats/Speed.svelte';
	import Torpor from '$lib/imgs/stats/Torpor.svelte';

	const STAT_NAMES = [
		'Health',
		'Stamina',
		'Torpidity',
		'Oxygen',
		'Food',
		'Water',
		'Temperature',
		'Weight',
		'Damage',
		'Speed',
		'Fortitude',
		'Crafting'
	];

	const STAT_IMAGES = [
		Health,
		Stamina,
		Torpor,
		Oxygen,
		Food,
		null,
		null,
		Weight,
		Damage,
		Speed,
		null,
		null // TODO: Need crafting icon?
	];

	// Display order, mirroring in-game
	const statDisplayOrder = [0, 1, 7, 8, 3, 4, 9];

	const serverMults = [
		// [IwM, IdM, TaM, TmM]
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

	const defaultImprintMults = [0.2, 0.0, 0.2, 0.0, 0.2, 0.2, 0.0, 0.2, 0.2, 0.2, 0.0, 0.0];

	let loaded = false;
	let modData: ModData | null = null;
	let loadedModId: string | null = null;
	let speciesData: Species;
	let eggTemp: number | null = null;
	let similarEggs: string[] = [];

	let wildLevels: number[] = Array(12).fill(0);

	$: if (loaded) selectMod($selectedModId);
	$: if (loaded) selectSpecies($selectedSpecies);

	onMount(async () => {
		// Load core
		modData = await loadMod('');
		$selectedModId = loadedModId = '';
		loaded = true;
	});

	async function selectMod(modId: string) {
		if (modId === loadedModId) return;
		modData = await loadMod(modId);
		loadedModId = modId;
	}

	async function selectSpecies(speciesId: string) {
		if (!modData) return;
		speciesData = modData.speciesLookup[speciesId];

		// Look for egg temps
		if (speciesData.breeding) {
			eggTemp = calculateOptimalTemp(
				speciesData.breeding.eggTempMin,
				speciesData.breeding.eggTempMax
			);
			similarEggs = findSimilarEggs(eggTemp, $selectedSpecies);
		} else {
			eggTemp = null;
			similarEggs = [];
		}
	}

	function calculateOptimalTemp(minTemp: number | undefined, maxTemp: number | undefined) {
		if (typeof minTemp !== 'number' || typeof maxTemp !== 'number') return null;
		const tempRange = maxTemp - minTemp;
		const optimalTemp = Math.round(minTemp + tempRange / 2);
		return optimalTemp;
	}

	function findSimilarEggs(temp: number | null, thisSpecies: string) {
		if (temp === null || modData === null) return [];

		const matches: string[] = [];
		for (const species of modData.species) {
			// Don't include ourself
			if (species.blueprintPath === thisSpecies) continue;

			// Skip unbreedable
			if (!species.breeding) continue;

			// Skip minions, bosses, currupt, etc
			if (!isSpeciesUseful(species)) continue;

			const thisTemp = calculateOptimalTemp(
				species.breeding.eggTempMin,
				species.breeding.eggTempMax
			);

			if (thisTemp === temp && !matches.includes(species.name)) {
				matches.push(species.name);
			}
		}

		return matches;
	}

	function calcStat(stat: number, wildLevels: number, speciesData: Species): number | null {
		// Check the species has this stat
		if (!speciesData.fullStatsRaw[stat]) return null;

		// Species values
		const [B, Iw, Id, Ta, Tm] = speciesData.fullStatsRaw[stat];
		const TBHM = speciesData.TamedBaseHealthMultiplier;
		const IBm = speciesData.statImprintMult
			? speciesData.statImprintMult[stat]
			: defaultImprintMults[stat];

		// Server values
		const [IwM, IdM, TaM, TmM] = serverMults[stat];
		const IBmM = 1;

		// Dynamic values
		const Lw = wildLevels;
		const Ld = 0;
		const IB = 0;
		const TE = 1;

		/**
		 * V = (B × (1 + Lw × Iw × IwM) × TBHM × (1 + IB × 0.2 × IBM) + Ta × TaM)
		 *     × (1 + TE × Tm × TmM) × (1 + Ld × Id × IdM)
		 */

		// Start with the base
		let V = B;

		// Apply the wild levels, scaled by species and server multipliers
		V = V * (1 + Lw * Iw * IwM);

		// Apply the TamedBaseHealthMultiplier (only for health)
		if (stat === 0) {
			V = V * TBHM;
		}

		// Apply the imprint, scaled by species and server multipliers
		V = V * (1 + IB * IBm * IBmM);

		// Add the species TameAdd, scaled by its server multiplier
		// Note: Server multiplier is only applied if Ta is positive
		if (Ta >= 0) {
			V = V + Ta * TaM;
		} else {
			V = V + Ta;
		}

		// Apply the TamingEffectiveness, scaled by the species and server multipliers
		V = V * (1 + TE * Tm * TmM);

		// Apply tamed levels, scaled by the species and server multipliers
		V = V * (1 + Ld * Id * IdM);

		return V;
	}

	/** Calculate and format a stat value */
	function statValue(stat: number, wildLevels: number, speciesData: Species): string {
		let value = calcStat(stat, wildLevels, speciesData);
		if (value === null) return '-';

		const isPct = isPercentStat(stat);

		// Percentage stats (movement speed and damage) are treated differently
		if (isPct) {
			value = value * 100;
		}

		let output = value.toFixed(1);

		if (isPct) {
			output = output + '%';
		}

		return output;
	}

	/** Pick the stats to display for a species */
	function selectStats(speciesData: Species): number[] {
		if (!speciesData) return statDisplayOrder;

		// Pick stats in display order if present in the displayedStats bitmask
		const stats = [];
		const mask = speciesData.displayedStats;
		for (const i of statDisplayOrder) {
			if (mask & (1 << i)) stats.push(i);
		}

		return stats;
	}

	function isPercentStat(stat: number): boolean {
		return stat === 8 || stat === 9;
	}
</script>

<main class="flex flex-col gap-8">
	<!-- Info -->
	<header class="flex flex-wrap justify-center gap-x-4 ">
		<div class="overflow-visible flex justify-center">
			<img
				src="/imgs/incubator.png"
				class="w-[120px] h-[120px] md:w-[180px] md:h-[160px] mr-4"
				alt="An incubator"
			/>
			<h1 class="text-base-content text-right text-4xl md:text-6xl">
				Incubator<br />Calculator
			</h1>
		</div>
		<div class="bg-base-300 p-4 rounded-lg shadow-lg">
			<h2 class="text-base-content mb-2 text-2xl md:text-3xl">How does it work?</h2>
			<ul class="text-base-content">
				<li>- Choose the animal</li>
				<li>- Enter the level, the incubator shows</li>
				<li>- See the stat below</li>
			</ul>
		</div>
	</header>

	<!-- Species selection -->
	<section class="flex flex-col gap-4">
		<h2>Select species</h2>
		<SpeciesSelector
			bind:selectedSpecies={$selectedSpecies}
			bind:selectedModId={$selectedModId}
		/>
	</section>

	<!-- Stats -->
	<section
		class="flex flex-wrap gap-x-8 sm:gap-x-24 gap-y-6 sm:gap-y-8 px-4 sm:px-8 justify-center"
	>
		{#each selectStats(speciesData) as i (`stat-${i}`)}
			<div class="flex gap-4 items-center">
				<span title={STAT_NAMES[i]} class="text-[60px] sm:text-[75px] text-[#ded]">
					<svelte:component this={STAT_IMAGES[i]} />
				</span>
				<div class="flex flex-col items-center justify-center gap-1 mt-1 w-28">
					<input
						type="number"
						class="input input-sm bg-base-200 w-16"
						min="0"
						max="255"
						bind:value={wildLevels[i]}
					/>
					<span class="text-xl font-bold text-primary">
						{#if speciesData}
							{statValue(i, wildLevels[i], speciesData)}
						{:else}
							...
						{/if}
					</span>
				</div>
			</div>
		{/each}
	</section>

	<!-- Egg info -->
	{#if eggTemp}
		<section class="bg-base-200 p-4 rounded-lg shadow-lg">
			<div>
				Optimal Temp:
				<span class="font-bold text-lg text-secondary ml-2">
					{typeof eggTemp === 'number' ? eggTemp : '-'}°C
				</span>
			</div>
			{#if similarEggs && similarEggs.length}
				<div class="mt-2">Best incubated together with:</div>
				<div class="font-bold text-secondary">
					{#each similarEggs as eggSpecies, i}
						{#if i !== 0}
							<span>, </span>
						{/if}
						<span class="whitespace-nowrap species-name">{eggSpecies}</span>
					{/each}
				</div>
			{:else}
				<div class="mt-2">
					Best incubated together with:
					<span class="font-bold text-secondary">nothing</span>
				</div>
			{/if}
		</section>
	{/if}

	<!-- Troubleshooting -->
	<section class="bg-base-200 p-4 flex flex-wrap gap-4 justify-center rounded-lg shadow-lg">
		<div>
			<h2 class=" font-thin text-2xl mb-2">It didn't work?</h2>
			<ul>
				<li>- You have different server stats than vanilla</li>
				<li>- You chose the wrong creature</li>
				<li>- You have Single-Player Settings active</li>
			</ul>
			<div class=" mt-2">
				In this case please use <a href="http://cadon.github.io/ARKStatsExtractor/">
					ARK Smart Breeding
				</a> to determine your creatures stats.
			</div>
		</div>
		<div class="flex justify-center items-center">
			<a href="https://cadon.github.io/ARKStatsExtractor/" alt="Ark Smart Breeding tool">
				<img src="/imgs/asb.png" alt="Ark breeding logo" class="w-24 h-24" />
			</a>
		</div>
	</section>
</main>

<style lang="postcss">
	* {
		/* @apply bg-white/3; */
	}
</style>
