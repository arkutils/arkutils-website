<script context="module" lang="ts">
	import { boss_data } from '$lib/boss/data';
	import { urlForBoss } from '$lib/boss/utils';
	import type { BossMap } from '$lib/boss/types';

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
						data
					}
				};
			}
		} catch {}

		// Not found, so redirect to the main boss page
		return {
			status: 308,
			redirect: '/boss'
		};
	};
</script>

<script lang="ts">
	export let map: string;
	export let data: BossMap;
</script>

<h1>{data.display}</h1>

<ul>
	{#each Object.entries(data.bosses) as [bossId, boss]}
		<li>
			<a href={urlForBoss(map, bossId, boss)}>{boss.display}</a>
		</li>
	{/each}
</ul>

<h3 class="mt-8">Content plan:</h3>
<ul>
	<li>Header</li>
	<li>List of bosses in [map]</li>
</ul>
