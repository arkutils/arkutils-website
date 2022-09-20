<script lang="ts">
	import GitHub from '$lib/imgs/GitHub.svelte';
</script>

<main class="px-2 py-4 sm:px-8 min-h-screen max-w-4xl mx-auto">
	<slot />

	<footer class="flex flex-wrap p-2 mt-12 w-full justify-between gap-x-8 text-base-content/70">
		<span>
			This site is <a href="https://github.com/arkutils/arkutils-website" target="_blank">
				open source on GitHub <span class="-mt-1 relative -top-0.5 text-20px">
					<GitHub />
				</span>
			</a>
		</span>
		<span>
			ArkUtils is not affiliated with <a href="https://www.studiowildcard.com/" target="_blank">
				Studio Wildcard
				<img src="/imgs/wildcard.png" class="w-6 h-6 inline" alt="Studio Wildcard's logo" />
			</a>
		</span>
	</footer>
</main>
