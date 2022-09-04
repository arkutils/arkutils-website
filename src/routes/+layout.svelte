<script lang="ts">
	import GitHub from '$lib/imgs/GitHub.svelte';

	import '../app.postcss';

	export const prerender = true;
</script>

<div class="absolute w-0 h-0 z-[-1000]">
	<!-- Filters for Alpha/Beta/Gamma color tint filters -->
	<svg xmlns="http://www.w3.org/2000/svg">
		<filter id="tintGamma" color-interpolation-filters="sRGB">
			<feColorMatrix
				type="matrix"
				values="
                    0 0 0 0 0.3
                    0 0 0 0 0.8
                    0 0 0 0 0.4
                    0 0 0 1 0"
			/>
		</filter>
	</svg>

	<svg xmlns="http://www.w3.org/2000/svg">
		<filter id="tintBeta" color-interpolation-filters="sRGB">
			<feColorMatrix
				type="matrix"
				values="
                    0 0 0 0 0.4
                    0 0 0 0 0.6
                    0 0 0 0 1
                    0 0 0 1 0"
			/>
		</filter>
	</svg>

	<svg xmlns="http://www.w3.org/2000/svg">
		<filter id="tintAlpha" color-interpolation-filters="sRGB">
			<feColorMatrix
				type="matrix"
				values="
                    0 0 0 0 1
                    0 0 0 0 0.3
                    0 0 0 0 0.4
                    0 0 0 1 0"
			/>
		</filter>
	</svg>
</div>

<main class="px-2 py-4 sm:px-8 min-h-screen max-w-4xl mx-auto">
	<slot />

	<footer class="flex flex-wrap p-2 mt-12 w-full justify-between">
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
