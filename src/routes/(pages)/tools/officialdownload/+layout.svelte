<script lang="ts">
	import Metadata from '$lib/Metadata.svelte';
</script>

<Metadata
	title="ARK Official Server Backup Finder"
	description="This database let's you find the backup of your Official Server in ARK Survival Evolved more easily."
	preview="tools/officialdownload"
/>

<nav class="text-sm breadcrumbs mb-2">
	<ul class="text-sm ml-4">
		<li><a href="/">Home</a></li>
		<li>Official Server Downloads</li>
	</ul>
</nav>

<header>
	<h1 class="title mb-4">Official Server Downloads</h1>
	<h2 class="title mb-4">Find your Official Server backup easily</h2>
	<p class="my-2">
		This is an improved <b>searchable</b> database for <b>quick access</b> to your Official Server backup.
		Just type in your server name or the server number and let autocomplete do the rest. Download it directly
		from the results.
	</p>
	<p class="my-2">
		Studio Wildcard did not provide any console backups for now therefore we can't show them here.
	</p>
</header>

<main><slot /></main>

<footer>
	<h3 class="title mt-4">Disclaimer:</h3>
	<p class="my-2">
		<i>
			ArkUtils created this page as a collaborative effort from the community. We're not affiliated
			with any companies involved. The files you see aren't stored on our servers; we simply provide
			direct links to the original sources. Our primary goal with this page is to help you easily find
			the backup you need, without any unnecessary difficulty.
		</i>
	</p>
	<p class="my-2">
		You can find the original links on Wildcard's
		<!-- svelte-ignore security-anchor-rel-noreferrer -->
		<a
			href="https://survivetheark.com/index.php?/server-backups/"
			title="Server Backup Page from Studio Wildcard"
			target="_blank">own server backup page</a
		>.
	</p>
</footer>
