<script lang="ts">
	import LittleAlienWormy from '$lib/imgs/toolicons/LittleAlienWormy.svelte';
	import WarningTriangleOutline from '$lib/imgs/WarningTriangleOutline.svelte';
	import Metadata from '$lib/Metadata.svelte';
	import SupportedWidget from '$lib/SupportedWidget.svelte';
	import ValueButton from '$lib/wildstats/ValueButton.svelte';
	import { slide } from 'svelte/transition';

	const PLAYER_LEVEL_MIN = 1;
	const PLAYER_LEVEL_MAX = 175;

	const PLAYER_CLAMP_MIN = 50;
	const PLAYER_CLAMP_MAX = 175;

	const REAPER_LEVEL_MIN = 1;
	const REAPER_LEVEL_MAX = 1000;

	// Inputs
	let playerLevel: number = 105; // @hmr:keep
	let reaperLevel: number = 150; // @hmr:keep
	let additionalLevels: boolean = false; // @hmr:keep

	// Calculations
	$: actualPlayerLevel = Math.min(Math.max(playerLevel, PLAYER_CLAMP_MIN), PLAYER_CLAMP_MAX);
	$: result = reaperLevel * (actualPlayerLevel / 250 + 0.4) + (additionalLevels ? 75 : 0);
	$: resultClean = Math.round(result);
	$: playerLevelIsClamped = playerLevel !== actualPlayerLevel;

	// Log-scale reaper levels
	$: reaperLevelRaw = toLinearScale((150 - 1) / REAPER_LEVEL_MAX); // @hmr:keep
	$: reaperLevel = Math.round(toLogScale(reaperLevelRaw) * REAPER_LEVEL_MAX + 1);
	$: reaperLevel, updateReaperRaw();

	function updateReaperRaw() {
		reaperLevelRaw = toLinearScale((reaperLevel - 1) / REAPER_LEVEL_MAX);
	}

	function toLogScale(value: number) {
		return 1 - Math.sqrt(1 - Math.pow(value, 2));
	}

	function toLinearScale(value: number) {
		return Math.sqrt(1 - Math.pow(1 - value, 2));
	}
</script>

<Metadata
	title="Baby Reaper Calculator"
	description="Calculate your Reaper baby's level in ARK: Survival Ascended based on player level and Reaper Queen stats to predict the outcome of your pregnancy."
	preview="/tools/reapercalculator"
/>

<!-- Site navigation breadcrumbs -->
<div class="flex">
	<nav class="text-sm breadcrumbs mb-2 flex-grow">
		<ul class="text-sm ml-4">
			<li><a href="/">Home</a></li>
			<li>Reaper Calculator</li>
		</ul>
	</nav>
	<SupportedWidget aseSupport="none" asaSupport="full" aseText="ASE does not need this calculator!" />
</div>

<aside class="text-[6rem] xs:text-[10rem] float-right min-w-36">
	<LittleAlienWormy />
</aside>

<h1 class="mb-4">Baby Reaper Calculator</h1>

<p class="mb-4">
	Wondering how your Reaper baby's level is influenced by your player level and the Reaper Queen's stats in
	ARK: Survival Ascended? This tool calculates the exact Reaper offspring level, helping you determine the
	outcome of your Reaper pregnancy.
</p>

<div class="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6">
	<!-- Level -->
	<div class="flex flex-col gap-4 flex-1 level-buttons">
		<div>
			<h2 class="mb-2">Player level</h2>
			<p class="text-sm">
				Either choose one of our level presets or enter the level of your character.
			</p>
		</div>
		<div class="flex flex-col gap-1">
			<ValueButton bind:value={playerLevel} set={50}>
				<p class="text-sm">Min useful level</p>
				<p class="text-base-content/50 text-sm">Levels below this count as level 50</p>
			</ValueButton>
			<ValueButton bind:value={playerLevel} set={105}>
				<p class="text-sm">Max player level</p>
				<p class="text-base-content/50 text-sm">Without bosses or chibi</p>
			</ValueButton>
			<ValueButton bind:value={playerLevel} set={PLAYER_CLAMP_MAX}>
				<p class="text-sm">Maximum possible level</p>
				<p class="text-base-content/50 text-sm">Full completion</p>
			</ValueButton>
			<label class="flex items-center gap-4">
				<input
					type="number"
					min={PLAYER_LEVEL_MIN}
					max={PLAYER_LEVEL_MAX}
					step={1}
					placeholder="Type here"
					class="input input-sm input-bordered w-20"
					class:input-secondary={playerLevel !== 50 && playerLevel !== 105 && playerLevel !== 175}
					bind:value={playerLevel}
				/>
				<!-- svelte-ignore a11y-no-static-element-interactions : we're actually disabling all interaction -->
				<span
					on:click|preventDefault
					on:focus|preventDefault
					on:keydown|preventDefault
					on:keypress|preventDefault
				>
					<p class="text-sm">Custom player level</p>
					<p class="text-base-content/50 text-sm">Or drag the slider below</p>
				</span>
			</label>
		</div>
		<!-- Level slider -->
		<input
			class="range range-xs range-secondary"
			class:range-warning={playerLevelIsClamped}
			type="range"
			min={PLAYER_LEVEL_MIN}
			max={PLAYER_LEVEL_MAX}
			step={1}
			bind:value={playerLevel}
		/>
		{#if playerLevelIsClamped}
			<div
				class="fixed top-0 left-0 right-0 bg-warning text-warning-content py-2 px-2 sm:hidden flex justify-start gap-4 items-center text-sm"
				transition:slide
			>
				<span class="text-3xl">
					<WarningTriangleOutline />
				</span>
				Levels are only affected after player level {PLAYER_CLAMP_MIN}.
			</div>
		{/if}
	</div>

	<!-- Reaper -->
	<div class="flex flex-col gap-4 flex-1 reaper-buttons">
		<div>
			<h2 class="mb-2">Reaper wild level</h2>
			<p class="text-sm">
				Enter the level of the wild Reaper Queen used to impregnate your character.
			</p>
		</div>
		<div class="flex flex-col gap-1">
			<span class="my-1">
				<ValueButton bind:value={reaperLevel} set={100}>
					<p class="text-sm">Wild levels</p>
					<!-- <p class="text-base-content/50 text-sm">Without movement speed and oxygen</p> -->
				</ValueButton>
			</span>
			<span class="my-1">
				<ValueButton bind:value={reaperLevel} set={140}>
					<p class="text-sm">Wild levels</p>
					<!-- <p class="text-base-content/50 text-sm">Without movement speed</p> -->
				</ValueButton>
			</span>
			<span class="my-1">
				<ValueButton bind:value={reaperLevel} set={150}>
					<p class="text-sm">Wild levels</p>
					<!-- <p class="text-base-content/50 text-sm">Includes movement speed</p> -->
				</ValueButton>
			</span>
			<label class="flex items-center gap-4">
				<input
					type="number"
					min={REAPER_LEVEL_MIN}
					max={REAPER_LEVEL_MAX}
					step={1}
					placeholder="Type here"
					class="input input-sm input-bordered w-20"
					class:input-secondary={reaperLevel !== 100 && reaperLevel !== 140 && reaperLevel !== 150}
					bind:value={reaperLevel}
				/>
				<!-- svelte-ignore a11y-no-static-element-interactions : we're actually disabling all interaction -->
				<span
					on:click|preventDefault
					on:focus|preventDefault
					on:keydown|preventDefault
					on:keypress|preventDefault
				>
					<p class="text-sm">Custom reaper level</p>
					<p class="text-base-content/50 text-sm">Or drag the slider below</p>
				</span>
			</label>
		</div>
		<!-- Level slider -->
		<input
			class="range range-xs range-primary"
			type="range"
			min={0}
			max={1}
			step={0.001}
			bind:value={reaperLevelRaw}
		/>
	</div>
</div>

<!-- Additional Levels -->
<div class="mt-8 flex justify-start">
	<label class="flex items-center gap-4 py-2 pl-4 pr-6 rounded-lg">
		<input type="checkbox" class="checkbox checkbox-accent" bind:checked={additionalLevels} />
		<div class="flex flex-col">
			<p class="text-sm">Include 75 additional levels</p>
			<p class="text-base-content/50 text-sm">From gaining XP during pregnancy</p>
		</div>
	</label>
</div>

<!-- Results -->
<section class="flex flex-col justify-center text-center bg-base-200 rounded-lg shadow mt-4 px-4 py-2 pb-4">
	<h2 class="self-start mb-2">Possible Reaper Levels</h2>
	<p class="self-start text-sm text-base-content/70 pb-4">
		Actual baby level might vary by 1 due to internal game rounding.
	</p>
	<div class="stats stats-vertical xs:stats-horizontal">
		<div class="stat place-items-center">
			<div class="stat-title font-bold text-lg text-secondary">Embryo Level</div>
			<div class="stat-value text-secondary">{resultClean}</div>
			<div class="stat-desc">levels</div>
			<div class="stat-desc">at birth</div>
		</div>
		<div class="stat place-items-center">
			<div class="stat-title font-bold text-lg">Fully Levelled</div>
			<div class="stat-value">{resultClean + 88}</div>
			<div class="stat-desc">levels</div>
			<div class="stat-desc">after 88 level-ups</div>
		</div>
	</div>
</section>

<!-- Warning messages -->
{#if playerLevelIsClamped}
	<div class="alert alert-warning mt-4 flex-row justify-start hidden sm:flex" transition:slide>
		<span class="text-3xl">
			<WarningTriangleOutline />
		</span>
		Baby level scaling is only affected after player level {PLAYER_CLAMP_MIN}!
	</div>
{/if}

<style lang="postcss">
	/* Colour active buttons in the groups */
	.level-buttons :global(button) {
		@apply outline-secondary;
	}
	.level-buttons :global(.btn-active) {
		@apply border-secondary bg-secondary text-secondary-content;
	}
	.reaper-buttons :global(button) {
		@apply outline-primary;
	}
	.reaper-buttons :global(.btn-active) {
		@apply border-primary bg-primary text-primary-content;
	}
</style>
