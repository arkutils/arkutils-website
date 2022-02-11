<script>
	import 'virtual:windi.css';

	// if you want to enable windi devtools
	import { browser } from '$app/env';
	if (browser) import('virtual:windi-devtools');
</script>

<main class="p-4 bg-gray-900 text-gray-100 h-screen">
    <slot/>
</main>
