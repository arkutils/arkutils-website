<script lang="ts" context="module">
	export type SupportLevel = 'full' | 'partial' | 'none';

	export const defaultTexts = {
		ase: {
			full: 'Fully compatible with ARK: Survival Evolved',
			partial: 'Partially compatible with ARK: Survival Evolved',
			none: 'Not compatible with ARK: Survival Evolved',
		},
		asa: {
			full: 'Fully compatible with ARK: Survival Ascended',
			partial: 'Partially compatible with ARK: Survival Ascended',
			none: 'Not compatible with ARK: Survival Ascended',
		},
	};
</script>

<script lang="ts">
	import CircleCheck from './imgs/CircleCheck.svelte';
	import CircleCross from './imgs/CircleCross.svelte';
	import CircleHelp from './imgs/CircleHelp.svelte';

	export let aseSupport: SupportLevel;
	export let asaSupport: SupportLevel;

	export let aseText: string | undefined = undefined;
	export let asaText: string | undefined = undefined;

	$: aseText = aseText || defaultTexts.ase[aseSupport];
	$: asaText = asaText || defaultTexts.asa[asaSupport];
</script>

<div
	class="text-primary-content cursor-default -mt-8 pt-4 mb-2 rounded-b-xl grid grid-cols-2 outer"
	title="Fully compatible with ARK: Survival Ascended"
>
	<button
		class="flex flex-col items-center rounded-bl-xl px-3 cursor-help"
		popovertarget="asePopover"
		title={aseText}
		class:full={aseSupport == 'full'}
		class:partial={aseSupport == 'partial'}
		class:none={aseSupport == 'none'}
	>
		<span class="font-bold">ASE</span>
		<span class="text-[22px]">
			{#if aseSupport == 'full'}
				<CircleCheck />
			{:else if aseSupport == 'partial'}
				<CircleHelp />
			{:else}
				<CircleCross />
			{/if}
		</span>
		<div
			class="px-3 rounded-xl"
			id="asePopover"
			popover="auto"
			class:full={aseSupport == 'full'}
			class:partial={aseSupport == 'partial'}
			class:none={aseSupport == 'none'}
		>
			{aseText}
		</div>
	</button>
	<button
		class="flex flex-col items-center rounded-br-xl px-3 cursor-help"
		popovertarget="asaPopover"
		title={asaText}
		class:full={asaSupport == 'full'}
		class:partial={asaSupport == 'partial'}
		class:none={asaSupport == 'none'}
	>
		<span class="font-bold">ASA</span>
		<span class="text-[22px]">
			{#if asaSupport == 'full'}
				<CircleCheck />
			{:else if asaSupport == 'partial'}
				<CircleHelp />
			{:else}
				<CircleCross />
			{/if}
		</span>
		<div
			class="px-3 rounded-xl"
			id="asaPopover"
			popover="auto"
			class:full={asaSupport == 'full'}
			class:partial={asaSupport == 'partial'}
			class:none={asaSupport == 'none'}
		>
			{asaText}
		</div>
	</button>
</div>

<style lang="postcss">
	.full {
		@apply bg-primary text-primary-content;
	}

	.partial {
		@apply bg-warning text-warning-content;
	}

	.none {
		@apply bg-error text-error-content;
	}

	.outer {
		anchor-name: --support;
	}

	:popover-open {
		position: absolute;
		inset: unset;
		top: 52px;
		top: anchor(--support bottom);
		right: 0;
		right: anchor(--support right);
	}
</style>
