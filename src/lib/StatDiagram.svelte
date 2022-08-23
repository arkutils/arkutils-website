<script lang="ts">
	import { writable } from 'svelte/store';

	import { range } from './utils';
	import { factorial, fbyf, probabilityToZScore } from './utils/math';

	const diagramHeight = 220;
	const distribution: number[] = Array.from({ length: 255 }, (_) => 0);

	export let p = 1 / 6;
	export let n = 150;

	let maxX = 128;
	let maxY = -Infinity;
	let stddev = NaN;
	let mean = NaN;

	let gridWidth: number; // <- adjusted in realtime to match the view width

	const view = writable<number[]>(distribution);
	// spring(distribution, { stiffness: 0.1, damping: 0.4, precision: 0.00001, });

	$: calculate(p, n);
	$: maxX = Math.round(percentile(0.1, mean, stddev)) + 3;
	$: colWidth = (gridWidth - 118) / (maxX - 3);

	$: mostCommon = Math.round(mean);
	$: top10 = Math.round(percentile(10, mean, stddev));
	$: top1 = Math.round(percentile(1, mean, stddev));
	$: top01 = Math.round(percentile(0.1, mean, stddev));

	function calculate(p: number, n: number) {
		n = Math.max(2, n);
		stddev = Math.sqrt(n * p * (1 - p));
		mean = n * p;

		maxY = -Infinity;
		if (n * p > 10 && n * (1 - p) > 10) {
			// Approximate with the normal distribution for larger numbers
			for (let x = 0; x < 255; x++) {
				const y =
					(1 / (stddev * Math.sqrt(2 * Math.PI))) *
					Math.exp(-Math.pow(x - mean, 2) / (2 * stddev * stddev));
				if (y < Infinity && y > maxY) maxY = y;
				distribution[x] = y;
			}
		} else {
			// Use binomial distribution for smaller numbers
			for (let x = 0; x <= 255; x++) {
				const y = binomial(n, x) * p ** x * (1 - p) ** (n - x);
				if (y < Infinity && y > maxY) maxY = y;
				distribution[x] = y;
			}
		}

		$view = distribution;
	}

	function binomial(n: number, k: number) {
		try {
			return fbyf(n, k) / Number(factorial(n - k));
		} catch (e) {
			return 1;
		}
	}

	function percentile(p: number, mean: number, stddev: number) {
		// 200 = 100% * 2 because we only want the top half of the distribution
		return mean + probabilityToZScore(1 - p / 200) * stddev;
	}

	function classesFor(x: number, mostCommon: number, top10: number, top1: number, top01: number) {
		const classes = [];
		if (x === mostCommon) classes.push('mean');
		if (x === top10) classes.push('top10');
		if (x >= top10) classes.push('inTop10');
		if (x === top1) classes.push('top1');
		if (x >= top1) classes.push('inTop1');
		if (x === top01) classes.push('top01');
		if (x >= top01) classes.push('inTop01');
		return classes.join(' ');
	}
</script>

<div class="px-2 py-1 pb-2 bg-base-200 overflow-hidden">
	<div
		class="grid grid-flow-col items-end w-full"
		style:grid-template-columns="repeat({maxX}, {colWidth}px)"
		style:grid-template-rows="repeat(5, auto) {diagramHeight}px auto"
		bind:clientWidth={gridWidth}
	>
		{#each range(maxX) as x}
			{@const classes = classesFor(x, mostCommon, top10, top1, top01)}

			<div class="h-4" />

			<div class="text-sm font-bold relative {classes} row1">
				{#if x === mostCommon}
					<span class="absolute tag text-black bg-base-content">
						{mostCommon} - most common
					</span>
				{/if}
			</div>
			<div class="relative {classes} row2">
				{#if x === top10}
					<span class="absolute tag text-black bg-secondary">
						{top10} - top 10%
					</span>
				{/if}
			</div>
			<div class="relative {classes} row3">
				{#if x === top1}
					<span class="absolute tag text-primary-content bg-primary">
						{top1} - top 1%
					</span>
				{/if}
			</div>
			<div class="relative {classes} row4">
				{#if x === top01}
					<span class="absolute tag text-accent-content bg-accent">
						{top01} - top 0.1%
					</span>
				{/if}
			</div>

			<div class="bg-base-200 flex items-end h-full col {classes}">
				<div
					class="bg-base-300 h-px w-full bar"
					style:height="{Math.round((diagramHeight * $view[x]) / (maxY * 1.35))}px"
					style:will-change="height"
				/>
			</div>

			<div
				class="text-sm font-bold relative self-end label overflow-show {classes} border-none h-[20px]"
				class:always={x === 0 || x === mostCommon || x === top10 || x === top1 || x === top01}
			>
				<span
					class="absolute w-6 flex justify-center left-1/2 -mx-3"
					class:opacity-50={x < mostCommon}
				>
					{x}
				</span>
			</div>
		{/each}
	</div>
</div>

<hr class="my-4 border-base-200" />

<div class="flex justify-center">
	<div
		class="stats shadow grid-cols-2 grid-rows-2 grid-flow-row sm:grid-cols-[repeat(4,auto)] sm:grid-rows-1"
	>
		<div class="stat place-items-center">
			<div class="stat-title">Most common</div>
			<div class="stat-value">{mostCommon}</div>
		</div>
		<div class="stat place-items-center">
			<div class="stat-title">Top 10%</div>
			<div class="stat-value text-secondary">{top10}</div>
		</div>
		<div class="stat place-items-center border-l-transparent sm:border-l-base-content/10">
			<div class="stat-title">Top 1%</div>
			<div class="stat-value text-primary">{top1}</div>
		</div>
		<div class="stat place-items-center">
			<div class="stat-title">Top 0.1%</div>
			<div class="stat-value text-accent">{top01}</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.grid {
		@apply bg-base-200;
	}
	.grid > div:hover {
		filter: brightness(1.4);
	}
	.grid > div:hover > div {
		filter: brightness(1.3);
	}
	.grid .col ~ .label:not(.always) {
		opacity: 0;
	}
	.grid > .col:hover + .label {
		opacity: 1;
	}
	.tag {
		@apply left-0 top-16 whitespace-nowrap text-sm font-bold px-1 z-10 pointer-events-none;
	}

	.mean:not(.label) {
		@apply bg-base-content/20 border-l border-base-content;
	}
	.mean .tag {
		@apply top-0;
	}
	.grid .mean {
		@apply border-none;
	}
	.grid .mean > .bar {
		@apply bg-base-300/60;
	}
	.grid .mean.label {
		@apply text-base-content;
	}

	.top10 .tag {
		@apply top-12;
	}
	.top10:not(.row1) {
		@apply border-l border-secondary;
	}
	.grid .inTop10 > .bar {
		@apply bg-secondary;
	}
	.grid .inTop10 + .label {
		@apply text-secondary;
	}

	.top1 .tag {
		@apply top-28;
	}
	.top1:not(.row1):not(.row2) {
		@apply border-l border-primary;
	}
	.grid .inTop1 > .bar {
		@apply bg-primary;
	}
	.grid .inTop1 + .label {
		@apply text-primary;
	}

	.top01 .tag {
		@apply top-44;
	}
	.top01:not(.row1):not(.row2):not(.row3) {
		@apply border-l border-accent;
	}
	.grid .inTop01 > .bar {
		@apply bg-accent;
	}
	.grid .inTop01 + .label {
		@apply text-accent;
	}
</style>
