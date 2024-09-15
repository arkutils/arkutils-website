<script lang="ts">
	import TraitSelect from './TraitSelect.svelte';

	export let slots = 5;
	export let maxMutables = 3;
	export let maxRobusts = 3;

	export let mutableCount: number = 0;
	export let robustCount: number = 0;

	export let traits = Array(slots).fill('');

	$: mutableCount = traits.filter((trait) => trait.startsWith('Mutable')).length;
	$: robustCount = traits.filter((trait) => trait.startsWith('Robust')).length;
</script>

<div class="flex flex-col md:flex-row gap-1 w-full">
	{#each traits as trait, i}
		<TraitSelect
			bind:value={traits[i]}
			blockMutable={mutableCount >= maxMutables && !trait.startsWith('Mutable')}
			blockRobust={robustCount >= maxRobusts && !trait.startsWith('Robust')}
		/>
	{/each}
</div>
