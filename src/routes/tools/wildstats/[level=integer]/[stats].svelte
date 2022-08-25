<script context="module" lang="ts">
	import type { Load } from '../[level=integer]/__types/[stats]';

	import { LEVEL_MAX, LEVEL_MIN } from '$lib/wildstats/Page.svelte';

	export const load: Load = async ({ params }) => {
		// Grab the params from the URL
		const { level, stats } = params;

		try {
			const levelNum = parseInt(level, 10);
			const statsNum = parseInt(stats, 10);

			if (levelNum >= LEVEL_MIN && levelNum <= LEVEL_MAX && statsNum >= 6 && statsNum <= 8) {
				return {
					props: {
						level: levelNum,
						stats: statsNum,
					},
				};
			}
		} catch (e) {
			// Do nothing
		}

		// Not found or bad format, so redirect to the main page
		return {
			status: 308,
			redirect: '/tools/wildstats',
		};
	};
</script>

<script lang="ts">
	import Page from '$lib/wildstats/Page.svelte';

	export let level = 150;
	export let stats = 7;
</script>

<Page {level} {stats} />
