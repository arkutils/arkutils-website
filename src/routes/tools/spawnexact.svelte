<script lang="ts">
	import ClipboardCopier from '$lib/ClipboardCopier.svelte';
	import SpeciesSelector from '$lib/SpeciesSelector.svelte';
	import StatEntry from '$lib/StatEntry.svelte';
	import ColorRegions from '$lib/ColorRegions.svelte';

	let selectedSpecies: string = '';
	let wild = [0, 0, 0, 0, 0, 0, 0];
	let tamed = [0, 0, 0, 0, 0, 0, 0];
	let colors = [0, 0, 0, 0, 0, 0];
	let wildColors = true;
	let imprint = 0.0;
	let imprintName = '';
	let imprintID: number = null;
	let cmd = '';

	$: if (selectedSpecies) {
		const sumWild = wild.reduce((a, b) => a + b, 1); // starts at 1
		const sumTamed = tamed.reduce((a, b) => a + b, 0);

		cmd = `cheat SpawnExactDino "Blueprint'${selectedSpecies}'" ""`;
		cmd += ` 0 ${sumWild} ${sumTamed}`;
		cmd += ` "${wild.join(',')},0" "${tamed.join(',')},0"`;
		cmd += ` "Generated" 0 0 "" ""`;
		cmd += ` ${imprintName ? JSON.stringify(imprintName) : '""'} ${imprintID || 0} ${imprint}`;
		cmd += ` "${wildColors ? '' : colors.join(',')}"`;
		cmd += ` 0 0 0 20 20`;
	} else {
		cmd = null;
	}
</script>

<main class="flex flex-col gap-8">
	<!-- Species selection -->
	<section class="flex flex-col gap-4">
		<h2>Select species</h2>
		<SpeciesSelector bind:selectedSpecies />
	</section>

	<div class="flex flex-wrap gap-x-16 gap-y-8 justify-center">
		<!-- Stat entry -->
		<section class="flex flex-col gap-4">
			<h2>Set stat levels</h2>
			<StatEntry bind:wild bind:tamed />
		</section>

		<!-- Color entry -->
		<section class="flex flex-col gap-2">
			<h2>Colors</h2>
			<ColorRegions bind:colors bind:wildColors />
		</section>

		<!-- Other stuff -->
		<section class="flex flex-col gap-2">
			<h2>Settings</h2>
			<label class="flex gap-2 items-baseline justify-between">
				Imprint
				<span class="text-sm text-green-200">(0.00 → 1.00)</span>
				<input
					type="number"
					min="0"
					max="1"
					step="0.01"
					bind:value={imprint}
					class="w-18 bg-gray-700 text-gray-100 text-center"
				/>
			</label>
			<label
				class="flex gap-2 items-baseline justify-between"
				title="Character name for rider imprint bonus"
			>
				Imprinter name
				<input
					type="text"
					bind:value={imprintName}
					class="w-22 bg-gray-700 text-gray-100 text-center"
				/>
			</label>
			<label
				class="flex gap-2 items-baseline justify-between"
				title="Ark ID for rider imprint bonus"
			>
				Imprinter ID
				<input
					type="number"
					placeholder=""
					bind:value={imprintID}
					class="w-28 bg-gray-700 text-gray-100 text-center"
				/>
			</label>
			<span
				class="text-sm text-green-200 italic self-end"
				title="Not the same as your Steam ID!">(showmyadminmanager for Ark ID)</span
			>
		</section>
	</div>

	<!-- Command output -->
	<section class="flex flex-col gap-4">
		<div class="flex flex-col gap-4">
			{#if cmd}
				<h2>Generated command</h2>
				<ClipboardCopier content={cmd}>
					<span
						class="flex flex-row items-center font-mono break-words break-all bg-gray-800 text-yellow-200 text-xs rounded-sm p-2"
						role="textbox"
						title="Click to copy"
					>
						<span>{cmd}</span>
						<span class="block pl-2 text-base">📋</span>
					</span>
				</ClipboardCopier>
			{/if}
		</div>
		<div class="flex justify-center rounded bg-yellow-200 text-dark-800 p-2 px-4">
			<em class="font-bold mr-2">Warning:</em> Creatures spawned with this method are broken
			until cryo'd.<br />Maybe even twice. You have been warned!
		</div>
	</section>
</main>
