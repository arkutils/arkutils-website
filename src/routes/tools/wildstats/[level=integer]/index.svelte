<script context="module" lang="ts">
	import type { Load } from '../[level=integer]/__types';

	export const load: Load = async ({ params }) => {
		// Grab the params from the URL
		const { level } = params;

		try {
			const levelNum = parseInt(level, 10);
			if (levelNum >= 30 && levelNum <= 400) {
				return {
					props: {
						level: levelNum,
					},
				};
			}
		} catch (e) {
			// Do nothing
		}

		// Not found, so redirect to the main page
		return {
			status: 308,
			redirect: '/wildstats',
		};
	};
</script>

<script lang="ts">
	import Page from '$lib/wildstats/Page.svelte';

	export let level = 150;
</script>

<Page {level} stats={7} />
