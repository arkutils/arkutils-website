<script context="module" lang="ts">
	import { boss_data, difficulties } from '$lib/boss/data';

	import type { Load } from './__types/[boss]-[difficulty]';

	/** A load function that looks up [map] and [boss] to find boss data */
	export const load: Load = async ({ params }) => {
		// Grab the params from the URL
		const { map, boss, difficulty } = params;

		// See if we have data for this map-boss-difficulty
		try {
			const data = boss_data[map].bosses[boss];

			if (typeof data.species === 'string') {
				// This boss doesn't have difficulties
				return {
					status: 308,
					redirect: `/boss/${map}/${boss}`
				};
			}

			if (difficulty in data.species) {
				// Got everything, render it
				return {
					props: {
						map,
						boss,
						difficulty,
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
	import type { ABGBoss, SingleBoss } from '$lib/boss/types';

	export let map: string;
	export let boss: string;
	export let difficulty: string;
	export let data: SingleBoss | ABGBoss;
</script>

<h1>{difficulties[difficulty].display} {data.display} ({boss_data[map].display})</h1>

<div>
	Difficulty selector
	<nav>
		<a href="/boss/{map}/{boss}-gamma">Gamma</a>
		<a href="/boss/{map}/{boss}-beta">Beta</a>
		<a href="/boss/{map}/{boss}-alpha">Alpha</a>
	</nav>
</div>

<h3 class="mt-8">Content plan:</h3>
<ul>
	<li>Header</li>
	<li>[map] [boss] info:</li>
	<ul>
		<li>Icon, name, location</li>
		<li>Health, damage reduction</li>
		<li>Summoning</li>
		<li>Drops</li>
		<li>Engrams</li>
		<li>Other bosses on this map</li>
	</ul>
</ul>
