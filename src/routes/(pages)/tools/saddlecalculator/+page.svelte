<script lang="ts">
	import { slide } from 'svelte/transition';

	import Calculator from '$lib/imgs/Calculator.svelte';
	// import Saddle from '$lib/imgs/Saddle.svelte';
	import BetterSaddle from '$lib/imgs/toolicons/BetterSaddle.svelte';
	import Metadata from '$lib/Metadata.svelte';
	import SupportedWidget from '$lib/SupportedWidget.svelte';

	let crafting_skill = 100;
	let saddle_armor = 25;
	let result_max: number | null = null;
	let result_min: number | null = null;
	let show_result = false;
	let used_crafting_skill: number | null = null;
	let used_saddle_armor: number | null = null;

	$: dirty_values =
		show_result && (used_crafting_skill !== crafting_skill || used_saddle_armor !== saddle_armor);

	function calculate() {
		// Calculate the extra armor value
		// This is the saddle armor minus 25
		const extra_armor = saddle_armor - 25;

		// Calculate the boost percentage
		// This is the crafting skill minus 100, divided by 20
		const boost_percentage = (crafting_skill - 100) / 20;

		// Calculate the boost value
		// This is the extra armor multiplied by the boost percentage
		const boost_value = extra_armor * (boost_percentage / 100);

		// Calculate the maximum armor value
		// This is the saddle armor plus the boost value
		const max_armor = saddle_armor + boost_value;

		// Set the result text to the maximum armor value
		result_max = max_armor;
		result_min = saddle_armor;

		show_result = true;

		used_crafting_skill = crafting_skill;
		used_saddle_armor = saddle_armor;
	}

	function round(value: number, places = 1): string {
		return value.toFixed(places);
	}

	function onBlurSkill() {
		if (crafting_skill < 100) crafting_skill = 100;
	}

	/*
	 * TODO:
	 *   * Add a notice when armor is 25 that there crafting skill is irrelevant
	 */
</script>

<Metadata
	title="Saddle Armor Blueprint Calculator"
	description="This tool helps you to calculate the maximum saddle armor when crafting a blueprint with crafting skill in ARK: Survival Evolved."
	preview="/tools/saddlecalculator"
/>

<!-- Site navigation breadcrumbs -->
<div class="flex">
	<nav class="text-sm breadcrumbs mb-2 flex-grow">
		<ul class="text-sm ml-4">
			<li><a href="/">Home</a></li>
			<li>Saddle Calculator</li>
		</ul>
	</nav>
	<SupportedWidget
		aseSupport="full"
		asaSupport="partial"
		asaText="Not yet fully verified for Ark: Survival Ascended but should work as expected"
	/>
</div>

<aside class="text-[6rem] xs:text-[10rem] float-right">
	<BetterSaddle />
</aside>

<h1 class="mb-4">Saddle Armor Blueprint Calculator</h1>

<p class="mb-4">
	If you level crafting skill on your character in
	<span class="text-secondary font-bold">ARK: Survival Evolved</span>
	you can get higher armor crafts out of saddle blueprints. The higher your crafting skill is the higher is
	the possible armor on the crafted saddle. But how high can the armor actually get? This tool helps you to
	find it out.
</p>

<p class="mb-4">
	Note: This tool is not yet verified or updated for ARK: Survival Ascended. It might not work correctly.
</p>

<p class="mb-4">
	Enter your <span class="text-secondary font-bold">crafting skill</span> and
	<span class="text-secondary font-bold">saddle armor</span> below, then click the
	<span class="text-secondary font-bold uppercase">Calculate</span> button to show the possible values you can
	get when crafting.
</p>

<section class="flex justify-center mb-8">
	<div class="grid sm:grid-cols-[1fr,12em] gap-y-2 gap-x-6 max-w-lg">
		<label class="label" for="crafting_skill">
			<span class="label-text font-bold text-lg">Your crafting skill %</span>
		</label>
		<input
			placeholder="Crafting skill"
			min="100"
			type="number"
			class="input input-bordered input-secondary w-full max-w-xs"
			id="crafting_skill"
			bind:value={crafting_skill}
			on:change={onBlurSkill}
		/>
		<label class="label" for="saddle_armor">
			<span class="label-text font-bold text-lg">Saddle armor on blueprint</span>
		</label>
		<input
			placeholder="Saddle armor"
			min="20"
			type="number"
			class="input input-bordered input-secondary w-full max-w-xs"
			id="saddle_armor"
			bind:value={saddle_armor}
		/>
		<button
			class="btn btn-active btn-secondary sm:col-start-2 gap-2 mt-4"
			on:click={calculate}
			class:glow={dirty_values}
		>
			{#if dirty_values}Recalculate{:else}Calculate{/if}
			<span class="text-4xl">
				<Calculator />
			</span>
		</button>
	</div>
</section>

{#if show_result && result_min && result_max}
	{#if saddle_armor === 25}
		<div class="alert alert-warning shadow-lg mt-4">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/></svg
				>
				<span>Warning: Saddles with armor of 25 or less recieve no bonus.</span>
			</div>
		</div>
	{/if}
	{#if crafting_skill <= 100}
		<div class="alert alert-warning shadow-lg mt-4">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/></svg
				>
				<span>Warning: Crafting skill should be above 100% to see any effect.</span>
			</div>
		</div>
	{/if}
	<section
		class="flex flex-col justify-center text-center bg-base-200 rounded-lg shadow mt-4 px-4 py-2 pb-4"
		transition:slide
	>
		<h2 class="self-start mb-2">Possible Armor Values</h2>
		<div class="stats stats-vertical xs:stats-horizontal">
			<div class="stat place-items-center">
				<div class="stat-title font-bold text-lg">Minimum</div>
				<div class="stat-value">{round(result_min)}</div>
				<div class="stat-desc">Armor</div>
			</div>
			<div class="stat place-items-center">
				<div class="stat-title font-bold text-secondary text-lg">Maximum</div>
				<div class="stat-value text-secondary">{round(result_max)}</div>
				<div class="stat-desc">Armor</div>
			</div>
		</div>
	</section>
{/if}

<style lang="postcss">
	button.glow {
		@apply border-base-100 border;
		box-shadow: 0px 0px 30px -2px rgba(255, 255, 255, 0.5);
	}
</style>
