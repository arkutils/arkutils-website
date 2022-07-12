<script>
	import GitHub from '$lib/imgs/GitHub.svelte';

	import 'virtual:windi.css';
	import '../app.postcss';

	// if you want to enable windi devtools
	import { browser } from '$app/env';
	if (browser) import('virtual:windi-devtools');
</script>

<main class="px-2 py-4 sm:px-8 min-h-screen max-w-4xl mx-auto">
	<slot />

	<footer class="flex flex-wrap p-2 mt-12 w-full justify-between">
		<span>
			This site is <a href="https://github.com/arkutils/arkutils-website">
				open source on GitHub <span class="-mt-1 relative -top-0.5 text-20px">
					<GitHub />
				</span>
			</a>
		</span>
		<span>
			Arkutils is not affiliated with Studio Wildcard
			<img src="/imgs/wildcard.png" class="w-6 h-6 inline" />
		</span>
	</footer>
</main>
