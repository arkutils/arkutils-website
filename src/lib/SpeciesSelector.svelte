<script lang="ts">
	import { loadMod } from '$lib/obelisk';
	import type { Species } from '$lib/obelisk';

    import ModSelector from './ModSelector.svelte';

	export let selectedSpecies: string = '';
	export let filterUseless: boolean = true;

	let selectedModId: string = null;
	let fullSpeciesList: Species[] = [];
	let showSpeciesList: Species[] = [];

	$: if (selectedModId !== null) selectMod(selectedModId);
	$: showSpeciesList = filterUseless ? filterSpecies(fullSpeciesList) : fullSpeciesList;

	async function selectMod(modId) {
        const modData = await loadMod(modId);
		fullSpeciesList = modData.species;

        // Check we have a valid species for this mod
        if (!modData.speciesLookup[selectedSpecies]) {
            selectedSpecies = null;
        }

        // If no species selected, pick the first in the list
		if (!selectedSpecies) {
			selectedSpecies = fullSpeciesList[0].blueprintPath;
		}
	}

	function filterSpecies(species: Species[]): Species[] {
        if (!species.length) return [];

		species = species.filter((entry) => {
			const variants = entry.variants;
			if (!variants) return true;
			if (variants.includes('Mission')) return false;
			if (variants.includes('Minion')) return false;
			if (variants.includes('Corrupted')) return false;
			if (variants.includes('Boss')) return false;
			return true;
		});

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

<label>
	<input type="checkbox" bind:checked={filterUseless} class="bg-gray-800 p-2" />
	Hide useless species
</label>
