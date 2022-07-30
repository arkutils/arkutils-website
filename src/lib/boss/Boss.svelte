<script lang="ts">
	import { derived, loadAll } from '@square/svelte-store';

	import { flattenLoot, gatherDrops, getWikiDropsStore } from '$lib/obelisk/wiki/drops';
	import { getWikiItemsStore, type Item } from '$lib/obelisk/wiki/items';
	import { getWikiSpeciesStore } from '$lib/obelisk/wiki/species';
	import { getModDataStore } from '$lib/obelisk/asb';

	import type { Difficulty } from './types';
	import { boss_data, difficulties } from './data';
	import { difficultyForBoss, dataForBoss } from './utils';

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

	/** HP is pulled out of the ASB stat data, if present */
	$: hp = derived([asbData], ([$asbData]) => {
		if (!$asbData) return undefined;
		return Math.round($asbData.fullStatsRaw[0]?.[0] ?? 0);
	});

	/** Engram classes come from the wiki species data, then we lookup item data for each */
	$: engrams = derived([wikiSpeciesData, wikiItems], ([$wikiData, $wikiItems]) => {
		if (!$wikiData || !$wikiItems) return undefined;
		const engrams: string[] = $wikiData.death?.engrams ?? [];
		const items = engrams.map((engram) => $wikiItems.clsLookup[engram]);
		return items;
	});

	/** Loot drops come from the wiki species data, then we lookup loot sets with item names */
	$: drops = derived(
		[wikiSpeciesData, wikiItems, wikiDrops],
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
	$: summon = derived([wikiItems], ([$wikiItems]) => {
		if (!$wikiItems) return undefined;

		// Crafting recipe contains the level/items needed
		const summonItem = $wikiItems.bpLookup[difficultyData.summon];
		const levelReq = summonItem.crafting.levelReq;
		const items = summonItem.crafting.recipe.map(({ qty, type }) => ({
			qty,
			item: $wikiItems.clsLookup[type]
		}));
		return { levelReq, items };
	});
</script>

<h1>
	<img src="/imgs/bosses/{data.icon}" alt="{data.display} flag image" width="200" />
	{#if difficulty !== null}{difficulties[difficulty].display}{/if}
	{data.display} ({boss_data[map].display})
</h1>

{#if difficulty !== null}
	<div>
		Difficulty selector
		<nav>
			<a href="/boss/{map}/{boss}-gamma">Gamma</a>
			<a href="/boss/{map}/{boss}-beta">Beta</a>
			<a href="/boss/{map}/{boss}-alpha">Alpha</a>
		</nav>
	</div>
{/if}

<!-- Health data -->
<p>
	Health:
	{#await loadAll([hp])} ... {:then} {$hp} {/await}
</p>

<!-- Engrams -->
<div>
	Engrams:
	{#await loadAll([engrams])}
		...loading...
	{:then}
		<ul class="list-disc list-inside ml-4 pl-4">
			{#each $engrams || [] as item}
				<li title={item.description}>
					{item.name}
				</li>
			{/each}
		</ul>
	{/await}
</div>

<!-- Drops -->
<div>
	Drops:
	{#await loadAll([drops])}
		...loading...
	{:then}
		<ul class="list-disc list-inside ml-4 pl-4">
			{#each $drops || [] as { min, max, item }}
				<li title={item.description}>
					{#if min === max}{min}{:else}{min}-{max}{/if} x
					{item.name}
				</li>
			{/each}
		</ul>
	{/await}
</div>

<!-- Summon -->
<div>
	Summon:
	{#await loadAll([summon])}
		...loading...
	{:then}
		<p>Level needed: {$summon?.levelReq}</p>
		<ul class="list-disc list-inside ml-4 pl-4">
			{#each $summon?.items || [] as req}
				<li title={req.item.description}>
					{req.qty} x {req.item.name}
				</li>
			{/each}
		</ul>
	{/await}
</div>

<h3 class="mt-8">Content plan:</h3>
<ul class="text-sm ml-4">
	<li>Damage reduction, difficulty selector</li>
	<li>Other bosses on this map</li>
</ul>
