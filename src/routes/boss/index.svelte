<script lang="ts">
	import { writable } from '@square/svelte-store';
	import { slide } from 'svelte/transition';

	import { boss_data, difficulties } from '$lib/boss/data';
	import {
		AbortTriggered,
		performSearch,
		shouldPerformSearch,
		type AbortToken,
		type SearchResult,
	} from '$lib/boss/search';
	import { debouncedDerived } from '$lib/utils/debouncestore';

	import Lupe from '$lib/imgs/Lupe.svelte';
	import Metadata from '$lib/Metadata.svelte';

	let results: SearchResult[] = [];
	let searchOpen = false;
	let searchFinished = false;
	let rawSearchQuery = writable('');
	let searchAbortToken: AbortToken | null = null;

	// The searchQuery store only holds acceptable search queries, and only updates at most every 300ms
	const searchQuery = debouncedDerived(
		[rawSearchQuery],
		([$rawSearchTerm], set) => {
			if (shouldPerformSearch($rawSearchTerm)) {
				set($rawSearchTerm.toLowerCase());
			}
		},
		{ initialValue: '', delay: 300 }
	);

	// Ensure search window opens when a valid query is entered
	// $: if (!searchOpen && $searchQuery) searchOpen = true;
	// $: if (!searchOpen && searchFinished) searchOpen = true;

	// Ensure the search window closes if the search is empty
	$: if ($rawSearchQuery === '') searchOpen = false;

	// Run the search each time it changes
	$: updateSearch($searchQuery);

	function updateSearch(query: string) {
		// Abort any previous search
		if (searchAbortToken) {
			searchAbortToken.triggered = true;
		}

		// Perform new search
		searchOpen = !!query;
		searchFinished = false;
		searchAbortToken = { triggered: false };
		/* unawaited */ beginSearch(query, searchAbortToken);
	}

	async function beginSearch(query: string, abortToken: AbortToken) {
		results = [];

		try {
			for await (const result of performSearch(query, abortToken)) {
				if (abortToken.triggered) {
					break;
				}

				results.push(result);
				results = results;
			}
		} catch (e) {
			if (e instanceof AbortTriggered) return;
			throw e;
		} finally {
			searchFinished = true;
		}
	}
</script>

<Metadata title="Bossopedia" description="" nopreview />

<svelte:window on:click={() => (searchOpen = false)} />

<div class="text-sm breadcrumbs mb-2">
	<ul class="text-sm ml-4">
		<li><a href="/">Home</a></li>
		<li>Bosses</li>
	</ul>
</div>

<header class="flex justify-center items-center">
	<div class="flex flex-col gap-4">
		<h1 class="mb-2 text-6xl title"><span class="text-secondary">Boss</span>opedia</h1>
		<div
			class="bg-base-300 rounded-lg mx-4 sm:mx-0 p-4 pt-0 sm:p-4 sm:px-12 flex flex-col sm:flex-row gap-4 sm:gap-4 md:gap-0 items-center justify-around"
		>
			<img
				src="imgs/obeliskcomic.webp"
				class="px-6 sm:p-0 w-full max-w-xs sm:max-w-full sm:w-44 self-center scale-x-100"
				alt="ARK Obelisk in Comic Style"
				width="512"
				height="662"
			/>
			<div class="flex flex-col gap-2">
				<p class="text-2xl">Ever wondered:</p>
				<ul class="list-disc list-inside">
					<li>which summoning items you need</li>
					<li>which Tek engrams are unlocked</li>
					<li>what loot is dropped</li>
				</ul>
				<p>when facing a boss?</p>
				<p class="text-2xl">Wonder no more!</p>
			</div>
		</div>
		<div class="relative w-full">
			<input
				class="input input-bordered input-sm w-full bg-base-200 input-secondary pl-8"
				name="search"
				type="search"
				placeholder="Search for bosses, engrams, or maps"
				tabindex="0"
				autosave="off"
				autocomplete="off"
				spellcheck="false"
				aria-label="Search for bosses, engrams, or maps"
				aria-haspopup="listbox"
				aria-autocomplete="none"
				aria-expanded={searchOpen}
				bind:value={$rawSearchQuery}
				on:keyup={(e) => {
					if (e.key === 'Escape') searchOpen = false;
				}}
			/>
			<div class="absolute top-2 left-2 text-base-content/70"><Lupe /></div>
			{#if searchOpen}
				<section
					transition:slide
					aria-live="polite"
					aria-atomic="true"
					class="absolute top-9 left-0 w-full bg-base-300 rounded z-50 max-h-[50vh] overflow-y-auto shadow text-sm"
				>
					{#if !searchFinished}
						<div class="absolute right-4 z-60">...</div>
					{/if}
					{#if results}
						<ul class="results">
							{#each results as result}
								{@const map = boss_data[result.map]}
								{@const isLore = map.isLore}
								<li class="hover:bg-base-200 px-4 py-1 rounded breadcrumbs">
									<ul>
										{#if result.type === 'map'}
											<li>
												<a href="/boss/{result.map}">
													<img
														src="/imgs/maps/{map.icon}"
														class="filter-dim"
														class:lore={isLore}
														aria-disabled="true"
														alt="{map.display} Icon"
														width="32"
														height="32"
													/>
													{map.display}
												</a>
											</li>
										{:else if result.type === 'boss'}
											{@const boss = map.bosses[result.boss]}
											<li>
												<img
													src="/imgs/maps/{map.icon}"
													class="filter-dim"
													class:lore={isLore}
													aria-disabled="true"
													alt=""
													width="32"
													height="32"
												/>
												{map.display}
											</li>
											{#if result.difficulty}
												<li>{boss.display}</li>
												<li>
													<a
														href="/boss/{result.map}/{result.boss}-{result.difficulty}"
													>
														{difficulties[result.difficulty].display}
													</a>
												</li>
											{:else}
												<li>
													<a href="/boss/{result.map}/{result.boss}">
														{boss.display}
													</a>
												</li>
											{/if}
										{:else if result.type === 'item'}
											{@const item = result.item}
											{@const boss = map.bosses[result.boss]}
											<li>{item.name}</li>
											<li>
												<img
													src="/imgs/maps/{map.icon}"
													class="filter-dim"
													class:lore={isLore}
													aria-disabled="true"
													alt=""
													width="32"
													height="32"
												/>
												{map.display}
											</li>
											{#if result.difficulty}
												<li>{boss.display}</li>
												<li>
													<a
														href="/boss/{result.map}/{result.boss}-{result.difficulty}"
													>
														{difficulties[result.difficulty].display}
													</a>
												</li>
											{:else}
												<li>
													<a href="/boss/{result.map}/{result.boss}">
														{boss.display}
													</a>
												</li>
											{/if}
										{/if}
									</ul>
								</li>
							{/each}
						</ul>
					{:else}
						<div class="h-40 bg-pink-500">No results found!</div>
					{/if}
				</section>
			{/if}
		</div>
		<p class="mt-0">
			Click on the map name to see which bosses you can face on that map. Make sure to chose the
			correct map first because the same bosses can appear on different maps but won't have the same
			stats or drops.
		</p>
	</div>
</header>

<ul
	class="grid justify-around gap-2 gap-y-3 grid-cols-[repeat(1,auto)] my-4 sm:my-8 sm:gap-y-3 sm:grid-cols-[repeat(2,auto)] md:grid-cols-[repeat(3,auto)]"
>
	{#each Object.entries(boss_data) as [key, map]}
		<li class="bg-base-200 rounded-lg pl-2">
			<a href="/boss/{key}" class="flex gap-3 flex-row items-center p-2 py-3 text-secondary">
				<img
					src="/imgs/maps/{map.icon}"
					alt={map.display}
					width="24"
					height="24"
					class="filter-dim"
					class:lore={map.isLore}
				/>
				{map.display}
			</a>
		</li>
	{/each}
</ul>

<div class="flex w-full gap-2 justify-end">
	<img
		src="/imgs/maps/map.webp"
		alt="Community Map DLC"
		title="Community Map DLC"
		width="19"
		height="19"
		class="filter-dim"
	/>
	<p class="text-base-content/70 text-sm">Non-Lore Maps</p>
</div>

<style lang="postcss">
	h1.title {
		font-size: clamp(32px, 12vw, 100px);
	}
	header img {
		filter: brightness(1.5);
	}
	.grid li {
		width: 14em;
	}
	.filter-dim {
		filter: opacity(0.3);
	}
	.filter-dim.lore {
		filter: brightness(0.8);
	}

	.breadcrumbs > ul > li img {
		@apply mr-2;
	}
	.breadcrumbs > ul > li:before {
		@apply text-secondary;
	}
</style>
