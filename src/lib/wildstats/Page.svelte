<script context="module" lang="ts">
	export const LEVEL_MIN = 30;
	export const LEVEL_MAX = 1000;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';

	import { clamp } from '$lib/utils/math';

	import Metadata from '$lib/Metadata.svelte';
	import SupportedWidget from '$lib/SupportedWidget.svelte';
	import { debounceFn } from '$lib/utils/debouncestore';
	import StatDiagram from '$lib/wildstats/StatDiagram.svelte';
	import ValueButton from '$lib/wildstats/ValueButton.svelte';

	export let stats = 7;
	export let level = 224;

	let urlTimeout: any;

	// Adjust the address bar to match the current level and stats
	$: if (typeof history !== 'undefined') {
		clearTimeout(urlTimeout);
		urlTimeout = setTimeout(() => {
			goto(`/tools/wildstats/${n}/${stats}`, { replaceState: true, noScroll: true, keepFocus: true });
		}, 1000);
	}
	onDestroy(() => {
		clearTimeout(urlTimeout);
	});

	// Setup the parameters for the diagram
	$: p = 1 / stats;
	let n = clamp(LEVEL_MIN, level, LEVEL_MAX);
	$: level, updateLevel();

	const updateLevel = debounceFn(() => {
		n = clamp(LEVEL_MIN, level, LEVEL_MAX);
	}, 1);

	onDestroy(() => {
		updateLevel.cancel();
	});
</script>

<Metadata
	title="Is my stat good?"
	description="This tool will tell you if the stats on your tame in ARK: Survival Evolved are bad, average or extremely good. You will also see how likely it is to get a better stat."
	preview="/tools/wildstats"
/>

<!-- Site navigation breadcrumbs -->
<div class="flex">
	<nav class="text-sm breadcrumbs mb-2 flex-grow">
		<ul class="text-sm ml-4">
			<li><a href="/">Home</a></li>
			<li>Stat Evaluator</li>
		</ul>
	</nav>
	<SupportedWidget aseSupport="full" asaSupport="full" />
</div>

<h1 class="title">How good are my stats?</h1>
<p class="mt-2">
	Wonder if your 30 points in health are actually good or just average? How rare is it to find better
	stats? Is it worth your time to look for better stats? This is what this tool is for.
</p>
<p class="mt-2">
	This tool supports both ARK: Survival Evolved and ARK: Survival Ascended. Be careful to select the
	correct number of stats for your creature and game.
</p>

<div class="flex flex-col-reverse sm:flex-row gap-4 sm:gap-8 mt-6">
	<!-- Level -->
	<div class="flex flex-col gap-4 flex-1 level-buttons">
		<div>
			<h2 class="mb-2">Creature level</h2>
			<p class="text-sm">
				Either choose one of our level presets or enter the level of your dino yourself. Wild or
				post-tame both work.
			</p>
		</div>
		<div class="flex flex-col gap-1">
			<ValueButton bind:value={level} set={150}>
				<p class="text-sm">Max wild level</p>
				<p class="text-base-content/50 text-sm">Normal difficulty 5 server</p>
			</ValueButton>
			<ValueButton bind:value={level} set={217}>
				<p class="text-sm">Perfect tamed 145</p>
				<p class="text-base-content/50 text-sm">145 with full bonus levels after taming</p>
			</ValueButton>
			<ValueButton bind:value={level} set={224}>
				<p class="text-sm">Perfect tamed 150</p>
				<p class="text-base-content/50 text-sm">150 with full bonus levels after taming</p>
			</ValueButton>
			<label class="flex items-center gap-4">
				<input
					type="number"
					min={LEVEL_MIN}
					max={LEVEL_MAX}
					step={1}
					placeholder="Type here"
					class="input input-sm input-bordered w-20"
					class:input-secondary={level !== 150 && level !== 217 && level !== 224}
					bind:value={level}
				/>
				<!-- svelte-ignore a11y-no-static-element-interactions : we're actually disabling all interaction -->
				<span
					on:click|preventDefault
					on:focus|preventDefault
					on:keydown|preventDefault
					on:keypress|preventDefault
				>
					<p class="text-sm">Custom level</p>
					<p class="text-base-content/50 text-sm">Or drag the slider below</p>
				</span>
			</label>
		</div>
	</div>

	<!-- Stats -->
	<div class="flex flex-col gap-4 flex-1 stats-buttons">
		<div>
			<h2 class="mb-2">Stat count</h2>
			<p class="text-sm">
				Enter the number of stats the species has. This is needed as it the more stats, the more
				spread out the available points are.
			</p>
		</div>
		<div class="flex flex-col gap-1">
			<ValueButton bind:value={stats} set={5}>
				<p class="text-sm">ASA water species</p>
				<p class="text-base-content/50 text-sm">Without movement speed and oxygen</p>
			</ValueButton>
			<ValueButton bind:value={stats} set={6}>
				<p class="text-sm">ASA normal, and ASE flyers</p>
				<p class="text-base-content/50 text-sm">Without movement speed</p>
			</ValueButton>
			<ValueButton bind:value={stats} set={7}>
				<p class="text-sm">ASE non-flyers</p>
				<p class="text-base-content/50 text-sm">Includes movement speed</p>
			</ValueButton>
			<ValueButton bind:value={stats} set={8}>
				<p class="text-sm">ASE Gachas</p>
				<p class="text-base-content/50 text-sm">Includes crafting skill</p>
			</ValueButton>
		</div>
	</div>
</div>

<!-- Level slider -->
<input
	class="range range-xs range-secondary mt-2"
	type="range"
	min={LEVEL_MIN}
	max={LEVEL_MAX}
	step={1}
	bind:value={level}
/>

<!-- Diagram -->
<h2 class="mt-4 mb-2">Stat distribution</h2>
<StatDiagram {p} {n} />

<style lang="postcss">
	.title {
		font-size: calc(clamp(1.5rem, 6vw, 2.5rem));
		line-height: 1;
	}

	/* Colour active buttons in the groups */
	.level-buttons :global(button) {
		@apply outline-secondary;
	}
	.level-buttons :global(.btn-active) {
		@apply border-secondary bg-secondary text-secondary-content;
	}
	.stats-buttons :global(button) {
		@apply outline-primary;
	}
	.stats-buttons :global(.btn-active) {
		@apply border-primary bg-primary text-primary-content;
	}
</style>
