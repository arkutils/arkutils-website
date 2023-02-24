<script lang="ts">
	export let value: number;
	export let set: number;

	$: active = value === set;
</script>

<label class="flex items-center gap-4">
	<button
		class="btn btn-sm w-20"
		class:btn-active={active}
		selected={active}
		on:click={() => (value = set)}
		on:keypress={(k) => k.key === 'Enter' && (value = set)}
	>
		<slot name="value">{set}</slot>
	</button>

	<span
		on:click|preventDefault
		on:focus|preventDefault
		on:keydown|preventDefault
		on:keypress|preventDefault
	>
		<slot />
	</span>
</label>
