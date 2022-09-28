<script lang="ts">
	export let region: number;
	export let color: number;
	export let disabled = false;
</script>

<span>{region}:</span>
<label>
	<input
		type="number"
		min="0"
		max="255"
		{disabled}
		bind:value={color}
		aria-label="Color ID for region {region}"
		class="input input-xs"
	/>
</label>

<style lang="postcss">
	.input {
		@apply bg-base-200 text-base-content text-center w-16 disabled:opacity-40;
	}
</style>
