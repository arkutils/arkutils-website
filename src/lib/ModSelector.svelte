<script lang="ts">
	import { onMount } from 'svelte';

	import { ensureManifestLoaded, getModList } from '$lib/obelisk';
	import type { ModInfo } from '$lib/obelisk';

	export let selectedModId: string | null = '';

	let modList: ModInfo[] = [];
	let loadedManifest = false;

	onMount(async () => {
		await ensureManifestLoaded();
		modList = getModList();
		selectedModId = modList[0].id;
		loadedManifest = true;
	});
</script>

<select bind:value={selectedModId} class="select bg-base-200" disabled={!loadedManifest}>
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
