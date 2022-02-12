<script lang="ts">
	import { onMount } from 'svelte';

	import { ensureManifestLoaded, getModList, loadMod } from '$lib/obelisk';
	import type { Species, ModInfo } from '$lib/obelisk';

	export let selectedSpecies: string = '';
	export let filterUseless: boolean = true;

	let selectedModId: string = '';

	let modList: ModInfo[] = [];
	let fullSpeciesList: Species[] = [];
	let showSpeciesList: Species[] = [];
    let loadedManifest = false;

	$: if (loadedManifest) selectMod(selectedModId);
	$: showSpeciesList = filterUseless ? filterSpecies(fullSpeciesList) : fullSpeciesList;

	onMount(async () => {
		await ensureManifestLoaded();
		modList = getModList();
		selectedModId = modList[0].id;
        loadedManifest = true;
	});

	async function selectMod(modId) {
		fullSpeciesList = (await loadMod(modId)).species;
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

<select bind:value={selectedModId} class="bg-gray-800 p-2" disabled={!loadedManifest}>
	{#each modList as mod}
		<option value={mod.id}>
			{mod.title}
			{#if !isNaN(parseInt(mod.id))}({mod.id}){/if}
		</option>
	{/each}
	{#if !loadedManifest}
		<option selected value="">...loading...</option>
	{/if}
</select>

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
