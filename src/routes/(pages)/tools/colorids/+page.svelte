<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	import { srgbFilm, srgbPow22, asHex } from '$lib/colors';

	import { getModDataStore, type ColorDef } from '$lib/obelisk/asb';
	import { localstore } from '$lib/localstore';

	import type { ColorInfo } from '$lib/ColorChart.svelte';
	import ColorChart from '$lib/ColorChart.svelte';
	import ModSelector from '$lib/ModSelector.svelte';
	import ColorDetail from '$lib/ColorDetail.svelte';
	import Metadata from '$lib/Metadata.svelte';
	import { loadAll } from '@square/svelte-store';

	const BASE_COLORID = 1;
	const BASE_DYEID = 201;

	let displayedColor: ColorInfo | null = null;
	// let selectedModId: string | null = null;
	let loadedModId: string | null = null;
	let hideCore: boolean = true;
	let filter: string = '';
	let debounceTimer: any; /* any because types vary across platforms */

	let modColors: ColorInfo[];
	let modDyes: ColorInfo[];
	let filteredColors: ColorInfo[] = [];
	let filteredDyes: ColorInfo[] = [];
	let loaded: boolean = false;

	let coreColors: Record<string, true> = {};
	let filterParts: Array<string | number> | null = null;

	const modStore = localstore('arkutils-last-mod', { default: '', dontWatchTabs: true });
	$: selectedModId = $modStore;

	$: if (loaded && selectedModId !== null) selectMod(selectedModId);
	$: filterChanged(filter);
	$: if (loaded) applyFilter(hideCore, loadedModId, filterParts);

	onMount(async () => {
		// Load core
		const [modData] = await loadAll([getModDataStore('')]);
		modColors = parseColors(modData.colorDefinitions || [], 1);
		modDyes = parseColors(modData.dyeDefinitions || [], 201);
		selectedModId = '';

		// Also record core color names for duplicate removal
		modColors.forEach((color) => (coreColors[color.name] = true));
		modDyes.forEach((color) => (coreColors[color.name] = true));
		loaded = true;
	});

	async function selectMod(modId: string) {
		console.log(`selectMod(${JSON.stringify(modId)})`);
		if (modId === loadedModId) return;
		const [modData] = await loadAll([getModDataStore(modId)]);
		console.log(modData);
		modColors = parseColors(modData.colorDefinitions || [], BASE_COLORID);
		modDyes = parseColors(modData.dyeDefinitions || [], BASE_DYEID);
		loadedModId = modId;
	}

	function filterChanged(filter: string) {
		// Debounce and call prepareFilter
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			filterParts = prepareFilter(filter);
		}, 150);
	}

	function prepareFilter(filter: string): Array<string | number> | null {
		if (filter === '') return null;
		const parts = filter.split(' ').map((part) => part.toLowerCase());

		return parts.map((part) => {
			const num = parseInt(part, 10);
			if (isNaN(num)) return part;
			return num;
		});
	}

	function applyFilter(
		_hideCore: boolean,
		_selectedModId: string | null,
		_filterParts: (string | number)[] | null
	) {
		// ...arguments are ignored, used to trigger Svelte to re-run this function
		console.log(`applyFilter(${hideCore}, ${JSON.stringify(selectedModId)})`);
		filteredColors = modColors.filter(filterColor);
		filteredDyes = modDyes.filter(filterColor);
		console.log('filteredColors', filteredColors);
	}

	function parseColors(colors: ColorDef[], startId: number): ColorInfo[] {
		return colors.map((def, i) => parseColor(def, startId + i));
	}

	function parseColor(def: ColorDef, id: number): ColorInfo {
		const cmp = def[1];
		const linear = { r: cmp[0], g: cmp[1], b: cmp[2], a: cmp[3] };
		const gamma22 = srgbPow22(linear);
		const gammaFilm = srgbFilm(linear);

		return {
			id: id,
			name: def[0],
			linear: linear,
			gamma22: gamma22,
			gammaFilm: gammaFilm,
			gamma22Hex: asHex(gamma22),
			gammaFilmHex: asHex(gammaFilm)
		};
	}

	function filterColor(color: ColorInfo): boolean {
		// Do we filter out core duplicates?
		const actuallyHideCore = hideCore && selectedModId !== '';
		if (actuallyHideCore && coreColors[color.name]) return false;

		// We're done if there's no filter string set
		if (!filterParts || filterParts.length === 0) return true;

		// Otherwise, ensure all parts are present
		const name = color.name.toLowerCase();
		for (const part of filterParts) {
			if (typeof part === 'string') {
				// Strings much be present
				if (!name.includes(part)) return false;
			} else {
				// Numbers must match the ID
				if (color.id !== part) return false;
			}
		}

		return true;
	}
</script>

<Metadata
	title="Dino Color IDs"
	description="This infopage shows you all the color IDs that are available on dinosaurs in ARK: Survival Evolved. Some are only available through mutating or special events. The Dino Color ID infopage also supports many modded colors."
/>

<h1 class="mb-4">ARK Color IDs</h1>

<!-- Info text -->
<p class="mb-2">
	This page lists all color IDs in ARK: Survival Evolved, plus a list of supported mods.
</p>
<p class="mb-4">
	The normal colours can be picked for wild creatures, while mutations and special events can pick
	from both normal and dye colours.
</p>

<!-- Input section -->
<section class="flex flex-col gap-2 sm:flex-row justify-evenly">
	<div class="flex flex-col gap-2 flex-1">
		<h3>Choose Mod</h3>
		<ModSelector bind:selectedModId />
		<label
			class:text-gray-500={!selectedModId}
			class="select-none flex flex-row items-center gap-2"
		>
			<input
				type="checkbox"
				class="checkbox"
				bind:checked={hideCore}
				disabled={!selectedModId}
			/>
			Hide duplicates from core
		</label>
	</div>

	<label class="flex flex-col gap-2 flex-1">
		<h3>Filter (by ID or name)</h3>
		<input
			type="text"
			class="bg-base-200 input p-2 px-3"
			bind:value={filter}
			placeholder="example: black or 79"
		/>
	</label>
</section>

<!-- Colour lists -->
<h3 class="mt-4 mb-1">Normal Colors (found {filteredColors.length})</h3>
<ColorChart colors={filteredColors} on:selected={(e) => (displayedColor = e.detail)} />
<h3 class="mt-4 mb-1">Dye Colors (found {filteredDyes.length})</h3>
<ColorChart colors={filteredDyes} on:selected={(e) => (displayedColor = e.detail)} />

<!-- Colour info dialog-->
{#if displayedColor}
	<!-- Background fadeout -->
	<div transition:fade class="fixed w-full h-full bg-black/50 left-0 top-0" />

	<!-- Container -->
	<section
		transition:fly={{ x: -5, y: -10 }}
		class="fixed left-0 top-0 w-full h-full grid content-center justify-center"
		on:click={() => {
			displayedColor = null;
			console.log('click on dialog');
		}}
	>
		<!-- Actual dialog -->
		<div on:click|stopPropagation={() => {}}>
			<ColorDetail
				color={displayedColor}
				on:close={() => {
					displayedColor = null;
					console.log('close event');
				}}
			/>
		</div>
	</section>
{/if}
