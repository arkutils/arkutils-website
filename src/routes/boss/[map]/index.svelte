<script context="module" lang="ts">
	import { boss_data } from '$lib/boss/data';
	import type { BossMap } from '$lib/boss/types';
	import { urlForBoss } from '$lib/boss/utils';

	import type { Load } from './__types/index';

	/** A load function that looks up and validates [map] */
	export const load: Load = async ({ params }) => {
		// Grab the params from the URL
		const { map } = params;

		// See if we have data for this map-boss-difficulty
		try {
			const data = boss_data[map];

			if (data) {
				// Got everything, render it
				return {
					props: {
						map,
						data,
					},
				};
			}
		} catch {}

		// Not found, so redirect to the main boss page
		return {
			status: 308,
			redirect: '/boss',
		};
	};
</script>

<script lang="ts">
	import Metadata from '$lib/Metadata.svelte';

	export let map: string;
	export let data: BossMap;
</script>

<Metadata title={[data.display, 'Bossopedia']} description="" nopreview />

<div class="text-sm breadcrumbs mb-2">
	<ul class="text-sm ml-4">
		<li><a href="/">Home</a></li>
		<li><a href="/boss">Bosses</a></li>
		<li>{data.display}</li>
	</ul>
</div>

<div class="flex gap-2">
	<img src="/imgs/maps/{data.icon}" alt="Icon for {data.display}" width="50" height="50" class="" />
	<h1 class="text-secondary text-5xl">{data.display}</h1>
</div>

{#if data.note}
	<p class="my-4">{data.note}</p>
{/if}

{#if data.sets}
	{#each data.sets as set}
		<section>
			<h2 class="mt-8 text-2xl text-secondary">{set.name}</h2>
			<section class="grid mx-8 gap-8 mt-8 grid-cols-1 sm:grid-cols-3">
				{#each set.bosses as bossId}
					<a
						href={urlForBoss(map, bossId, data.bosses[bossId])}
						class="bossbutton bg-base-200 rounded-lg p-4 flex flex-col items-center"
					>
						<img
							class="h-[200px]"
							src="/imgs/bosses/{data.bosses[bossId].icon}"
							alt="Symbol for {data.bosses[bossId].display}"
						/>
						<h3>{data.bosses[bossId].display}</h3>
					</a>
				{/each}
			</section>
		</section>
	{/each}
{:else}
	<section class="grid mx-8 gap-8 mt-8 grid-cols-1 sm:grid-cols-3">
		{#each Object.entries(data.bosses) as [bossId, boss]}
			<a
				href={urlForBoss(map, bossId, boss)}
				class="bossbutton bg-base-200 rounded-lg p-4 flex flex-col items-center"
			>
				<img class="h-[200px]" src="/imgs/bosses/{boss.icon}" alt="Symbol for {boss.display}" />
				<h3>{boss.display}</h3>
			</a>
		{/each}
	</section>
{/if}

<h3 class="mt-8">Content plan:</h3>
<ul class="text-sm ml-4">
	<li>Header</li>
	<li>List of bosses in [map]</li>
</ul>

<style lang="postcss">
	a.bossbutton {
		@apply flex flex-col items-center gap-2;
		transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
	}
	a.bossbutton:hover {
		@apply bg-base-200/60 scale-95;
	}
</style>
