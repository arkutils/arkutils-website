<script lang="ts">
	import { writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	import { debouncedDerived } from '$lib/utils/debouncestore';

	import {
		AbortTriggered,
		performSearch,
		shouldPerformSearch,
		type AbortToken,
		type SearchResult,
	} from './search';

	import Lupe from '$lib/imgs/Lupe.svelte';

	let searchOpen = false;
	let searchFinished = false;
	let results: SearchResult[] = [];
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

	// Run the search each time it changes
	$: updateSearch($searchQuery);

	// Ensure search window opens when a valid query is entered
	// $: if (!searchOpen && $searchQuery) searchOpen = true;
	// $: if (!searchOpen && searchFinished) searchOpen = true;

	// Ensure the search window closes if the search is empty
	$: if ($rawSearchQuery === '') searchOpen = false;

	// Trigger a new search
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

<svelte:window on:click={() => (searchOpen = false)} />

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
			class="absolute top-9 left-0 min-h-8 w-full bg-base-300 rounded z-50 max-h-[50vh] overflow-y-auto shadow text-sm"
		>
			{#if !searchFinished}
				<div class="absolute right-4 z-60">...</div>
			{/if}
			{#if results}
				<ul class="results">
					{#each results as result}
						<slot name="result" {result}>
							<code><pre>{JSON.stringify(result)}</pre></code>
						</slot>
					{/each}
				</ul>
			{:else if searchFinished}
				<slot name="noResults">No results found!</slot>
			{/if}
		</section>
	{/if}
</div>

<style lang="postcss">
	section {
		/* Nice, standards-based scrollbars for Firefox */
		scrollbar-width: thin;
		scrollbar-color: hsla(var(--bc) / 50) hsla(var(--b-300));
	}

	/* Ugly non-standards compliant scrollbars for Chrome/Edge/Safari */
	section::-webkit-scrollbar {
		width: 15px;
		height: 16px;
	}
	section::-webkit-scrollbar-track {
		@apply bg-base-300 rounded-full;
	}
	section::-webkit-scrollbar-thumb {
		@apply bg-base-content/50 rounded-lg border-[3px] border-base-300 border-solid;
		height: 4px !important;
	}
</style>
