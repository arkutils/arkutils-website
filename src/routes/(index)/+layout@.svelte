<script>
	import GitHub from '$lib/imgs/GitHub.svelte';
</script>

<main class="min-h-screen flex flex-col items-center">
	<slot />

	<footer class="flex flex-wrap p-2 mt-12 justify-between max-w-2xl gap-x-8 text-base-content/70">
		<span>
			<!-- svelte-ignore security-anchor-rel-noreferrer -->
			This site is
			<a href="https://github.com/arkutils/arkutils-website" target="_blank" rel="external noopener">
				open source on GitHub
				<span class="-mt-1 relative -top-0.5 text-20px text-base-content ml-1px">
					<GitHub />
				</span>
			</a>
		</span>
		<span>
			<!-- svelte-ignore security-anchor-rel-noreferrer -->
			ArkUtils is not affiliated with
			<a href="https://www.studiowildcard.com/" target="_blank" rel="external noopener">
				Studio Wildcard
				<img src="/imgs/wildcard.png" class="w-6 h-6 inline" alt="Studio Wildcard's logo" />
			</a>
		</span>
	</footer>
</main>
