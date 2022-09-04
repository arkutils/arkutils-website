<script context="module" lang="ts">
	import { boss_data } from '$lib/boss/data';
	import { isSingleDifficulty } from '$lib/boss/utils';

	import type { Load } from './__types/[boss]-[difficulty]';

	/** A load function that looks up [map] and [boss] to find boss data */
	export const load: Load = async ({ params }) => {
		// Grab the params from the URL
		const { map, boss, difficulty } = params;

		// See if we have data for this map-boss-difficulty
		try {
			const data = boss_data[map].bosses[boss];

			if (isSingleDifficulty(data)) {
				// This boss doesn't have difficulties
				return {
					status: 308,
					redirect: `/boss/${map}/${boss}`,
				};
			}

			if (difficulty in data.species) {
				// Got everything, render it
				return {
					props: {
						map,
						boss,
						difficulty,
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
	import Boss from '$lib/boss/Boss.svelte';
	import Metadata from '$lib/Metadata.svelte';

	import { difficulties } from '$lib/boss/data';
	import type { Difficulty } from '$lib/boss/types';

	export let map: string;
	export let boss: string;
	export let difficulty: Difficulty;
</script>

<Metadata
	title={[
		`${difficulties[difficulty].display} ${boss_data[map].bosses[boss].display}`,
		boss_data[map].display,
		'Bossopedia',
	]}
	description="Everything you need to know if you want to beat {difficulties[difficulty]
		.display} {boss_data[map].bosses[boss].display} on {boss_data[map].display}. {boss_data[map].bosses[
		boss
	].note}"
	preview="/boss"
/>

<div class="text-sm breadcrumbs mb-2">
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/boss">Bosses</a></li>
		<li><a href="/boss/{map}">{boss_data[map].display}</a></li>
		<li>{boss_data[map].bosses[boss].display}</li>
	</ul>
</div>

<Boss {map} {boss} {difficulty} />

<style lang="postcss">
	.breadcrumbs > ul {
		@apply flex-wrap;
	}
</style>
