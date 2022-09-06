<script context="module" lang="ts">
	import { selectTextColor, type Color3, type Color4 } from './colors';

	export type ColorChartEvents = {
		selected: ColorInfo;
	};

	export type ColorInfo = {
		id: number;
		name: string;
		linear: Color4;
		gamma22: Color3;
		gammaFilm: Color3;
		gamma22Hex: string;
		gammaFilmHex: string;
	};
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	export let colors: ColorInfo[] = [];

	let dispatch = createEventDispatcher<ColorChartEvents>();
</script>

{#if colors && colors.length}
	<ul class="mx-[-2px]">
		{#each colors as color ('+' + color.id)}
			<li
				class="inline-block rounded m-1 px-1 sm:px-2 text-sm sm:text-md text-center cursor-pointer select-none"
				style="background:{color.gamma22Hex}; color:{selectTextColor(color.gamma22)}"
				animate:flip={{ duration: 100 }}
				transition:fade={{ duration: 100 }}
				on:click={() => dispatch('selected', color)}
			>
				{color.id}: {color.name}
			</li>
		{/each}
	</ul>
{:else}
	<p>No colors found.</p>
{/if}
