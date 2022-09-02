<script lang="ts">
	import { localstore } from '$lib/localstore';
	import { getModDataStore, isSpeciesUseful, type IndexedModData, type Species } from '$lib/obelisk/asb';

	import { loadAll } from '@square/svelte-store';
	import ModSelector from './ModSelector.svelte';

	export let selectedModId: string | null = null;
	export let selectedSpecies: string | null = '';

	let filterUseless = localstore('arkutils-filter-species', {
		default: true,
		dontWatchTabs: true,
	});

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
</script>

<ModSelector bind:selectedModId />

<select bind:value={selectedSpecies} class="select bg-base-200">
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
		{/await}
	{/if}
</select>

<label title="Hide bosses, mission spawns, etc" class="flex items-center gap-2">
	<input type="checkbox" bind:checked={$filterUseless} class="bg-base-200 checkbox" />
	Hide useless species
</label>
