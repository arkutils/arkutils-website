<script lang="ts">
	import { selectedSpecies, selectedModId } from '$lib/stores';

	import ClipboardCopier from '$lib/ClipboardCopier.svelte';
	import SpeciesSelector from '$lib/SpeciesSelector.svelte';
	import StatEntry from '$lib/StatEntry.svelte';
	import ColorRegions from '$lib/ColorRegions.svelte';
	import Metadata from '$lib/Metadata.svelte';

	let wild = [0, 0, 0, 0, 0, 0, 0];
	let tamed = [0, 0, 0, 0, 0, 0, 0];
	let colors = [0, 0, 0, 0, 0, 0];
	let wildColors = true;
	let imprint = 0.0;
	let imprintName = '';
	let imprintID: number | null = null;
	let cmd: string | null = '';

	$: if ($selectedSpecies) {
		const sumWild = wild.reduce((a, b) => a + b, 1); // starts at 1
		const sumTamed = tamed.reduce((a, b) => a + b, 0);

		cmd = `cheat SpawnExactDino "Blueprint'${$selectedSpecies}'" ""`;
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

<Metadata
	title="Spawn Exact Dino Generator"
	description="This generator for the spawnexactdino admin command can help you spawn creatures with every level, color and stat distribution that you want. It also supports many modded dinos."
/>

<main class="flex flex-col gap-8">
	<header class="flex flex-col gap-2">
		<h1 class="mb-2"><code>/spawnexactdino</code> Generator</h1>
		<p>
			This generator helps you create admin spawncodes for creatures in ARK: Survival Evolved.
			You can decide over the stat and color distribution.
		</p>
		<p>
			The generator also supports many modded creatures and lets you set an imprinter and
			imprint amount. Please be aware that creatures need to be cryo'd once or twice until
			they show the right stats and colors.
		</p>
	</header>

	<!-- Species selection -->
	<section class="flex flex-col gap-4">
		<h2 class="text-primary">Select Species</h2>
		<SpeciesSelector
			bind:selectedSpecies={$selectedSpecies}
			bind:selectedModId={$selectedModId}
		/>
	</section>

	<div class="flex flex-wrap gap-x-16 gap-y-8 justify-center">
		<!-- Stat entry -->
		<section class="flex flex-col gap-4">
			<h2 class="text-primary -mb-2">Set Stat Levels</h2>
			<StatEntry bind:wild bind:tamed />
		</section>

		<!-- Color entry -->
		<section class="flex flex-col gap-2">
			<h2 class="text-primary">Colors</h2>
			<ColorRegions bind:colors bind:wildColors />
		</section>

		<!-- Other stuff -->
		<section class="flex flex-col gap-2">
			<h2 class="text-primary">Settings</h2>
			<label class="flex gap-2 items-baseline justify-between">
				Imprint
				<span class="text-sm text-primary">(0.00 → 1.00)</span>
				<input
					type="number"
					min="0"
					max="1"
					step="0.01"
					bind:value={imprint}
					class="input input-xs w-18 bg-base-200 text-base-content text-center"
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
					class="input input-xs w-22 bg-base-200 text-base-content text-center"
				/>
			</label>
			<label
				class="flex gap-2 items-baseline justify-between"
				title="Ark ID for rider imprint bonus"
			>
				Imprinter's Ark ID
				<input
					type="number"
					placeholder=""
					bind:value={imprintID}
					class="input input-xs w-28 bg-base-200 text-base-content text-center"
				/>
			</label>
			<span
				class="text-sm text-secondary italic self-end"
				title="Not the same as your Steam ID!">(showmyadminmanager for Ark ID)</span
			>
		</section>
	</div>

	<!-- Command output -->
	<section class="flex flex-col gap-4">
		<div class="flex flex-col gap-4">
			{#if cmd}
				<h2 class="text-primary">Generated command</h2>
				<ClipboardCopier content={cmd}>
					<span
						class="flex flex-row items-center font-mono break-words break-all bg-base-200 text-secondary text-xs rounded-xl p-2"
						role="textbox"
						title="Click to copy"
					>
						<span>{cmd}</span>
						<span class="block pl-2 text-base">📋</span>
					</span>
				</ClipboardCopier>
			{/if}
		</div>
		<div class="flex justify-center rounded-xl bg-warning text-warning-content p-2 px-4">
			<em class="font-bold mr-2">Warning:</em> Creatures spawned with this method are broken
			until cryo'd.<br />Maybe even twice. You have been warned!
		</div>
	</section>
</main>
