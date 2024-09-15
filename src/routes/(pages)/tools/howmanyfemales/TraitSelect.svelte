<script lang="ts">
	export let blockMutable = false;
	export let blockRobust = false;

	export let value: string = '';

	$: traitTier = value.match(/\[(\d)\]/)?.[1] ?? '0';

	$: {
		if (blockMutable && value.startsWith('Mutable')) {
			value = '';
		}
		if (blockRobust && value.startsWith('Robust')) {
			value = '';
		}
	}
</script>

<select
	bind:value
	class="select select-bordered select-sm w-40 md:w-32 t{traitTier} bg-base-200 border-"
	class:border-yellow-600={value.startsWith('Mutable')}
	class:border-rose-600={value.startsWith('Robust')}
>
	<option value="" class="t0" selected={value === ''}>-</option>
	{#if !blockMutable}
		{#each [1, 2, 3] as i}
			<option value="Mutable[{i}]" class="t{i}" class:font-bold={value === `Mutable[${i}]`}
				>Mutable T{i}</option
			>
		{/each}
	{/if}
	{#if !blockRobust}
		{#each [1, 2, 3] as i}
			<option value="Robust[{i}]" class="t{i}" class:font-bold={value === `Robust[${i}]`}
				>Robust T{i}</option
			>
		{/each}
	{/if}
</select>

<style lang="postcss">
	.t0 {
		@apply text-base-content;
	}
	.t1 {
		@apply text-green-400;
	}
	.t2 {
		@apply text-blue-400;
	}
	.t3 {
		@apply text-purple-400;
	}
</style>
