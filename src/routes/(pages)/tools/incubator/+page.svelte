<script lang="ts">
	import { onMount } from 'svelte';

	import { getModDataStore, isSpeciesUseful, type IndexedModData, type Species } from '$lib/obelisk/asb';
	import { selectedModId, selectedSpecies } from '$lib/stores';

	import Damage from '$lib/imgs/stats/Damage.svelte';
	import Food from '$lib/imgs/stats/Food.svelte';
	import Health from '$lib/imgs/stats/Health.svelte';
	import Oxygen from '$lib/imgs/stats/Oxygen.svelte';
	import Speed from '$lib/imgs/stats/Speed.svelte';
	import Stamina from '$lib/imgs/stats/Stamina.svelte';
	import Torpor from '$lib/imgs/stats/Torpor.svelte';
	import Weight from '$lib/imgs/stats/Weight.svelte';
	import Metadata from '$lib/Metadata.svelte';
	import SpeciesSelector from '$lib/SpeciesSelector.svelte';
	import SupportedWidget from '$lib/SupportedWidget.svelte';
	import { loadAll } from '@square/svelte-store';

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
		'Crafting',
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
		null, // TODO: Need crafting icon?
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
		[1, 1, 1, 1],
	];

	const defaultImprintMults = [0.2, 0.0, 0.2, 0.0, 0.2, 0.2, 0.0, 0.2, 0.2, 0.2, 0.0, 0.0];

	let loaded = false;
	let modData: IndexedModData | null = null;
	let loadedModId: string | null = null;
	let speciesData: Species;
	let eggTemp: number | null = null;
	let similarEggs: string[] = [];

	let wildLevels: number[] = Array(12).fill(0);

	$: if (loaded) selectMod($selectedModId);
	$: if (loaded && $selectedSpecies && modData) selectSpecies($selectedSpecies);

	onMount(async () => {
		// Load core
		[modData] = await loadAll([getModDataStore('')]);
		loaded = true;
	});

	async function selectMod(modId: string) {
		if (modId === loadedModId) return;
		[modData] = await loadAll([getModDataStore(modId)]);
		loadedModId = modId;
	}

	async function selectSpecies(speciesId: string) {
		if (!modData) return;
		speciesData = modData.speciesLookup[speciesId];

		// Look for egg temps
		if (speciesData?.breeding) {
			eggTemp = calculateOptimalTemp(speciesData.breeding.eggTempMin, speciesData.breeding.eggTempMax);
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

	function findSimilarEggs(temp: number | null, thisSpecies: string | null) {
		if (temp === null || modData === null) return [];

		const matches: string[] = [];
		for (const species of modData.species) {
			// Don't include ourself
			if (species.blueprintPath === thisSpecies) continue;

			// Skip unbreedable
			if (!species.breeding) continue;

			// Skip minions, bosses, currupt, etc
			if (!isSpeciesUseful(species)) continue;

			const thisTemp = calculateOptimalTemp(species.breeding.eggTempMin, species.breeding.eggTempMax);

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
		// @ts-ignore - TS fails to see that this is a number[]
		const [B, Iw, Id, Ta, Tm]: number[] = speciesData.fullStatsRaw[stat];
		const TBHM = speciesData.TamedBaseHealthMultiplier ?? 1.0;
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

<Metadata
	title="Incubator Calculator"
	description="The Incubator Calculator lets you calculate the raw stats from level points in the ARK Incubator but it also lets you calculate the level points when you only have raw stats without the need of a modded spyglass."
/>

<!-- Site navigation breadcrumbs -->
<div class="flex">
	<nav class="text-sm breadcrumbs mb-2 flex-grow">
		<ul class="text-sm ml-4">
			<li><a href="/">Home</a></li>
			<li>Incubator Calculator</li>
		</ul>
	</nav>
	<SupportedWidget aseSupport="full" asaSupport="full" />
</div>

<main class="flex flex-col gap-4">
	<!-- Info -->
	<header class="flex flex-wrap justify-center gap-x-4">
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
		<SpeciesSelector bind:selectedSpecies={$selectedSpecies} bind:selectedModId={$selectedModId} />
	</section>

	<!-- Stats -->
	<section class="flex flex-wrap gap-x-8 sm:gap-x-24 gap-y-6 sm:gap-y-8 px-4 sm:px-8 justify-center">
		{#each selectStats(speciesData) as i (`stat-${i}`)}
			{@const statName = STAT_NAMES[i]}
			<div class="flex gap-4 items-center">
				<label title={statName} for="{statName}inp" class="text-[60px] sm:text-[75px] text-[#ded]">
					<svelte:component this={STAT_IMAGES[i]} />
				</label>
				<div class="flex flex-col items-center justify-center gap-1 mt-1 w-28">
					<input
						id="{statName}inp"
						type="number"
						class="input input-sm bg-base-200 w-20"
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

	<!-- Troodonism warning -->
	{#if speciesData?.altBaseStats}
		<div role="alert" class="alert alert-warning">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/></svg
			>
			<span class="block">
				<b>Warning</b>: This species suffers from a bug we call a Troodonism and often calculates its
				stats incorrectly <span class="whitespace-nowrap">in-game</span>. For full details please see
				the
				<a
					class="inline text-warning-content font-bold italic"
					href="https://ark.wiki.gg/wiki/Troodonism">Troodonism</a
				> page on the wiki.
			</span>
		</div>
	{/if}

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
				<li>- You chose the wrong species</li>
				<li>- You have single player settings active</li>
			</ul>
			<div class=" mt-2">
				In this case please use <a href="http://cadon.github.io/ARKStatsExtractor/">
					ARK Smart Breeding
				</a> to determine your creatures stats.
			</div>
		</div>
		<div class="flex justify-center items-center">
			<a href="https://cadon.github.io/ARKStatsExtractor/" title="Ark Smart Breeding tool">
				<img src="/imgs/asb.png" alt="Ark breeding logo" class="w-24 h-24" />
			</a>
		</div>
	</section>
</main>
