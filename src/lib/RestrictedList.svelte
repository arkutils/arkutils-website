<script lang="ts">
	type T = $$Generic;
	// interface $$Slots {
	// 	default: {
	// 		item: T;
	// 	};
	// 	button: {
	// 		extras: number;
	// 	};
	// }

	export let items: T[] | undefined = undefined;
	export let restrict: boolean = true;
	export let max: number = 8;

	$: list = restrictItems(items ?? [], !restrict, max);

	function restrictItems<T>(original: T[], full: boolean, max: number): T[] {
		return full ? original : original.slice(0, max);
	}
</script>

{#if list.length}
	<ul>
		<slot name="pre" />

		{#each list as item}
			<slot {item}>
				<li>{item}</li>
			</slot>
		{/each}

		<slot name="post" />
	</ul>
{:else}
	<slot name="empty"><p class="opacity-60 italic">None</p></slot>
{/if}

{#if items && items.length > max}
	{@const extras = (items ?? []).length - max}
	<button on:click={() => (restrict = !restrict)} class="mt-4 -ml-2 btn btn-xs btn-ghost text-secondary">
		Show
		{#if !restrict}
			less
		{:else}
			{extras} more item{#if extras != 1}s{/if}
		{/if}
	</button>
{/if}
