<script context="module" lang="ts">
	import { boss_data } from '$lib/boss/data';
	import { isSingleDifficulty } from '$lib/boss/utils';

	import type { Load } from './__types/[boss]';

	/** A load function that looks up [map] and [boss] to find boss data */
	export const load: Load = async ({ params }) => {
		// Grab the params from the URL
		const { map, boss } = params;

		// See if we have data for this map-boss without difficulty
		try {
			const data = boss_data[map].bosses[boss];

			if (isSingleDifficulty(data)) {
				// This boss doesn't need difficulty, so we're good
				return {
					props: {
						map,
						boss,
					},
				};
			}

			// This boss has difficulties, so redirect to gamma by default
			return {
				status: 308,
				redirect: `/boss/${map}/${boss}-gamma`,
			};
		} catch {}

		// Not found, so redirect to the main boss page
		return {
			status: 308,
			redirect: '/boss',
		};
	};
</script>

<script lang="ts">
	import Boss from '$lib/boss/Boss.svelte';
	import Metadata from '$lib/Metadata.svelte';

	export let map: string;
	export let boss: string;
</script>

<Metadata
	title={[boss_data[map].bosses[boss].display, boss_data[map].display, 'Bossopedia']}
	description="Everything you need to know if you want to beat {boss_data[map].bosses[boss]
		.display} on {boss_data[map].display}. {boss_data[map].bosses[boss].note}"
	preview="/boss"
/>

<div class="text-sm breadcrumbs mb-2">
	<ul class="text-sm ml-4">
		<li><a href="/">Home</a></li>
		<li><a href="/boss">Bosses</a></li>
		<li><a href="/boss/{map}">{boss_data[map].display}</a></li>
		<li>{boss_data[map].bosses[boss].display}</li>
	</ul>
</div>

<Boss {map} {boss} difficulty={null} />
