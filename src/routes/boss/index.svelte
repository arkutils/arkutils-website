<script lang="ts">
	import { boss_data } from '$lib/boss/data';
</script>

<h1>Bosses</h1>

<ul>
	{#each Object.entries(boss_data) as [key, map]}
		<li><a href="/boss/{key}">{map.display}</a></li>
	{/each}
</ul>

<h3 class="mt-8">Content plan:</h3>
<ul>
	<li>Intro</li>
	<li>Search</li>
	<li>List of maps</li>
</ul>
