<script>
	import 'virtual:windi.css';

	// if you want to enable windi devtools
	import { browser } from '$app/env';
	if (browser) import('virtual:windi-devtools');
</script>

<main class="p-4 min-h-screen max-w-4xl mx-auto">
    <slot/>
</main>
