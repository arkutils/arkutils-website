<script lang="ts">
	import { asyncDerived, derived, loadAll } from '@square/svelte-store';

	import { getModDataStore } from '$lib/obelisk/asb';
	import { modIdFromPath } from '$lib/obelisk/core';
	import { gatherLoot, getWikiDropsStore } from '$lib/obelisk/wiki/drops';
	import { getItemByClass, getWikiItemsStore } from '$lib/obelisk/wiki/items';
	import { getWikiSpeciesStore } from '$lib/obelisk/wiki/species';

	import { boss_data, difficulties } from './data';
	import DifficultySelector from './DifficultySelector.svelte';
	import type { Difficulty } from './types';
	import { dataForBoss, difficultyForBoss, filterOutRichTextTags, getIconForDifficulty } from './utils';

	export let map: string;
	export let boss: string;
	export let difficulty: Difficulty | null;

	let showFullEngrams = false;
	let showFullDrops = false;
	const restrictListCount = 8;

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
			const loot = gatherLoot(lootbagList, $wikiDrops);
			return loot;
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

	function restrictItems<T>(original: T[], full: boolean): T[] {
		return full ? original : original.slice(0, restrictListCount);
	}
</script>

<section class="grid topsection grid-cols-[minmax(100px,200px),auto] gap-4">
	<div class="flex flex-col gap-4">
		<div class={difficulty}>
			<img src="/imgs/bosses/{icon}" alt="{data.display} flag image" width="200" class="w-full" />
		</div>
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
			<p class="text-xl">
				<span class="text-secondary">Health:</span>
				{#await loadAll([hp])}
					...
				{:then}
					{#if $hp !== undefined}
						<b>{new Intl.NumberFormat().format($hp)}</b>
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

<!-- Ascension -->
{#if difficultyData.ascLevels}
	<h2 class="ml-1 mt-4 mb-2 text-primary">Ascension</h2>
	<div class="alert alert-info shadow-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-current flex-shrink-0 w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>
				This boss gives you a higher player level cap upon it's first defeat. Each difficulty gives
				you {difficultyData.ascLevels} levels. If you decide to skip directly to Alpha you will get all
				{3 * difficultyData.ascLevels} levels in one go.
			</span>
		</div>
	</div>
{/if}

<!-- Summon -->
<h2 class="ml-1 mt-4 mb-2 text-primary">Summon</h2>
<div class="bg-base-200 rounded-lg p-2 px-4 my-2">
	{#if difficultyData.summonNote}
		<p>{difficultyData.summonNote}</p>
	{/if}
	{#await loadAll([summon])}
		...loading...
	{:then}
		{#if $summon}
			<p><span class="text-secondary mr-1">Level needed:</span> <b>{$summon?.levelReq}</b></p>
		{/if}
		{#if !difficultyData.summonNote || $summon?.items?.length}
			<RestrictedList items={$summon?.items} max={25} let:item={req}>
				<li title={filterOutRichTextTags(req.item?.description)}>
					{req.qty} x {req.item?.name}
				</li>
			</RestrictedList>
		{/if}
	{/await}
</div>

<!-- Engrams -->
<h2 class="ml-1 mt-4 mb-2 text-primary">Engrams</h2>
<div class="bg-base-200 rounded-lg p-2 px-4 my-2">
	{#await loadAll([engrams])}
		...loading...
	{:then}
		<RestrictedList items={$engrams} max={restrictListCount} let:item>
			<li title={filterOutRichTextTags(item.description)}>
				{item.name}
			</li>
		</RestrictedList>
	{/await}
</div>

<div class="mt-4 grid grid-rows-[auto,auto,auto] grid-cols-1 xs:grid-cols-2 xs:grid-flow-col gap-2">
	<!-- Guaranteed Drops -->
	<h2 class="ml-1 text-primary">Guaranteed Loot</h2>
	<p class="ml-1 text-sm text-base-content/70">
		This loot will always drop. Note that some items are harvested on kill and others go straight to your
		inventory.
	</p>
	<div class="bg-base-200 rounded-lg p-2 px-4 my-2 text-sm sm:text-base">
		{#if difficultyData.dropsNote}
			<p>{difficultyData.dropsNote}</p>
		{/if}
		{#await loadAll([drops])}
			...loading...
		{:then}
			{#if !difficultyData.dropsNote || $drops?.fixed?.length}
				<RestrictedList
					items={$drops?.fixed}
					max={restrictListCount}
					let:item={{ min, max, item, bp }}
				>
					<li title={filterOutRichTextTags(item.description)}>
						{#if min === max}{min}{:else}{min}-{max}{/if} x
						{item.name}
						{#if bp}<span class="text-secondary/70"> (or BP)</span>{/if}
					</li>
				</RestrictedList>
			{/if}
		{/await}
	</div>

	<!-- Possible Drops -->
	<h2 class="ml-1 text-primary">Possible Loot</h2>
	<p class="ml-1 text-sm text-base-content/70">
		This is the full loot table. You will only get a <b>small selection</b> and some may be blueprints.
	</p>
	<div class="bg-base-200 rounded-lg p-2 px-4 my-2 text-sm sm:text-base">
		{#await loadAll([drops])}
			...loading...
		{:then}
			<RestrictedList items={$drops?.random} max={restrictListCount} let:item={{ item, bp }}>
				<li title={filterOutRichTextTags(item.description)}>
					{item.name}
					{#if bp}<span class="text-secondary/70"> (or BP)</span>{/if}
				</li>
			</RestrictedList>
		{/await}
	</div>
</div>

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
