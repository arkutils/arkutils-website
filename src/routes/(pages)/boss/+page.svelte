<script lang="ts">
	import { boss_data } from '$lib/boss/data';

	import BossSearch from '$lib/boss/BossSearch.svelte';
	import Metadata from '$lib/Metadata.svelte';
</script>

<Metadata
	title="Bossopedia"
	description="The Bossopedia by ArkUtils gives you the perfect overview over what you need to know about summoning and defeating the bosses in ARK Survival Evolved. Summoning items, unlocked Engrams, Boss life and boss loot can easily be viewed. "
/>

<!-- Site navigation breadcrumbs -->
<div class="flex">
	<div class="text-sm breadcrumbs mb-2 flex-grow">
		<ul class="text-sm ml-4">
			<li><a href="/">Home</a></li>
			<li>Bosses</li>
		</ul>
	</div>
	<div
		class="bg-error text-error-content cursor-default -mt-8 pt-8 px-3 mb-2 rounded-b-xl font-bold"
		title="This page is not updated for Ark: Survival Ascended"
	>
		Not verified for ASA
	</div>
</div>

<header class="flex justify-center items-center">
	<div class="flex flex-col gap-4">
		<h1 class="mb-2 text-6xl title"><span class="text-secondary">Boss</span>opedia</h1>
		<div
			class="bg-base-300 rounded-lg mx-4 sm:mx-0 p-4 pt-0 sm:p-4 sm:px-12 flex flex-col sm:flex-row gap-4 sm:gap-4 md:gap-0 items-center justify-around"
		>
			<img
				src="imgs/obeliskcomic.webp"
				class="px-6 sm:p-0 w-full max-w-xs sm:max-w-full sm:w-44 self-center scale-x-100"
				alt="ARK Obelisk in Comic Style"
				width="512"
				height="662"
			/>
			<div class="flex flex-col gap-2">
				<p class="text-2xl">Ever wondered:</p>
				<ul class="list-disc list-inside">
					<li>which summoning items you need</li>
					<li>which Tek engrams are unlocked</li>
					<li>what loot is dropped</li>
				</ul>
				<p>when facing a boss?</p>
				<p class="text-2xl">Wonder no more!</p>
			</div>
		</div>

		<BossSearch />

		<p class="mt-0">
			Click on the map name to see which bosses you can face on that map. Make sure to chose the
			correct map first because the same bosses can appear on different maps but won't have the same
			stats or drops.
		</p>
	</div>
</header>

<ul
	class="grid justify-around gap-2 gap-y-3 grid-cols-[repeat(1,auto)] my-4 sm:my-8 sm:gap-y-3 sm:grid-cols-[repeat(2,auto)] md:grid-cols-[repeat(3,auto)]"
>
	{#each Object.entries(boss_data) as [key, map]}
		<li class="bg-base-200 rounded-lg pl-2">
			<a href="/boss/{key}" class="flex gap-3 flex-row items-center p-2 py-3 text-secondary">
				<img
					src="/imgs/maps/{map.icon}"
					alt={map.display}
					width="24"
					height="24"
					class="filter-dim"
					class:lore={map.isLore}
				/>
				{map.display}
			</a>
		</li>
	{/each}
</ul>

<div class="flex w-full gap-2 justify-end">
	<img
		src="/imgs/maps/map.webp"
		alt="Community Map DLC"
		title="Community Map DLC"
		width="19"
		height="19"
		class="filter-dim"
	/>
	<p class="text-base-content/70 text-sm">Non-Lore Maps</p>
</div>

<style lang="postcss">
	h1.title {
		font-size: clamp(32px, 12vw, 100px);
	}
	header img {
		filter: brightness(1.5);
	}
	.grid li {
		width: 14em;
	}
	.filter-dim {
		filter: opacity(0.3);
	}
	.filter-dim.lore {
		filter: brightness(0.8);
	}
</style>
