<script lang="ts">
	import { getLocale } from '$lib/utils/locale';

	import Metadata from '$lib/Metadata.svelte';
	import ValueButton from '$lib/wildstats/ValueButton.svelte';

	const RED_HUE = 12;
	const GREEN_HUE = 107;
	const GOOD_SUCCESS = 0.85;

	// User inputs
	let numStats = 6;
	let oneParentCapped = false;
	let usingSPlus = false;
	let customNumFemales = 100;
	let customNumFemalesRaw = 0;
	let customScale = 1;

	// The actual mutation change value to use
	$: mutChance = lookupMutChance(oneParentCapped, usingSPlus);

	// Calculate the output
	$: failChance = 1 - (mutChance / numStats) * 0.55; // includes chance to inherit the correct stack

	// Reverse calculator values
	let customFailChance = 0;
	let customSuccessRounds = 0;
	let customFailRounds = 0;
	let maxFemales = 0;
	$: (numStats, usingSPlus, oneParentCapped), updateMaxCustomFemales();
	$: (customNumFemales, usingSPlus, oneParentCapped, numStats), setCustomCalcs();

	// Update the custom females count by revering the log scale
	$: customNumFemales = Math.round(toLogScale(customNumFemalesRaw) * customScale + 1);

	function lookupMutChance(oneParentCapped: boolean, usingSPlus: boolean) {
		if (usingSPlus) return oneParentCapped ? 0.5 : 1;
		return oneParentCapped ? 0.0407 : 0.0731406;
	}

	function updateMaxCustomFemales() {
		// Remember the old current count
		const oldCustomNumFemales = customNumFemales;

		// Calculate the new max
		maxFemales = calcFemales(1 / 10000, failChance);

		// Update the custom scale
		customScale = (maxFemales - 1) / toLogScale(1.0);

		// Work backwards to maintain the same custom count (if possible)
		customNumFemalesRaw = toLinearScale((oldCustomNumFemales - 1) / customScale);
		if (Number.isNaN(customNumFemalesRaw) || customNumFemalesRaw > 1) {
			customNumFemalesRaw = 0.5;
		}
	}

	function calcFemales(acceptableFailRate: number, failChance: number) {
		return Math.ceil(Math.log(acceptableFailRate) / Math.log(failChance));
	}

	function setCustomCalcs() {
		if (customNumFemales > maxFemales) {
			customNumFemales = maxFemales;
		}

		customFailChance = Math.pow(failChance, customNumFemales);
		customSuccessRounds = Math.round(1 / (1 - customFailChance));
		customFailRounds = Math.round(1 / customFailChance);
	}

	function fmt(n: number, digits = 3) {
		return new Intl.NumberFormat(getLocale(), { maximumSignificantDigits: digits }).format(n);
	}

	function toLogScale(value: number) {
		return 1 - Math.sqrt(1 - Math.pow(value, 2));
	}

	function toLinearScale(value: number) {
		return Math.sqrt(1 - Math.pow(1 - value, 2));
	}

	function calcSliderColor(failChance: number) {
		const successChance = 1 - failChance;

		// We have a three-colour gradient based on success chance: red, white, green
		// So we just the lightness of the HSL colour to interpolate between them
		// 0-50%: red to white interpolation
		// 50-GOOD%: white to green interpolation
		// GOOD-100%: full green

		if (successChance < 0.5) {
			const lightness = 50 + successChance * 2 * 50;
			return `${RED_HUE} 100% ${lightness}%`;
		} else if (successChance < GOOD_SUCCESS) {
			const lightness = 100 - (successChance - 0.5) * (1 / (GOOD_SUCCESS - 0.5)) * 50;
			return `${GREEN_HUE} 100% ${lightness}%`;
		} else {
			return `${GREEN_HUE} 100% 50%`;
		}
	}
</script>

<Metadata
	title="How many females are needed for mutating?"
	description="This calculator will help you to find out how many females are needed for your breeding setup in ARK: Survival Evolved. You can enter how many possible stats you can mutate and also get information on when you use the S+ Mutator."
	preview="/tools/howmanyfemales"
/>

<!-- Site navigation breadcrumbs -->
<div class="flex">
	<nav class="text-sm breadcrumbs mb-2 flex-grow">
		<ul class="text-sm ml-4">
			<li><a href="/">Home</a></li>
			<li>How many females?</li>
		</ul>
	</nav>
	<div
		class="bg-secondary text-secondary-content cursor-default -mt-8 pt-8 px-3 mb-2 rounded-b-xl font-bold"
		title="Verified for ARK: Survival Ascended"
	>
		Works for ASA
	</div>
</div>

<header>
	<h1 class="title mb-4">How many females are needed?</h1>
	<p class="my-2">
		This little tool helps you to find out how many females you might want to use when breeding for
		mutations in ARK.
	</p>
	<p class="my-2">
		The chance to get your specific stat mutation (and therefore the number of females needed) is
		affected by how many mutatable stats the species has, whether one parent has more than 20 mutations,
		and is hugely improved if you are using the S+ Mutator.
	</p>
	<p class="my-2">
		For ARK: Survival Ascended it looks like the mutation rate is the same, but we'll investigate fully
		and update this tool as soon as possible.
	</p>
</header>

<div class="flex flex-col gap-8 xs:items-center">
	<section class="flex flex-col sm:flex-row xs:flex-wrap gap-y-4 gap-x-8 mt-6">
		<!-- Number of stats buttons -->
		<div class="flex flex-col gap-1 stat-buttons">
			<h2 class="mb-2">Number of stats</h2>
			<ValueButton bind:value={numStats} set={5}>
				<p class="text-sm">ASA water species</p>
				<p class="text-base-content/50 text-sm">Without movement speed and oxygen</p>
			</ValueButton>
			<ValueButton bind:value={numStats} set={6}>
				<p class="text-sm">ASA normal, and ASE flyers</p>
				<p class="text-base-content/50 text-sm">Without movement speed</p>
			</ValueButton>
			<ValueButton bind:value={numStats} set={7}>
				<p class="text-sm">ASE non-flyers</p>
				<p class="text-base-content/50 text-sm">Includes movement speed</p>
			</ValueButton>
			<ValueButton bind:value={numStats} set={8}>
				<p class="text-sm">ASE Gachas</p>
				<p class="text-base-content/50 text-sm">Includes crafting skill</p>
			</ValueButton>
		</div>

		<!-- Checkboxes for mutation chances -->
		<div class="flex flex-col gap-3 sm:gap-6">
			<h2>Settings</h2>
			<label class="flex flex-row gap-3 items-center">
				<input class="checkbox checkbox-accent" type="checkbox" bind:checked={oneParentCapped} />
				<div class="flex flex-col">
					<p>One parent is mutation capped</p>
					<p class="text-base-content/50 text-sm">Parent has more than 20 mutations</p>
				</div>
			</label>
			<label class="flex flex-row gap-3 items-center">
				<input class="checkbox checkbox-primary" type="checkbox" bind:checked={usingSPlus} />
				<div class="flex flex-col">
					<p>I am using the S+ Mutator</p>
					<p class="text-base-content/50 text-sm">Or any mod that guarantees mutations</p>
				</div>
			</label>
		</div>
	</section>

	<!-- Results -->
	<div class="flex flex-col justify-center text-center bg-base-200 rounded-lg shadow px-4 py-2 pb-4">
		<h2 class="self-start mb-2">Results</h2>
		<div
			class="stats shadow grid-cols-2 grid-rows-2 grid-flow-row sm:grid-cols-[repeat(4,auto)] sm:grid-rows-1"
		>
			{#each [5, 10, 20, 50] as roundsPerFail, i}
				{@const acceptableFailRate = 1 / roundsPerFail}
				{@const numFemales = calcFemales(acceptableFailRate, failChance)}
				<div class="stat place-items-center" class:stat-row={i > 0 && i % 2 === 0}>
					<div class="stat-value mb-3">{numFemales}</div>
					<div class="stat-title leading-none mb-2">
						{Math.round(acceptableFailRate * 100)}%
						<br />
						<span class="text-xs">failure rate</span>
					</div>
					<div class="stat-desc">Average 1 in {roundsPerFail}<br />rounds fail</div>
				</div>
			{/each}
		</div>
		<p class="text-sm mt-4 mx-2">
			Here we show the number of females needed for different success rates, measured by the chance of
			failing to get a specific stat mutation (the percentage) in a single breeding round.
		</p>
	</div>

	<!-- Reverse calculator for user input -->
	<div class="flex flex-col w-full bg-base-200 rounded-lg shadow px-4 py-2 pb-4">
		<h2 class="self-start mb-2">How good is your setup?</h2>
		<p class="mb-4">
			Use the slider to check the success rate and the fail rate for your amount of females. Keep in
			mind that you can never reach 100% success because it is statistically impossible.
		</p>
		<div>
			<input
				style:--range-shdw={calcSliderColor(customFailChance)}
				type="range"
				class="range range-accent"
				min="0"
				max="1"
				step="0.001"
				bind:value={customNumFemalesRaw}
			/>
		</div>
		<div class="grid grid-cols-[auto,auto] justify-start gap-x-4 items-center">
			<div class="font-bold text-left">Females:</div>
			<span class="text-secondary text-2xl font-bold">{customNumFemales}</span>
			<div class="font-bold text-left">Success rate:</div>
			<div>
				<span class="text-primary text-xl font-bold">{fmt((1 - customFailChance) * 100, 6)}%</span>
				{#if customSuccessRounds > 1}
					<span class="text-primary whitespace-nowrap">
						(1 in {customSuccessRounds} rounds)
					</span>
				{/if}
			</div>
			<div class="font-bold text-left">Failure rate:</div>
			<div>
				<span class="text-accent text-xl font-bold">{fmt(customFailChance * 100, 3)}%</span>
				{#if customFailRounds > 1}
					<span class="text-accent whitespace-nowrap">
						(1 in {customFailRounds} rounds)
					</span>
				{/if}
			</div>
		</div>
	</div>
</div>

<!-- </section> -->
<style lang="postcss">
	.title {
		font-size: calc(clamp(1.5rem, 6vw, 2.5rem));
		line-height: 1;
	}
	.stat-buttons :global(.btn-active) {
		@apply border-secondary bg-secondary text-secondary-content;
		&:hover {
			@apply border-secondary-focus bg-secondary-focus;
		}
		&:focus-visible {
			outline: 2px solid hsl(var(--p));
		}
	}
	.stat-row {
		@apply border-l-transparent sm:border-l-base-content/10;
	}
</style>
