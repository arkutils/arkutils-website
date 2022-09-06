<script lang="ts">
	import Boss from '$lib/boss/Boss.svelte';
	import { boss_data, difficulties } from '$lib/boss/data';
	import type { Difficulty } from '$lib/boss/types';
	import Metadata from '$lib/Metadata.svelte';

	import type { PageData } from './$types';

	export let data: PageData & { map: string; boss: string; difficulty: Difficulty }; // !*!*! SvelteKit bug? Shouldn't be needed
	$: ({ map, boss, difficulty } = data);
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
