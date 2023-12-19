<script lang="ts">
	import Page from '$lib/wildstats/Page.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Page level={data.level} stats={6} />
