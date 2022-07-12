<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import CloseIcon from '$lib/imgs/CloseIcon.svelte';
	import type { ColorInfo } from './ColorChart.svelte';
	import { type Color3, selectTextColor, asHex, asRgbTo1, asRgbTo256 } from './colors';
	import { localstore } from '$lib/localstore';

	export let color: ColorInfo;

	let displayFormat = localstore<'hex' | 'rgb1' | 'rgb256'>('displayFormat', { default: 'hex' });
	let dispatch = createEventDispatcher();

	function format(fmt, color: Color3): string {
		if (fmt === 'rgb1') {
			return asRgbTo1(color);
		} else if (fmt === 'rgb256') {
			return asRgbTo256(color);
		} else if (fmt === 'hex') {
			return asHex(color);
		} else {
			return '???';
		}
	}
</script>

{#if color}
	<div
		class="z-50 bg-base-300 rounded-lg shadow-lg min-w-80 min-h-100 p-6 flex flex-col items-center gap-6"
	>
		<!-- Title area -->
		<div class="flex text-lg font-bold gap-2 items-center self-stretch">
			<!-- <span>{color.id}:</span> -->
			<span class="flex-grow">{color.name}</span>
			<span class="p-1 cursor-pointer" on:click={() => dispatch('close')}>
				<CloseIcon width={20} />
			</span>
		</div>

		<!-- ID -->
		<div class="-mb-4">ID: {color.id}</div>

		<!-- Display on light/dark -->
		<div class="min-w-[80%] colorbg flex flex-col items-stretch gap-4 p-6 text-center">
			<span
				class="py-3 flex flex-col"
				style="background-color:{color.gamma22Hex};color:{selectTextColor(color.gamma22)}"
			>
				<span class="min-h-16" />
			</span>
		</div>

		<!-- Details -->
		<div class="grid grid-cols-[auto,1fr] grid-rows-3 gap-2 gap-x-8 items-center">
			<span class="leading-4">
				<div class="font-bold">Normal</div>
				<small class="text-xs leading-3">(gamma 2.2)</small>
			</span>
			<span>{format($displayFormat, color.gamma22)}</span>
			<span>Linear</span>
			<span>{format($displayFormat, color.linear)}</span>
			<span>Filmic</span>
			<span>{format($displayFormat, color.gammaFilm)}</span>
		</div>

		<!-- Spacer -->
		<div class="flex-1" />

		<!-- Format choice -->
		<label class="self-end flex items-baseline gap-3">
			<span>Display format:</span>
			<select class="select bg-base-200" bind:value={$displayFormat}>
				<option value="hex">Hex #rrggbb</option>
				<option value="rgb1">RGB (0.0-1.0)</option>
				<option value="rgb256">RGB (0-256)</option>
			</select>
		</label>
	</div>
{/if}

<style lang="postcss">
	.colorbg {
		background-image: linear-gradient(to right, white 0%, white 20%, black 80%, black 100%);
	}
</style>
