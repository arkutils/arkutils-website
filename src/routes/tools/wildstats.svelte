<script lang="ts">
	import StatDiagram from '$lib/StatDiagram.svelte';

	const cap = 400;

	let numStats = 6;
	let level = 224;

	$: p = 1 / numStats;
	$: n = clamp(30, level, cap);

	function clamp(min: number, value: number, max: number) {
		return Math.min(Math.max(min, value), max);
	}
</script>

<div class="flex flex-col-reverse sm:flex-row gap-4 sm:gap-8">
	<!-- Level -->
	<div class="flex flex-col gap-4">
		<h2>Creature level</h2>
		<div class="flex flex-col gap-1">
			<label class="flex items-center gap-4">
				<button
					class="btn btn-sm w-20"
					class:btn-active={level === 150}
					class:btn-primary={level === 150}
					selected={level === 150}
					on:click={() => (level = 150)}
					>150
				</button>
				<span>
					<p>Max wild level</p>
					<p class="text-base-content/50 text-sm">Typical pre-tame maximum level</p>
				</span>
			</label>
			<label class="flex items-center gap-4">
				<button
					class="btn btn-sm w-20"
					class:btn-active={level === 217}
					class:btn-primary={level === 217}
					selected={level === 217}
					on:click={() => (level = 217)}
					>217
				</button>
				<span>
					<p>Perfect tamed 145</p>
					<p class="text-base-content/50 text-sm">Blah blah blah</p>
				</span>
			</label>
			<label class="flex items-center gap-4">
				<button
					class="btn btn-sm w-20"
					class:btn-active={level === 224}
					class:btn-primary={level === 224}
					selected={level === 224}
					on:click={() => (level = 224)}
					>224
				</button>
				<span>
					<p>Perfect tamed 150</p>
					<p class="text-base-content/50 text-sm">Blah blah blah</p>
				</span>
			</label>
			<label class="flex items-center gap-4">
				<input
					type="number"
					min="30"
					max="300"
					step="1"
					placeholder="Type here"
					class="input input-sm input-bordered w-20"
					class:input-primary={level !== 150 && level !== 217 && level !== 224}
					bind:value={level}
				/>
				<span>Custom level</span>
			</label>
		</div>
	</div>

	<!-- Stats -->
	<div class="flex flex-col gap-4">
		<h2>Stat count</h2>
		<div class="flex flex-col gap-1">
			<label class="flex items-center gap-4">
				<button
					class="btn btn-sm w-20"
					class:btn-active={numStats === 6}
					class:btn-secondary={numStats === 6}
					selected={numStats === 6}
					on:click={() => (numStats = 6)}>6</button
				>
				<span>
					<p>For flyers</p>
					<p class="text-base-content/50 text-sm">Blah blah blah</p>
				</span>
			</label>
			<label class="flex items-center gap-4">
				<button
					class="btn btn-sm w-20"
					class:btn-active={numStats === 7}
					class:btn-secondary={numStats === 7}
					selected={numStats === 7}
					on:click={() => (numStats = 7)}>7</button
				>
				<span>
					<p>Normal non-flyers</p>
					<p class="text-base-content/50 text-sm">Blah blah blah</p>
				</span>
			</label>
			<label class="flex items-center gap-4">
				<button
					class="btn btn-sm w-20"
					class:btn-active={numStats === 8}
					class:btn-secondary={numStats === 8}
					selected={numStats === 8}
					on:click={() => (numStats = 8)}>8</button
				>
				<span>
					<p>Gachas and other rares beasts</p>
					<p class="text-base-content/50 text-sm">Blah blah blah</p>
				</span>
			</label>
		</div>
	</div>
</div>

<input class="range my-4 range-xs" type="range" min="30" max={cap} step="1" bind:value={level} />

<!-- <hr class="my-4 border-base-200" /> -->

<StatDiagram {p} {n} />
