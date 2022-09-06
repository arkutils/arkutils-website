<script lang="ts">
	import Page from '$lib/wildstats/Page.svelte';

	import type { PageData } from './$types';

	export let data: PageData = {
		level: 150,
		stats: 7,
	};
</script>

<Page level={data.level} stats={data.stats} />
