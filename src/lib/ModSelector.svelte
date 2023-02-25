<script lang="ts">
	import { browser } from '$app/environment';
	import { getModListStore } from '$lib/obelisk/asb';
	import { onMount } from 'svelte';

	export let selectedModId: string | null = null;

	let modList = getModListStore();
	let ready = false;
	let errored = false;

	onMount(async () => {
		if (!browser) return;
		try {
			await modList.load();
			ready = true;
		} catch (e) {
			errored = true;
			console.error(e);
		}
	});
</script>

<select bind:value={selectedModId} class="select bg-base-200">
	{#if errored}
		<option selected disabled value={null}>...something went wrong...</option>
	{:else if !modList}
		<option selected disabled value={null}>...loading...</option>
	{:else if ready}
		{#each $modList as mod}
			<option value={mod.id}>
				{mod.title}
				{#if !isNaN(parseInt(mod.id))}[{mod.id}]{/if}
			</option>
		{/each}
	{/if}
</select>
