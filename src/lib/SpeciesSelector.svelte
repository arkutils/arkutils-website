<script lang="ts">
	import { loadAll } from '@square/svelte-store';

	import { getModDataStore, isSpeciesUseful, type IndexedModData, type Species } from '$lib/obelisk/asb';
	import { filterUseless } from '$lib/stores';
	import ModSelector from './ModSelector.svelte';
	import LoadingSpinner from './imgs/LoadingSpinner.svelte';
	import WarningTriangle from './imgs/WarningTriangle.svelte';

	export let selectedModId: string | null = null;
	export let selectedSpecies: string | null = '';
	export let loading = true;
	export let errored = false;

	let modSelectorLoading = true;
	let modSelectorErrored = false;

	$: loading = modSelectorLoading || !modData || !$modData;
	$: errored = modSelectorErrored;

	// Store containing the current mod data (loadable/async)
	$: modData = selectedModId === null ? null : getModDataStore(selectedModId);

	// Update species selection on mod change
	$: if ($modData && selectedModId !== null) modChanged($modData);

	function modChanged($modData: IndexedModData) {
		// Check we have a valid species for this mod
		if (selectedSpecies !== null && !$modData.speciesLookup[selectedSpecies]) {
			selectedSpecies = null;
		}

		// If no species selected, pick the first in the list
		if (!selectedSpecies) {
			selectedSpecies = $modData.species[0].blueprintPath;
		}
	}

	function fmtVariants(species: Species) {
		return species.variants ? ` (${species.variants.join(', ')})` : '';
	}

	function print_error(e: Error) {
		console.error(e);
		return '';
	}
</script>

<ModSelector bind:selectedModId bind:loading={modSelectorLoading} />

<div class="relative">
	<select bind:value={selectedSpecies} class="select bg-base-200 w-full" class:pl-12={loading || errored}>
		{#if modData}
			{#await loadAll([modData])}
				<option selected disabled value={null}>...loading...</option>
			{:then}
				{#if $modData}
					{#each $modData.species as species}
						{#if !$filterUseless || isSpeciesUseful(species)}
							<option value={species.blueprintPath}>
								{species.name}{fmtVariants(species)}
							</option>
						{/if}
					{/each}
				{/if}
			{:catch e}
				<option selected disabled value={null}>Failed to load species list! {print_error(e)}</option>
			{/await}
		{/if}
	</select>
	{#if errored}
		<div class="absolute left-0 top-0 text-warning">
			<WarningTriangle />
		</div>
	{:else if loading}
		<div class="absolute left-0 top-0">
			<LoadingSpinner width={26} />
		</div>
	{/if}
</div>

<label title="Hide bosses, mission spawns, etc" class="flex items-center gap-2">
	<input type="checkbox" bind:checked={$filterUseless} class="bg-base-200 checkbox" />
	Hide useless species
</label>
