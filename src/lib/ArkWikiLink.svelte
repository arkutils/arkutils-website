<script lang="ts">
	export let name: string;

	function cleanName(name: string) {
		name = name.replace(/[^a-zA-Z0-9úö.]+/g, '_');
		return name;
	}
</script>

{#if name}
	<!-- svelte-ignore security-anchor-rel-noreferrer -->
	<a
		href="https://ark.wiki.gg/wiki/{cleanName(name)}"
		class="inline-block wikilink"
		title="Link to ark.wiki.gg"
		target="_blank"
		rel="external noopener"
	>
		<slot>
			<img
				src="/imgs/arkwikigg.webp"
				width="128"
				height="128"
				class="w-[18px] h-[18px] inline ml-1"
				alt="Ark Official Wiki logo"
			/>
		</slot>
	</a>
{/if}
