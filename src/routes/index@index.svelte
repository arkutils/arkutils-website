<script lang="ts">
	import ArkUtilsLogo from '$lib/imgs/ArkUtilsLogo.svelte';
	import Brontosaur from '$lib/imgs/toolicons/Brontosaur.svelte';
	import DinoHatching from '$lib/imgs/toolicons/DinoHatching.svelte';
	import Pteranodon from '$lib/imgs/toolicons/Pteranodon.svelte';
	import Rainbow from '$lib/imgs/toolicons/Rainbow.svelte';

	import { slide } from 'svelte/transition';

	const buttons = ['spawnexact', 'incubator', 'colorid'];

	let show: { [key: string]: boolean } = {};

	function toggle(name: string) {
		buttons.forEach((otherName) => {
			if (otherName !== name) {
				show[otherName] = false;
			}
		});
		show[name] = !show[name];
	}
</script>

<header class="w-full flex justify-center">
	<div class="bg-base-200 rounded-b-full text-[200px] text-secondary p-8 pt-2">
		<ArkUtilsLogo />
	</div>
</header>

<div class="flex flex-col gap-8 mt-8 items-center">
	<h1 class="text-center text-secondary">
		<span class="text-2xl text-base-content">Helpful tools for</span><br /> ARK: Survival Evolved
	</h1>

	<section class="infogroup">
		<h3 class="ml-4 my-2 text-primary text-2xl uppercase font-800">Tools</h3>

		<div class="infos">
			<div>
				<a class="tool" href="/tools/spawnexact">
					<figure>
						<Brontosaur />
					</figure>
					<span><code>/spawnexactdino</code><br /><b>Generator</b></span>
					<button class="help" on:click|preventDefault={() => toggle('spawnexact')}>
						?
					</button>
				</a>
				{#if show.spawnexact}
					<div transition:slide class="info">
						Let's you spawn a dinosaur with the <b>exact stats</b> and <b>colors</b> you
						need.
					</div>
				{/if}
			</div>
			<div>
				<a class="tool" href="/tools/incubator">
					<figure>
						<DinoHatching />
					</figure>
					<span>Incubator<br /><b>Calculator</b></span>
					<button class="help" on:click|preventDefault={() => toggle('incubator')}>
						?
					</button>
				</a>
				{#if show.incubator}
					<div transition:slide class="info">
						Let's you calculate the <b>raw stats</b> when providing level points and the
						other way around.
					</div>
				{/if}
			</div>
		</div>
	</section>

	<section class="infogroup">
		<h3 class="ml-4 my-2 text-primary text-2xl uppercase font-800 w-full">Information</h3>
		<div class="infos">
			<div>
				<a class="tool" href="/tools/colorids">
					<figure>
						<Rainbow />
						<Pteranodon />
					</figure>
					<span>Dinosaur<br /><b>Color IDs</b></span>
					<button class="help" on:click|preventDefault={() => toggle('colorid')}>
						?
					</button>
				</a>
				{#if show.colorid}
					<div transition:slide class="info">
						Shows you <b>all available color IDs</b> for dinosaurs.
					</div>
				{/if}
			</div>
		</div>
	</section>
</div>

<style lang="postcss">
	a {
		@apply text-base-content;
	}

	.infogroup {
		@apply grid grid-cols-1 grid-flow-row items-center;
		@apply mx-2;
	}

	.infos {
		/* @apply flex flex-wrap justify-center gap-4; */
		@apply grid grid-cols-[300px] sm:grid-cols-[300px,300px] lg:grid-cols-[300px,300px,300px] grid-flow-row gap-4;
	}

	.tool {
		@apply bg-base-200 p-4 rounded-xl w-full pr-6 shadow-lg h-112px z-10;
		@apply flex flex-row gap-4 items-center justify-between;
		@apply text-right text-xl;
		@apply relative;
	}

	.tool > figure {
		@apply text-6rem -m-2;
		@apply relative h-1em w-1em;
	}
	.tool > figure > :global(*) {
		@apply absolute top-0 left-0;
	}
	.tool > .help {
		@apply absolute -bottom-0.5em right-0 z-20;
		@apply border-base-content border-1 rounded-full w-1.5em h-1.5em;
		@apply bg-base-300 hover:bg-primary hover:focus:bg-base-300 shadow-lg text-primary-content;
		@apply cursor-help;
	}
	.infos > * > .info {
		@apply bg-base-300 mx-4 -z-10 p-2 rounded-b-lg;
	}
</style>
