<script lang="ts">
	const STAT_NAMES = ['Health', 'Stamina', 'Oxygen', 'Food', 'Weight', 'Melee', 'Speed'];

	export let wild = [0, 0, 0, 0, 0, 0, 0];
	export let tamed = [0, 0, 0, 0, 0, 0, 0];

	function setAllWild(value: number) {
		wild = Array(STAT_NAMES.length).fill(value);
	}

	function setAllTamed(value: number) {
		tamed = Array(STAT_NAMES.length).fill(value);
	}
</script>

<div class="flex flex-row gap-x-4 gap-y-8">
	<!-- Normal number entry -->
	<div class="flex flex-row gap-x-4">
		<div class="flex flex-col gap-y-1">
			<span>&nbsp;</span>
			{#each STAT_NAMES as statName}
				<span>{statName}</span>
			{/each}
		</div>
		<div class="flex flex-col w-16 gap-y-1">
			<span class="self-center text-sm text-secondary">Wild</span>
			{#each STAT_NAMES as _, i}
				<input
					type="number"
					min={0}
					max={255}
					step={1}
					bind:value={wild[i]}
					aria-label="Wild {STAT_NAMES[i]}"
					class="input input-xs bg-base-200 text-base-content text-center"
				/>
			{/each}
		</div>
		<div class="flex flex-col w-16 gap-y-1">
			<span class="self-center text-sm text-secondary">Tamed</span>
			{#each STAT_NAMES as _, i}
				<input
					type="number"
					min={0}
					max={255}
					bind:value={tamed[i]}
					aria-label="Tamed {STAT_NAMES[i]}"
					class="input input-xs bg-base-200 text-base-content text-center"
				/>
			{/each}
		</div>
	</div>

	<!-- Shortcuts -->
	<div class="grid grid-cols-2 content-center justify-center gap-x-2">
		<div class="flex flex-col items-center">
			<span class="text-sm font-medium whitespace-nowrap">All Wild</span>
			{#each [0, 1, 35, 60, 100, 254, 255] as v}
				<button on:click={() => setAllWild(v)} aria-label="Set all wild stats to {v}">{v}</button>
			{/each}
		</div>
		<div class="flex flex-col items-center">
			<span class="text-sm font-medium whitespace-nowrap">All Tamed</span>
			{#each [0, 1, 35, 60, 100, 254, 255] as v}
				<button on:click={() => setAllTamed(v)} aria-label="Set all tamed stats to {v}">{v}</button>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	button {
		@apply text-sm text-gray-100 px-2 py-[1px];
		@apply w-12;
		@apply border border-t-0 border-gray-500;
		@apply transition-colors;
	}
	button:hover {
		@apply bg-gray-700;
	}

	button:active {
		@apply bg-gray-500;
	}

	button:first-of-type {
		@apply border-t rounded-t;
	}

	button:last-of-type {
		@apply rounded-b;
	}
</style>
