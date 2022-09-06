<script lang="ts">
	import type { BossMap } from '$lib/boss/types';

	import { urlForBoss } from '$lib/boss/utils';
	import Metadata from '$lib/Metadata.svelte';

	import type { PageData } from './$types';

	export let data: PageData & { mapId: string; map: BossMap }; // !*!*! SvelteKit bug? Shouldn't be needed
	$: ({ mapId, map } = data);
</script>

<Metadata
	title={[map.display, 'Bossopedia']}
	description="Find all the info you need about the bosses of {map.display}. Summon items, unlocked engrams, boss health and boss loot all on one page."
	preview="/boss"
/>

<div class="text-sm breadcrumbs mb-2">
	<ul class="text-sm ml-4">
		<li><a href="/">Home</a></li>
		<li><a href="/boss">Bosses</a></li>
		<li>{map.display}</li>
	</ul>
</div>

<div class="flex gap-2">
	<img src="/imgs/maps/{map.icon}" alt="Icon for {map.display}" width="50" height="50" class="w-12 h-12" />
	<h1 class="text-secondary text-5xl">{map.display}</h1>
</div>

{#if map.note}
	<p class="my-4">{map.note}</p>
{/if}

{#if map.sets}
	{#each map.sets as set}
		<h2 class="mt-8 text-2xl text-secondary">{set.name}</h2>
		<section class="flex flex-wrap justify-center mx-4 gap-8 mt-8">
			{#each set.bosses as bossId}
				{@const boss = map.bosses[bossId]}
				<a
					href={urlForBoss(mapId, bossId, boss)}
					class="bossbutton bg-base-200 rounded-lg p-4 pb-2 flex flex-col items-center justify-between w-48 shadow"
				>
					<div class="grid content-center h-full">
						<img
							class="object-cover max-h-60 max-w-40"
							src="/imgs/bosses/{boss.icon}"
							alt="Symbol for {boss.display}"
						/>
					</div>
					<h3 class="text-center pb-0 min-h-12 flex items-center justify-center">
						{boss.display}
					</h3>
				</a>
			{/each}
		</section>
	{/each}
{:else}
	<section class="flex flex-wrap justify-center mx-4 gap-8 mt-8">
		{#each Object.entries(map.bosses) as [bossId, boss]}
			<a
				href={urlForBoss(mapId, bossId, boss)}
				class="bossbutton bg-base-200 rounded-lg p-4 pb-2 flex flex-col items-center justify-between w-48 shadow"
			>
				<div class="grid content-center h-full">
					<img
						class="object-cover max-h-60 max-w-40"
						src="/imgs/bosses/{boss.icon}"
						alt="Symbol for {boss.display}"
					/>
				</div>
				<h3 class="text-center pb-0 min-h-12 flex items-center">{boss.display}</h3>
			</a>
		{/each}
	</section>
{/if}

<style lang="postcss">
	a.bossbutton {
		@apply flex flex-col items-center gap-2;
		transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
	}
	a.bossbutton:hover {
		@apply bg-base-200/60 scale-95;
	}
</style>
