<script lang="ts">
	import { range } from '$lib/utils';
	import { traitDefinitions } from './traits';

	export let block: string[] = [];

	export let value: string = '';

	$: traitTier = value.match(/\[(\d)\]/)?.[1] ?? '0';
</script>

<select
	bind:value
	class="select select-bordered select-sm w-48 shrink min-w-0 t{traitTier} bg-base-200"
	class:border-amber-600={value.startsWith('MutableTarget')}
	class:border-rose-600={value.startsWith('MutableOther')}
	class:border-indigo-500={value.startsWith('Robust')}
>
	<option value="" class="t0" selected={value === ''}>-</option>

	{#each Object.entries(traitDefinitions) as [traitName, trait]}
		{#if !(block.includes(traitName) && !value.startsWith(traitName))}
			{#each range(trait.maxTiers) as i}
				<option
					value="{traitName}[{i + 1}]"
					class="t{i + 1}"
					class:font-bold={value === `${traitName}[${i + 1}]`}
					>{trait.name(i + 1)}
				</option>
			{/each}
		{/if}
	{/each}
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
