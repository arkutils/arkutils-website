<script lang="ts">
	import { getModListStore } from '$lib/obelisk/asb';
	import { loadAll } from '@square/svelte-store';

	export let selectedModId: string | null = null;

	const modList = getModListStore();
</script>

<select bind:value={selectedModId} class="select bg-base-200">
	{#await loadAll([modList])}
		<option selected disabled value={null}>...loading...</option>
	{:then}
		{#each $modList as mod}
			<option value={mod.id}>
				{mod.title}
				{#if !isNaN(parseInt(mod.id))}[{mod.id}]{/if}
			</option>
		{/each}
	{:catch}
		<option selected disabled value={null}>...something went wrong...</option>
	{/await}
</select>
