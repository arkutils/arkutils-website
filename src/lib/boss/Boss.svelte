<script lang="ts">
	import { asyncDerived, derived, loadAll } from '@square/svelte-store';

	import { getModDataStore } from '$lib/obelisk/asb';
	import { modIdFromPath } from '$lib/obelisk/core';
	import { flattenLoot, gatherDrops, getWikiDropsStore } from '$lib/obelisk/wiki/drops';
	import { getItemByClass, getWikiItemsStore, type Item } from '$lib/obelisk/wiki/items';
	import { getWikiSpeciesStore } from '$lib/obelisk/wiki/species';

	import { boss_data, difficulties } from './data';
	import DifficultySelector from './DifficultySelector.svelte';
	import type { Difficulty } from './types';
	import { dataForBoss, difficultyForBoss, getIconForDifficulty } from './utils';

	export let map: string;
	export let boss: string;
	export let difficulty: Difficulty | null;

	// Looked-up boss data
	$: data = dataForBoss(map, boss);
	$: difficultyData = difficultyForBoss(data, difficulty);

	// Async-derived stores for each file we need from Obelisk - '' is core (not a mod)
	const asbSpecies = getModDataStore('');
	const wikiItems = getWikiItemsStore('');
	const wikiDrops = getWikiDropsStore('');
	const wikiSpecies = getWikiSpeciesStore('');

	/** The ASB data for the species we're interested in */
	$: asbData = derived([asbSpecies], ([$asbSpecies]) => {
		if (!$asbSpecies) return undefined;
		return $asbSpecies?.speciesLookup[difficultyData.bp];
	});

	/** The wiki data for the species we're interested in */
	$: wikiSpeciesData = derived([wikiSpecies], ([$wikiSpecies]) => {
		if (!$wikiSpecies) return undefined;
		return $wikiSpecies?.speciesLookup[difficultyData.bp + '_C'];
	});

	// List of mods needed
	$: requiredMods = ['', ...(data.extraModIds ?? [])];

	// List of species and item stores we need
	$: requiredSpeciesStores = requiredMods.map((modId) => getModDataStore(modId));
	$: requiredModItemStores = requiredMods.map((modId) => getWikiItemsStore(modId));

	/** HP is pulled out of the ASB stat data, if present */
	$: hp = asyncDerived([...requiredSpeciesStores], async () => {
		const modId = modIdFromPath(difficultyData.bp);
		const [$modStore] = await loadAll([getModDataStore(modId)]);
		const species = $modStore.speciesLookup[difficultyData.bp];
		return Math.round(species?.fullStatsRaw[0]?.[0] ?? 0);
	});

	/** Engram classes come from the wiki species data, then we lookup item data for each */
	$: engrams = asyncDerived([...requiredSpeciesStores, ...requiredModItemStores], async () => {
		const modId = modIdFromPath(difficultyData.bp);
		const [$modStore] = await loadAll([getWikiSpeciesStore(modId)]);
		const species = $modStore.speciesLookup[difficultyData.bp + '_C'];
		const engrams: string[] = species.death?.engrams ?? [];
		const items = engrams.map((engram) => getItemByClass(engram));

		// Add any manually-added engrams
		if (difficultyData.manualEngrams) {
			difficultyData.manualEngrams.forEach((type) => {
				items.push(getItemByClass(type));
			});
		}
		return items;
	});

	/** Loot drops come from the wiki species data, then we lookup loot sets with item names */
	$: drops = derived(
		[wikiSpeciesData, wikiItems, wikiDrops, ...requiredModItemStores],
		([$wikiData, $wikiItems, $wikiDrops]) => {
			if (!$wikiData || !$wikiItems || !$wikiDrops) return undefined;

			// Pull the list of lootbags out of the species death data
			const lootbagList = $wikiData.death?.lootBags ?? [];

			// Grab the drop data for each lootbag
			const loot = lootbagList.map((dropChance) => {
				const drops = $wikiDrops.bpLookup[dropChance.item + '_C'];
				return gatherDrops(drops, $wikiItems);
			});

			// Flatten and apply qty multipliers
			const items: { min: number; max: number; item: Item }[] = flattenLoot(loot);
			return items;
		}
	);

	/** Summoning items */
	$: summon = derived(
		[getWikiItemsStore(modIdFromPath(difficultyData.summon)), ...requiredModItemStores],
		([$modItems]) => {
			if (!$modItems || !difficultyData.summon) return undefined;

			// Crafting recipe contains the level/items needed
			const summonItem = $modItems.bpLookup[difficultyData.summon];
			const levelReq = summonItem?.crafting?.levelReq;
			const items = summonItem?.crafting?.recipe?.map(({ qty, type }) => ({
				qty,
				item: getItemByClass(type),
			}));
			return { levelReq, items };
		}
	);

	$: icon = getIconForDifficulty(difficulty, data);
</script>

<section class="grid topsection grid-cols-[200px,auto] gap-4">
	<div class={difficulty}>
		<img src="/imgs/bosses/{icon}" alt="{data.display} flag image" width="200" class="w-full" />
	</div>
	<div class="row-start-2">
		{#if difficulty !== null}
			<DifficultySelector {map} {boss} {difficulty} />
		{/if}
	</div>
	<div class="flex flex-col gap-4">
		<h1 class="flex flex-col">
			<span
				>{#if difficulty !== null}{difficulties[difficulty].display}{/if}</span
			>
			<span>{data.display}</span>
			<span>({boss_data[map].display})</span>
		</h1>

		<div class="flex flex-col gap-4">
			<!-- Health data -->
			<p>
				Health:
				{#await loadAll([hp])}
					...
				{:then}
					{#if $hp !== undefined}
						{new Intl.NumberFormat().format($hp)}
					{:else}
						...
					{/if}
				{/await}

				<!-- TODO: insert damage reduction -->
			</p>

			{#if data.note}
				<p>{data.note}</p>
			{/if}
		</div>
	</div>
</section>

<!-- Summon -->
<h2 class="ml-1 mt-4 mb-2 text-base-content">Summon</h2>
<div class="bg-base-200 rounded-lg p-2 px-4 my-2">
	{#if difficultyData.summonNote}
		<p>{difficultyData.summonNote}</p>
	{/if}
	{#await loadAll([summon])}
		...loading...
	{:then}
		{#if $summon}
			<p><span class="text-secondary mr-1">Level needed:</span> <b>{$summon?.levelReq}</b></p>
			<ul>
				{#each $summon?.items || [] as req}
					<li title={req.item?.description}>
						{req.qty} x {req.item?.name}
					</li>
				{/each}
			</ul>
		{/if}
	{/await}
</div>

<!-- Engrams -->
<h2 class="ml-1 mt-4 mb-2 text-base-content">Engrams</h2>
<div class="bg-base-200 rounded-lg p-2 px-4 my-2">
	{#await loadAll([engrams])}
		...loading...
	{:then}
		{#if $engrams && $engrams.length}
			<ul>
				{#each $engrams || [] as item}
					<li title={item.description}>
						{item.name}
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-base-content/70 italic">No engrams</p>
		{/if}
	{/await}
</div>

<!-- Drops -->
<h2 class="ml-1 mt-4 mb-2 text-base-content">Drops</h2>
<div class="bg-base-200 rounded-lg p-2 px-4 my-2">
	{#await loadAll([drops])}
		...loading...
	{:then}
		<ul>
			{#each $drops || [] as { min, max, item }}
				<li title={item.description}>
					{#if min === max}{min}{:else}{min}-{max}{/if} x
					{item.name}
				</li>
			{/each}
			{#if difficultyData.dropsNote}
				<li>{difficultyData.dropsNote}</li>
			{/if}
		</ul>
	{/await}
</div>

<h3 class="mt-8">Content plan:</h3>
<ul class="text-sm ml-4">
	<li>Damage reduction, difficulty selector</li>
	<li>Other bosses on this map</li>
</ul>

<style lang="postcss">
	.gamma img {
		filter: url(#tintGamma);
	}
	.beta img {
		filter: url(#tintBeta);
	}
	.alpha img {
		filter: url(#tintAlpha);
	}
</style>
