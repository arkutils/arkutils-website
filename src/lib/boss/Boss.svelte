<script lang="ts">
	import { asyncDerived, loadAll } from '@square/svelte-store';

	import { getModDataStore } from '$lib/obelisk/asb';
	import { modIdFromPath } from '$lib/obelisk/core';
	import { gatherLootBags, gatherLootCrate, getWikiDropsStore } from '$lib/obelisk/wiki/drops';
	import { getItemByClass, getWikiItemsStore } from '$lib/obelisk/wiki/items';
	import { getWikiSpeciesStore } from '$lib/obelisk/wiki/species';

	import { boss_data, difficulties } from './data';
	import type { Difficulty } from './types';
	import { dataForBoss, difficultyForBoss, filterOutRichTextTags, getIconForDifficulty } from './utils';

	import ArkWikiLink from '$lib/ArkWikiLink.svelte';
	import RestrictedList from '$lib/RestrictedList.svelte';
	import DifficultySelector from './DifficultySelector.svelte';

	export let map: string;
	export let boss: string;
	export let difficulty: Difficulty | null;

	const restrictListCount = 8;

	// Looked-up boss data
	$: mapData = boss_data[map];
	$: data = dataForBoss(map, boss);
	$: difficultyData = difficultyForBoss(data, difficulty);

	// List of different stores we need, for those that split data out into separate mods
	$: requiredSpeciesStores = ['', ...(mapData.extraSpeciesModIds ?? [])].map((modId) =>
		getModDataStore(modId)
	);
	$: requiredModSpeciesStores = ['', ...(mapData.extraSpeciesModIds ?? [])].map((modId) =>
		getWikiSpeciesStore(modId)
	);
	$: requiredModItemStores = ['', ...(mapData.extraItemsModIds ?? [])].map((modId) =>
		getWikiItemsStore(modId)
	);
	$: requiredModDropsStores = ['', ...(mapData.extraDropsModIds ?? [])].map((modId) =>
		getWikiDropsStore(modId)
	);

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

	/** Loot drops come from the wiki species data, drop inventores and item data combined */
	$: drops = asyncDerived(
		[...requiredModItemStores, ...requiredModDropsStores, ...requiredModSpeciesStores],
		async () => {
			// Find the species in the correct species store
			const modId = modIdFromPath(difficultyData.bp);
			const [$speciesStore] = await loadAll([getWikiSpeciesStore(modId)]);
			const wikiSpecies = $speciesStore.speciesLookup[difficultyData.bp + '_C'];

			// Gather loot either from the death lootbag or a custom loot create
			if (difficultyData.overrideLootCrate) console.log('crate', difficultyData.overrideLootCrate);
			const loot = difficultyData.overrideLootCrate
				? await gatherLootCrate(difficultyData.overrideLootCrate)
				: await gatherLootBags(wikiSpecies?.death?.lootBags ?? []);

			// Add any manually-added engrams
			if (difficultyData.manualDrops) {
				difficultyData.manualDrops.forEach(({ item, min, max, chance, bp }) => {
					loot.fixed.push({ item: getItemByClass(item), min, max, chance, bp });
				});
			}

			return loot;
		}
	);

	/** Summoning items are gathered from the summon item's recipe */
	$: summon = asyncDerived([...requiredModItemStores], async () => {
		// if (!$modItems || !difficultyData.summon) return undefined;
		if (!difficultyData.summon) return undefined;

		// Crafting recipe contains the level/items needed
		const modId = modIdFromPath(difficultyData.summon);
		const [$itemStore] = await loadAll([getWikiItemsStore(modId)]);
		const summonItem = $itemStore.bpLookup[difficultyData.summon];
		const levelReq = summonItem?.crafting?.levelReq;
		const items = summonItem?.crafting?.recipe?.map(({ qty, type }) => ({
			qty,
			item: getItemByClass(type),
		}));
		return { levelReq, items };
	});

	$: icon = getIconForDifficulty(difficulty, data);
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

			<p class="text-sm flex items-baseline gap-2">
				<span class="opacity-70">Official wiki:</span>
				<ArkWikiLink name={data.display}>
					<p>{data.display}</p>
				</ArkWikiLink>
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
					<ArkWikiLink name={req.item?.name} />
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
				<ArkWikiLink name={item.name} />
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
	<div class="bg-base-200 rounded-lg p-2 px-4 my-2 text-base xs:text-sm sm:text-base">
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
						<ArkWikiLink name={item.name} />
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
	<div class="bg-base-200 rounded-lg p-2 px-4 my-2 text-base xs:text-sm sm:text-base">
		{#await loadAll([drops])}
			...loading...
		{:then}
			<RestrictedList items={$drops?.random} max={restrictListCount} let:item={{ item, bp }}>
				<li title={filterOutRichTextTags(item.description)}>
					{item.name}
					{#if bp}<span class="text-secondary/70"> (or BP)</span>{/if}
					<ArkWikiLink name={item.name} />
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
