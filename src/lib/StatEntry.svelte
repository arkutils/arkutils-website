<script context="module" lang="ts">
	const STAT_NAMES = ['Health', 'Stamina', 'Oxygen', 'Food', 'Weight', 'Melee', 'Speed'];
</script>

<script lang="ts">
	export let wild = [0, 0, 0, 0, 0, 0, 0];
	export let tamed = [0, 0, 0, 0, 0, 0, 0];

	function setAllWild(value: number) {
		wild = Array(STAT_NAMES.length).fill(value);
	}

	function setAllTamed(value: number) {
		tamed = Array(STAT_NAMES.length).fill(value);
	}
</script>

<div class="flex flex-row gap-x-8 gap-y-8">
	<!-- Normal number entry -->
	<div class="flex flex-row gap-x-4">
		<ul class="flex flex-col gap-y-1">
			{#each STAT_NAMES as statName}
				<li>{statName}</li>
			{/each}
		</ul>
		<ul class="flex flex-col w-16 gap-y-1">
			{#each STAT_NAMES as _, i}
				<input
					type="number" min={0} max={255} step={1}
					bind:value={wild[i]}
					class="bg-gray-700 text-gray-100 text-center"
				/>
			{/each}
		</ul>
		<ul class="flex flex-col w-16 gap-y-1">
			{#each STAT_NAMES as _, i}
				<input
					type="number" min={0} max={255}
					bind:value={tamed[i]}
					class="bg-gray-700 text-gray-100 text-center"
				/>
			{/each}
		</ul>
	</div>

	<!-- Shortcuts -->
	<div class="grid grid-cols-2 content-center justify-center gap-x-4">
		<div class="flex flex-col items-center">
			<span class="text-sm font-medium">All Wild</span>
			<button on:click={() => setAllWild(0)}>0</button>
			<button on:click={() => setAllWild(1)}>1</button>
			<button on:click={() => setAllWild(35)}>35</button>
			<button on:click={() => setAllWild(100)}>100</button>
			<button on:click={() => setAllWild(254)}>254</button>
			<button on:click={() => setAllWild(255)}>255</button>
		</div>
		<div class="flex flex-col items-center">
			<span class="text-sm font-medium">All Tamed</span>
			<button on:click={() => setAllTamed(0)}>0</button>
			<button on:click={() => setAllTamed(1)}>1</button>
			<button on:click={() => setAllTamed(35)}>35</button>
			<button on:click={() => setAllTamed(100)}>100</button>
			<button on:click={() => setAllTamed(254)}>254</button>
			<button on:click={() => setAllTamed(255)}>255</button>
		</div>
	</div>
</div>

<style lang="postcss">
	button {
		@apply text-sm text-gray-100 px-2 py-[1px];
		@apply w-12;
		@apply border border-t-0 border-gray-500;
	}

	button:first-of-type {
		@apply border-t rounded-t;
	}

	button:last-of-type {
		@apply rounded-b;
	}
</style>
