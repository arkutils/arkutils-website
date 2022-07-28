<script context="module" lang="ts">
	import { boss_data } from '$lib/boss/data';

	import type { Load } from './__types/[boss]';

	/** A load function that looks up [map] and [boss] to find boss data */
	export const load: Load = async ({ params }) => {
		// Grab the params from the URL
		const { map, boss } = params;

		// See if we have data for this map-boss without difficulty
		try {
			const data = boss_data[map].bosses[boss];
			console.log(`found ${map}-${boss}`);

			if (typeof data.species === 'string') {
				console.log(`species has no difficulties`);
				// This boss doesn't need difficulty, so we're good
				return {
					props: {
						map,
						boss,
						data
					}
				};
			}

			console.log(`species has difficulties, redirecting to gamma`);
			// This boss has difficulties, so redirect to gamma by default
			return {
				status: 308,
				redirect: `/boss/${map}/${boss}-gamma`
			};
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
	export let data: SingleBoss | ABGBoss;
</script>

<h1>{data?.display ?? '?'}</h1>

<p>{map}</p>
<p>{boss}</p>

<pre>
    <code>{JSON.stringify(data, undefined, '  ')}</code>
</pre>

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
