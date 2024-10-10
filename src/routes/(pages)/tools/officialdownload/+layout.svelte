<script lang="ts">
	import Metadata from '$lib/Metadata.svelte';
	import SupportedWidget from '$lib/SupportedWidget.svelte';
</script>

<Metadata
	title="ARK Official Server Backup Finder"
	description="This database let's you find the backup of your Official Server in ARK Survival Evolved more easily."
	preview="tools/officialdownload"
/>

<div class="flex">
	<nav class="text-sm breadcrumbs mb-2 flex-grow">
		<ul class="text-sm ml-4">
			<li><a href="/">Home</a></li>
			<li>Official Server Downloads</li>
		</ul>
	</nav>
	<SupportedWidget
		aseSupport="full"
		asaSupport="none"
		asaText="No Official downloads for Ark: Survival Ascended yet!"
	/>
</div>

<header>
	<h1 class="title mb-4">Official Server Downloads</h1>
	<h2 class="title mb-4 text-secondary">Find your ARK: Survival Evolved Official Server backup easily</h2>
	<p class="my-2">
		This is an improved <b>searchable</b> database for <b>quick access</b> to your Official Server backup.
		Just type in your server name or the server number and let autocomplete do the rest. Download it directly
		from the results.
	</p>
	<p class="my-2">
		Studio Wildcard did not provide any console backups for now therefore we can't show them here.
	</p>
	<div class="my-2 rounded bg-base-200 border border-base-content/30 py-2 px-4">
		<p>
			<b class="text-secondary">Note:</b> You will need to add the command-line arguments
			<code class="text-secondary">-newsaveformat -usestore</code> in order to load these saves in both
			single-player mode or on a server.
		</p>
		<p class="mt-2">
			<b>For more instructions</b> please refer to
			<!-- svelte-ignore security-anchor-rel-noreferrer - we're safe as we don't have a login system -->
			<a
				href="https://arkmag.rocks/how-to-add-your-official-server-save-file-to-your-singleplayer-game-steam-epic/"
				target="_blank"
			>
				the full guide
			</a>
			made by Tiia Aurora, or the
			<a
				href="https://ark.wiki.gg/wiki/2023_official_server_save_files"
				target="_blank"
				rel="noreferrer"
			>
				official wiki
			</a>.
		</p>
	</div>
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
