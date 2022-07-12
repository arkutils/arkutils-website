<script lang="ts">
	export let width: number | null = null;
	export let height: number | null = null;
</script>

<svg
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 20 20"
	{width}
	height={height === null ? width : height}
>
	<path
		d="M2 2 L18 18 M18 2 L2 18"
		stroke="#ffffff"
		stroke-width="2.5"
		fill="none"
		stroke-linecap="round"
	/>
</svg>
