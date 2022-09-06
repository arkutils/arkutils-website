<script lang="ts">
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

<slot />
