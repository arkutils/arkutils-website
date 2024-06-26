<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import { getModListStore } from '$lib/obelisk/asb';
	import LoadingSpinner from './imgs/LoadingSpinner.svelte';
	import WarningTriangle from './imgs/WarningTriangle.svelte';
	import { OBELISK } from './obelisk/types';

	export let selectedModId: string | null = null;
	export let loading = true;
	export let errored = false;
	export let showASA = true;

	let modList = getModListStore();
	let ready = false;

	$: loading = !ready && !errored;

	onMount(async () => {
		if (!browser) return;
		try {
			await modList.load();
			ready = true;

			// Ensure selectedModId is always valid
			if (selectedModId !== null && !$modList.find((mod) => mod.id === selectedModId)) {
				selectedModId = null;
			} else if (selectedModId === null) {
				selectedModId = $modList[0].id;
			}
		} catch (e) {
			errored = true;
			console.error('Failed to load mod list:');
			console.error(e);
		}
	});
</script>

<svelte:head>
	<!-- Preload manifest and default values file -->
	<link rel="preload" href={`${OBELISK}/asb/_manifest.json`} as="fetch" crossorigin="anonymous" />
	<link rel="preload" href={`${OBELISK}/asb/values.json`} as="fetch" crossorigin="anonymous" />
	<link rel="preload" href={`${OBELISK}/asb/ASA-values.json`} as="fetch" crossorigin="anonymous" />
</svelte:head>

<div class="relative">
	<select bind:value={selectedModId} class="select bg-base-200 w-full" class:pl-12={loading || errored}>
		{#if errored}
			<option selected disabled value={null}>Failed to load available mods list!</option>
		{:else if loading}
			<option selected disabled value={null}>...loading...</option>
		{:else if ready}
			{#each $modList as mod}
				{#if mod.id !== 'ASA' || showASA}
					<option value={mod.id} selected={mod.id === selectedModId}>
						{mod.title}
						{#if !isNaN(parseInt(mod.id))}[{mod.id}]{/if}
					</option>
				{/if}
			{/each}
		{/if}
	</select>
	{#if errored}
		<div class="absolute left-3 top-2.5 text-[1.8em] text-warning">
			<WarningTriangle />
		</div>
	{:else if loading}
		<div class="absolute left-0 top-0">
			<LoadingSpinner width={26} />
		</div>
	{/if}
</div>
