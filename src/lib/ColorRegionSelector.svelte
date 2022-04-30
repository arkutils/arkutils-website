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
		class="bg-gray-700 text-gray-100 text-center w-16 disabled:opacity-40"
	/>
</label>
