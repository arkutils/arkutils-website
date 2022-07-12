<script lang="ts">
	import { onMount } from 'svelte';

	import { localstore } from '$lib/localstore';
	import { isSpeciesUseful, loadMod, type Species } from '$lib/obelisk';

	import ModSelector from './ModSelector.svelte';

	export let selectedModId: string | null = null;
	export let selectedSpecies: string | null = '';

	let filterUseless = localstore('arkutils-filter-species', {
		default: true,
		dontWatchTabs: true
	});
	let fullSpeciesList: Species[] = [];
	let showSpeciesList: Species[] = [];
	let loaded = false;

	onMount(() => {
		loaded = true;
	});

	$: if (loaded && selectedModId !== null) selectMod(selectedModId);
	$: showSpeciesList = $filterUseless ? filterSpecies(fullSpeciesList) : fullSpeciesList;

	async function selectMod(modId: string) {
		const modData = await loadMod(modId);
		fullSpeciesList = modData.species;

		// Check we have a valid species for this mod
		if (selectedSpecies !== null && !modData.speciesLookup[selectedSpecies]) {
			selectedSpecies = null;
		}

		// If no species selected, pick the first in the list
		if (!selectedSpecies) {
			selectedSpecies = fullSpeciesList[0].blueprintPath;
		}
	}

	function filterSpecies(species: Species[]): Species[] {
		if (!species.length) return [];

		species = species.filter(isSpeciesUseful);

		// If we got rid of the selected species, reset it
		if (!species.find((entry) => entry.blueprintPath === selectedSpecies)) {
			selectedSpecies = '';
		}

		return species;
	}

	function fmtVariants(species: Species) {
		return species.variants ? ` (${species.variants.join(', ')})` : '';
	}
</script>

<ModSelector bind:selectedModId />

<select bind:value={selectedSpecies} class="bg-gray-800 p-2">
	{#each showSpeciesList as species}
		<option value={species.blueprintPath}>{species.name}{fmtVariants(species)}</option>
	{/each}
	{#if showSpeciesList.length === 0}
		<option selected>...loading...</option>
	{/if}
</select>

<label title="Hide bosses, mission spawns, etc">
	<input type="checkbox" bind:checked={$filterUseless} class="bg-gray-800 p-2" />
	Hide useless species
</label>
