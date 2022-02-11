<script lang="ts">
	import ClipboardCopier from '$lib/ClipboardCopier.svelte';
	import SpeciesSelector from '$lib/SpeciesSelector.svelte';
	import StatEntry from '$lib/StatEntry.svelte';

	let selectedSpecies: string = '';
	let wild = [0, 0, 0, 0, 0, 0, 0];
	let tamed = [0, 0, 0, 0, 0, 0, 0];
	let cmd = '';

	$: generateCommand(selectedSpecies, wild, tamed);

	function generateCommand(bp: string, wild: number[], tamed: number[]) {
		if (!bp) {
			cmd = null;
			return;
		}

		const sumWild = wild.reduce((a, b) => a + b, 1); // starts at 1
		const sumTamed = tamed.reduce((a, b) => a + b, 0);

		cmd = `cheat SpawnExactDino "Blueprint'${bp}'" ""`;
		cmd += ` 0 ${sumWild} ${sumTamed}`;
		cmd += ` "${wild.join(',')},0" "${tamed.join(',')},0"`;
		cmd += ` "Generated" 0 0 "" "" "" 0 0 "" 0 0 0 20 20`;
	}
</script>

<main class="flex flex-col gap-8">
	<!-- Species selection -->
	<section class="flex flex-col gap-4">
		<h2>Select species</h2>
		<SpeciesSelector bind:selectedSpecies />
	</section>

	<!-- Stat entry -->
	<section class="flex flex-col gap-4">
		<h2>Set stat levels</h2>
		<StatEntry bind:wild bind:tamed />
	</section>

	<!-- Command output -->
	<section class="flex flex-col gap-4">
		{#if cmd}
			<h2>Generated command</h2>
			<ClipboardCopier content={cmd}>
				<span
					class="flex flex-row items-center font-mono break-words break-all bg-gray-800 text-yellow-200 text-xs rounded-sm p-2"
					role="textbox"
					title="Click to copy"
					><span>{cmd}</span><span class="block pl-2 text-base">📋</span></span
				>
			</ClipboardCopier>
		{/if}
	</section>
</main>

<style lang="postcss">
	h2 {
		@apply text-green-600 font-bold capitalize text-lg;
	}
</style>
