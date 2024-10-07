<script lang="ts">
	import { calculateTraitsToBlock } from './traits';
	import TraitSelect from './TraitSelect.svelte';

	export let slots = 5;

	export let traits = Array(slots).fill('');

	$: toBlock = calculateTraitsToBlock(traits);
</script>

<div class="flex flex-col md:flex-row gap-1 w-full">
	{#each traits as trait}
		<TraitSelect bind:value={trait} block={toBlock} />
	{/each}
</div>
