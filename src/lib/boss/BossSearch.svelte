<script lang="ts">
	import { boss_data, difficulties } from './data';
	import type { SearchResult } from './search';

	import SearchBox from './SearchBox.svelte';

	function urlForResult(result: SearchResult) {
		if (result.type === 'map') {
			return `/boss/${result.map}`;
		} else {
			if (result.difficulty) {
				return `/boss/${result.map}/${result.boss}-${result.difficulty}`;
			} else {
				return `/boss/${result.map}/${result.boss}`;
			}
		}
	}
</script>

<SearchBox>
	<li class="hover:bg-base-200 px-4 py-1 rounded outer" slot="result" let:result>
		{@const map = boss_data[result.map]}
		{@const isLore = map.isLore}
		<a href={urlForResult(result)} class="breadcrumbs text-base-content hover:text-base-content">
			<ul>
				{#if result.type === 'map'}
					<li>
						<a href="/boss/{result.map}">
							<img
								src="/imgs/maps/{map.icon}"
								class="filter-dim"
								class:lore={isLore}
								aria-disabled="true"
								alt="{map.display} Icon"
								width="32"
								height="32"
							/>
							{map.display}
						</a>
					</li>
				{:else if result.type === 'boss'}
					{@const boss = map.bosses[result.boss]}
					<li>
						<img
							src="/imgs/maps/{map.icon}"
							class="filter-dim"
							class:lore={isLore}
							aria-disabled="true"
							alt=""
							width="32"
							height="32"
						/>
						{map.display}
					</li>
					{#if result.difficulty}
						<li>{boss.display}</li>
						<li>
							<a href="/boss/{result.map}/{result.boss}-{result.difficulty}">
								{difficulties[result.difficulty].display}
							</a>
						</li>
					{:else}
						<li>
							<a href="/boss/{result.map}/{result.boss}">
								{boss.display}
							</a>
						</li>
					{/if}
				{:else if result.type === 'item'}
					{@const item = result.item}
					{@const boss = map.bosses[result.boss]}
					<li>{item.name}</li>
					<li>
						<img
							src="/imgs/maps/{map.icon}"
							class="filter-dim"
							class:lore={isLore}
							aria-disabled="true"
							alt=""
							width="32"
							height="32"
						/>
						{map.display}
					</li>
					{#if result.difficulty}
						<li>{boss.display}</li>
						<li>
							<a href="/boss/{result.map}/{result.boss}-{result.difficulty}">
								{difficulties[result.difficulty].display}
							</a>
						</li>
					{:else}
						<li>
							<a href="/boss/{result.map}/{result.boss}">
								{boss.display}
							</a>
						</li>
					{/if}
				{/if}
			</ul>
		</a>
	</li>

	<div slot="noResults" class="h-40 bg-pink-500">No results found!</div>
</SearchBox>

<style lang="postcss">
	.breadcrumbs > ul > li img {
		@apply mr-2;
	}
	.breadcrumbs > ul > li:before {
		@apply text-secondary;
	}
	.breadcrumbs a {
		@apply text-secondary font-bold;
	}
	.breadcrumbs > ul {
		@apply flex-wrap;
	}
	li.outer {
		@apply border-b border-base-content/20;
	}
</style>
