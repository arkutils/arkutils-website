<script>
	import 'virtual:windi.css';

	// if you want to enable windi devtools
	import { browser } from '$app/env';
	if (browser) import('virtual:windi-devtools');
</script>

<main class="px-2 py-4 sm:px-8 min-h-screen max-w-4xl mx-auto">
	<slot />
</main>

<style lang="postcss">
	:global(h2) {
		@apply text-green-600 font-bold capitalize text-xl;
	}

	:global(h3) {
		@apply text-green-600 font-bold capitalize text-base;
	}
</style>
