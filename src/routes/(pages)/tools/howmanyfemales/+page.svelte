<script lang="ts">
	import { getLocale } from '$lib/utils/locale';

	import { page } from '$app/stores';
	import Metadata from '$lib/Metadata.svelte';
	import { pct as fmtPct } from '$lib/utils/math';
	import ValueButton from '$lib/wildstats/ValueButton.svelte';
	import TraitGroup from './TraitGroup.svelte';
	import { gatherTraitEffects } from './traits';

	const RED_HUE = 12;
	const GREEN_HUE = 107;
	const GOOD_SUCCESS = 0.85;

	const BASE_ROLL_CHANCE = 0.025;
	const BASE_HIGHER_PICK_CHANCE = 0.55;
	const BASE_STAT_WEIGHT = 1;

	const MAX_TRAITS = 5;
	const MAX_MUTABLE_STACKS = 3;
	const MAX_ROBUST_STACKS = 3;
	const MUTABLE_ROLL_CHANCE_EFFECTS = [0.01, 0.015, 0.02];
	const MUTABLE_STAT_WEIGHT_EFFECTS = [0.5, 0.75, 1.0];
	const ROBUST_HIGHER_PICK_EFFECTS = [0.015, 0.0225, 0.03];

	const BEST_TRAITS = ['Mutable[3]', 'Mutable[3]', 'Mutable[3]', 'Robust[3]', 'Robust[3]'];

	// User inputs
	let numStats = 6; // @hmr:keep
	let oneParentCapped = false; // @hmr:keep
	let usingSPlus = false; // @hmr:keep
	let acceptMalesOnly = false; // @hmr:keep
	let customNumFemales = 100; // @hmr:keep
	let customNumFemalesRaw = 0; // @hmr:keep
	let matTraits = Array(MAX_TRAITS).fill(''); // @hmr:keep
	let patTraits = Array(MAX_TRAITS).fill(''); // @hmr:keep
	let showBreakdown = false;

	// Collect values from traits
	$: rollChanceOffset = gatherTraitEffects('Mutable', MUTABLE_ROLL_CHANCE_EFFECTS, matTraits, patTraits);
	$: statWeightOffset = gatherTraitEffects('Mutable', MUTABLE_STAT_WEIGHT_EFFECTS, matTraits, patTraits);
	$: higherPickOffset = gatherTraitEffects('Robust', ROBUST_HIGHER_PICK_EFFECTS, matTraits, patTraits);

	// Decide base values from settings
	$: numRolls = usingSPlus ? 1 : 3;
	$: cappedChance = oneParentCapped ? 0.55 : 1;
	$: rollChance = usingSPlus ? 1 : BASE_ROLL_CHANCE + rollChanceOffset;
	$: statPickChance = usingSPlus
		? 1 / numStats // S+ does not respect traits currently
		: (BASE_STAT_WEIGHT + statWeightOffset) / (numStats * BASE_STAT_WEIGHT + statWeightOffset);
	$: higherPickChance = usingSPlus ? BASE_HIGHER_PICK_CHANCE : BASE_HIGHER_PICK_CHANCE + higherPickOffset;
	$: genderChance = acceptMalesOnly ? 0.5 : 1;

	// Intermediate calculations
	$: fullRollChance = rollChance * cappedChance * higherPickChance * statPickChance;
	$: anyMutChance = 1 - (1 - fullRollChance) ** numRolls;

	// Final result
	$: successChance = anyMutChance * genderChance;
	$: failChance = 1 - successChance;

	// Reverse calculator values
	let customFailChance = 0;
	let customSuccessRounds = 0;
	let customFailRounds = 0;
	let maxFemales = 0;
	let customScale = 1;
	$: (numStats, usingSPlus, oneParentCapped), updateMaxCustomFemales();
	$: (customNumFemales, failChance), setCustomCalcs();

	// Update the custom females count by revering the log scale
	$: customNumFemales = Math.round(toLogScale(customNumFemalesRaw) * customScale + 1);

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

	function pct(n: number, minPlaces = 0) {
		return fmtPct(n, minPlaces, 4);
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
		affected by how many mutable stats the species has, whether one parent has more than 20 mutations,
		and is hugely improved by the new trait system from Bob's Tall Tales, or if you are using the S+
		Mutator.
	</p>
</header>

<div class="flex flex-col gap-8 xs:items-center">
	<section
		class="grid grid-rows-[auto,auto,auto] sm:grid-rows-[auto,auto] sm:grid-cols-[auto,auto] gap-y-4 gap-x-8 mt-6"
	>
		<!-- Number of stats -->
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

		<!-- General settings -->
		<div class="flex flex-col gap-3 sm:gap-4">
			<h2>Settings</h2>
			<label class="flex flex-row gap-3 items-center">
				<input class="checkbox checkbox-accent" type="checkbox" bind:checked={oneParentCapped} />
				<div class="flex flex-col">
					<p>One parent is mutation capped</p>
					<p class="text-base-content/50 text-sm">One parent has 20 or more mutations</p>
				</div>
			</label>
			<label class="flex flex-row gap-3 items-center">
				<input class="checkbox checkbox-secondary" type="checkbox" bind:checked={acceptMalesOnly} />
				<div class="flex flex-col">
					<p>Only accept males</p>
					<p class="text-base-content/50 text-sm">Saves an extra step in the process</p>
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

		<!-- Traits -->
		<div class="flex flex-col gap-3 sm:gap-3 sm:col-span-2">
			<h2>Traits (Bob's Tall Tales)</h2>
			{#if usingSPlus}
				<p class="italic text-base-content/50 text-sm">(disabled when S+ Mutator is selected)</p>
			{:else}
				<p class="flex w-full flex-col sm:flex-row gap-x-2 justify-between">
					<span class="whitespace-nowrap">
						<code>+{pct(rollChanceOffset)}</code>
						<span class="text-sm">per-roll mutation chance</span>
					</span>
					<span class="whitespace-nowrap">
						<code>+{statWeightOffset}</code> <span class="text-sm">to stat weight</span>
					</span>
					<span class="whitespace-nowrap">
						<code>+{pct(higherPickOffset)}</code>
						<span class="text-sm">to higher stat selection chance</span>
					</span>
				</p>
				<div class="grid grid-cols-2 md:grid-rows-2 md:grid-cols-1 gap-x-4 gap-y-2">
					<div>
						<div class="flex gap-3 items-baseline">
							<h3>Father</h3>
							<button
								class="btn btn-xs btn-ghost ml-0 md:ml-auto hover:bg-primary-focus hover:text-primary-content"
								title="Set father's traits to the best possible"
								on:click={() => (patTraits = Array.from(BEST_TRAITS))}
							>
								Set to best
							</button>
							<button
								class="btn btn-xs btn-ghost"
								title="Clear father's traits"
								on:click={() => (patTraits = Array(MAX_TRAITS).fill(''))}
							>
								Clear
							</button>
						</div>
						<TraitGroup
							bind:traits={patTraits}
							slots={MAX_TRAITS}
							maxMutables={MAX_MUTABLE_STACKS}
							maxRobusts={MAX_ROBUST_STACKS}
						/>
					</div>
					<div>
						<div class="flex gap-3 items-baseline">
							<h3>Mother</h3>
							<button
								class="btn btn-xs btn-ghost ml-0 md:ml-auto"
								title="Set mother's traits to the best possible"
								on:click={() => (matTraits = Array.from(BEST_TRAITS))}
							>
								Set to best
							</button>
							<button
								class="btn btn-xs btn-ghost"
								title="Clear mother's traits"
								on:click={() => (matTraits = Array(MAX_TRAITS).fill(''))}
							>
								Clear
							</button>
						</div>
						<TraitGroup
							bind:traits={matTraits}
							slots={MAX_TRAITS}
							maxMutables={MAX_MUTABLE_STACKS}
							maxRobusts={MAX_ROBUST_STACKS}
						/>
					</div>
				</div>
			{/if}
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
			Use the slider to check the success rate and the fail rate for your amount of females.
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

	<!-- Breakdown -->
	<div class="collapse w-full bg-base-200 rounded-lg shadow">
		<input type="checkbox" bind:checked={showBreakdown} />
		<div class="collapse-title flex justify-between items-baseline">
			<h2>Numbers for nerds</h2>
			<p>
				Click to {#if showBreakdown}hide{:else}show{/if}
			</p>
		</div>
		<div class="collapse-content flex flex-col">
			<p class="mb-4">Here we'll show all of the steps we use to calculate these results.</p>
			{#if showBreakdown}
				<div class="flex flex-col gap-y-4">
					{#if usingSPlus}
						<div class="inline-flex flex-col">
							<p>Change for S+ to mutate:</p>
							<div class="flex flex-col self-center">
								<code class="text-base-content">= 100% (* 55% if one parent capped)</code>
								<code>= {pct(fullRollChance)}</code>
							</div>
						</div>
						<div class="inline-flex flex-col">
							<p>Chance to pick the correct stat (S+ ignores traits):</p>
							<div class="flex flex-col self-center">
								<code class="text-base-content"> 1 in {numStats} </code>
								<code>
									= {pct(statPickChance, 1)}
								</code>
							</div>
						</div>
						<div class="inline-flex flex-col">
							<p>Chance for higher of the parent stats to be picked (S+ ignores traits):</p>
							<div class="flex flex-col self-center">
								<code>
									= {pct(higherPickChance)}
								</code>
							</div>
						</div>
						<div class="inline-flex flex-col">
							<p>Useful mutation chance:</p>
							<div class="flex flex-col self-center">
								<code class="text-base-content">
									roll chance * stat chance * higher chance * capped chance
								</code>
								<code>
									= {pct(rollChance)} * {pct(statPickChance)} * {pct(higherPickChance)} * {pct(
										cappedChance
									)}
									= {pct(fullRollChance, 1)}
								</code>
							</div>
						</div>
					{:else}
						<div class="inline-flex flex-col">
							<p>Basic per-roll mutation chance:</p>
							<div class="flex flex-col self-center">
								<code class="text-base-content"> 2.5% + mutable effects </code>
								<code>
									= 2.5% + {pct(rollChanceOffset, 1)} =
									{pct(rollChance)}
								</code>
							</div>
						</div>
						<div class="inline-flex flex-col">
							<p>Chance to pick the correct stat:</p>
							<div class="flex flex-col self-center">
								<code class="text-base-content">
									(1 + mutable effects) in (num stats + mutable effects)
								</code>
								<code>
									= ({BASE_STAT_WEIGHT} + {statWeightOffset}) / ({numStats} + {statWeightOffset})
									= {BASE_STAT_WEIGHT + statWeightOffset} / {numStats + statWeightOffset}
									= {pct(statPickChance)}
								</code>
							</div>
						</div>
						<div class="inline-flex flex-col">
							<p>Chance for higher of the parent stats to be picked:</p>
							<div class="flex flex-col self-center">
								<code class="text-base-content"> 55% + robust effects </code>
								<code>
									= 55% + {pct(higherPickOffset, 1)} = {pct(higherPickChance, 1)}
								</code>
							</div>
						</div>
						<div class="inline-flex flex-col">
							<p>Useful per-roll mutation chance:</p>
							<div class="flex flex-col self-center">
								<code class="text-base-content">
									roll chance * stat chance * higher chance * capped chance
								</code>
								<code>
									= {pct(rollChance)} * {pct(statPickChance)} * {pct(higherPickChance)} * {pct(
										cappedChance
									)}
									= {pct(fullRollChance, 1)}
								</code>
							</div>
						</div>
						<div class="inline-flex flex-col">
							<p>Chance for at least one mutation in 3 rolls:</p>
							<div class="flex flex-col self-center">
								<code class="text-base-content">1 - (1 - per roll chance)<sup>3</sup></code>
								<code>
									= 1 - (1 - {pct(fullRollChance, 1)})<sup>3</sup> = {pct(anyMutChance)}
								</code>
							</div>
						</div>
					{/if}
					<div class="inline-flex flex-col">
						<p>Final combined chance for correct mutation and gender:</p>
						<div class="flex flex-col self-center">
							<code class="text-base-content"> mutation chance * gender chance </code>
							<code>
								= {pct(anyMutChance)} * {pct(genderChance)} = {pct(successChance)}
							</code>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Variables -->
	{#if $page.url.hash.includes('dev')}
		<div class="flex flex-col w-full bg-base-200 rounded-lg shadow px-4 py-2 pb-4">
			<h2 class="self-start mb-2">Internal variables</h2>
			<div class="grid grid-cols-2 font-mono">
				<span>rollChanceOffset</span><code>+{pct(rollChanceOffset)}</code>
				<span>statWeightOffset</span><code>+{statWeightOffset}</code>
				<span>higherPickOffset</span><code>+{pct(higherPickOffset)}</code>
				<span>numRolls</span><code>{numRolls}</code>
				<span>cappedChance</span><code>{pct(cappedChance)}</code>
				<span>rollChance</span><code>{pct(rollChance)}</code>
				<span>statPickChance</span><code>{pct(statPickChance)}</code>
				<span>higherPickChance</span><code>{pct(higherPickChance)}</code>
				<span>genderChance</span><code>{pct(genderChance)}</code>
				<span>fullRollChance</span><code>{pct(fullRollChance)}</code>
				<span>anyMutChance</span><code>{pct(anyMutChance)}</code>
				<span>successChance</span><code>{pct(successChance)}</code>
				<span>failChance</span><code>{pct(failChance)}</code>
			</div>
		</div>
	{/if}
</div>

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
