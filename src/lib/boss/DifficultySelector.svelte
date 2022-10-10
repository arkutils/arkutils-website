<script lang="ts">
	import type { Difficulty } from './types';
	import { dataForBoss, getIconForDifficulty } from './utils';

	export let map: string;
	export let boss: string;
	export let difficulty: Difficulty;

	$: data = dataForBoss(map, boss);
</script>

<nav class="grid grid-cols-3 gap-4 items-center text-xs sm:text-sm">
	<a
		href="/boss/{map}/{boss}-gamma"
		disabled={difficulty === 'gamma'}
		class="gamma"
		data-sveltekit-noscroll
		data-sveltekit-prefetch
	>
		<img src="/imgs/bosses/{getIconForDifficulty('gamma', data)}" alt="Gamma Difficulty" />
		Gamma
	</a>
	<a
		href="/boss/{map}/{boss}-beta"
		disabled={difficulty === 'beta'}
		class="beta"
		data-sveltekit-noscroll
		data-sveltekit-prefetch
	>
		<img src="/imgs/bosses/{getIconForDifficulty('beta', data)}" alt="Beta Difficulty" />
		Beta
	</a>
	<a
		href="/boss/{map}/{boss}-alpha"
		disabled={difficulty === 'alpha'}
		class="alpha"
		data-sveltekit-noscroll
		data-sveltekit-prefetch
	>
		<img src="/imgs/bosses/{getIconForDifficulty('alpha', data)}" alt="Alpha Difficulty" />
		Alpha
	</a>
</nav>

<style lang="postcss">
	a {
		@apply flex flex-col items-center gap-2;
		transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
	}
	a:hover {
		@apply bg-primary-content/10 scale-95;
	}
	a[disabled='true'] {
		color: unset;
		pointer-events: none;
		@apply text-primary-content/30;
	}

	.gamma img {
		filter: url(#tintGamma);
	}
	.beta img {
		filter: url(#tintBeta);
	}
	.alpha img {
		filter: url(#tintAlpha);
	}
</style>
