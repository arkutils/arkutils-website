<script lang="ts">
	import { range } from './utils';

	import ColorRegionSelector from './ColorRegionSelector.svelte';

	export let wildColors = true;
	export let colors: number[];
</script>

<label class="select-none">
	<input type="checkbox" bind:checked={wildColors} /> Wild colors
</label>
<fieldset class="grid grid-cols-[auto,auto] gap-1 transition-opacity">
	{#each range(6) as i}
		<ColorRegionSelector region={i} bind:color={colors[i]} disabled={wildColors} />
	{/each}
</fieldset>
