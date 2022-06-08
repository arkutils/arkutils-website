<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	import type { ColorInfo } from '$lib/ColorChart.svelte';
	import ColorChart from '$lib/ColorChart.svelte';
	import ModSelector from '$lib/ModSelector.svelte';
	import ColorDetail from '$lib/ColorDetail.svelte';

	import { srgbFilm, srgbPow22, asHex } from '$lib/colors';

	import type { ColorDef } from '$lib/obelisk';
	import { loadMod } from '$lib/obelisk';
	import { localstore } from '$lib/localstore';

	const BASE_COLORID = 1;
	const BASE_DYEID = 201;

	let displayedColor: ColorInfo = null;
	let selectedModId: string = null;
	let loadedModId: string = null;
	let hideCore: boolean = true;
	let filter: string = '';
	let debounceTimer;

	let modColors: ColorInfo[];
	let modDyes: ColorInfo[];
	let filteredColors: ColorInfo[] = [];
	let filteredDyes: ColorInfo[] = [];
	let loaded: boolean = false;

	let coreColors: Record<string, true> = {};
	let filterParts: Array<string | number> = null;

	const modStore = localstore('arkutils-last-mod', { default: '', dontWatchTabs: true });
	$: selectedModId = $modStore;

	$: if (loaded && selectedModId !== null) selectMod(selectedModId);
	$: filterChanged(filter);
	$: if (loaded) applyFilter(hideCore, loadedModId, filterParts);

	onMount(async () => {
		// Load core
		const modData = await loadMod('');
		modColors = parseColors(modData.colorDefinitions || [], 1);
		modDyes = parseColors(modData.dyeDefinitions || [], 201);
		selectedModId = '';

		// Also record core color names for duplicate removal
		modColors.forEach((color) => (coreColors[color.name] = true));
		modDyes.forEach((color) => (coreColors[color.name] = true));
		loaded = true;
	});

	async function selectMod(modId) {
		console.log(`selectMod(${JSON.stringify(modId)})`);
		if (modId === loadedModId) return;
		const modData = await loadMod(modId);
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
		_selectedModId: string,
		_filterParts: (string | number)[]
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

<h2 class="mb-4">Ark Color IDs</h2>

<!-- Input section -->
<section class="flex flex-col gap-2 sm:flex-row justify-evenly">
	<div class="flex flex-col gap-2 flex-1">
		<h3>Choose mod</h3>
		<ModSelector bind:selectedModId />
		<label class:text-gray-500={!selectedModId} class="select-none">
			<input type="checkbox" bind:checked={hideCore} disabled={!selectedModId} />
			Hide duplicates from core
		</label>
	</div>

	<label class="flex flex-col gap-2 flex-1">
		<h3>Filter (by ID or name)</h3>
		<input type="text" class="bg-gray-800 p-2 px-3" bind:value={filter} />
	</label>
</section>

<!-- Colour lists -->
<h3 class="mt-4 mb-1">Normal colors ({filteredColors.length})</h3>
<ColorChart colors={filteredColors} on:selected={(e) => (displayedColor = e.detail)} />
<h3 class="mt-4 mb-1">Dye colors ({filteredDyes.length})</h3>
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
